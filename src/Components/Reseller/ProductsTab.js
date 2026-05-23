import { useMemo, useEffect } from "react";
import Badge from "./Badge";
import IconBtn from "./IconBtn";

const ITEMS_PER_PAGE = 20;

const ProductsTab = ({
  loading,
  products,
  search,
  setSearch,
  currentPage,
  setCurrentPage,
  onCopyLink,
  onOpenDetails,
  generateAffiliateLink,
}) => {
  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.stock_status==="instock"&& p.name?.toLowerCase().includes(search.toLowerCase()));
  }, [products, search]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, setCurrentPage]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
      <div className="p-6 md:p-8 border-b">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Affiliate Links</h2>
            <p className="text-sm text-gray-500 mt-1">
              Share your link, track orders, and get paid commissions faster.
            </p>
          </div>
          <div className="w-full md:w-[420px]">
            <label className="text-sm font-semibold text-gray-700">Search products</label>
            <input
              type="text"
              placeholder="Type a product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-2 w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-500">Loading products...</div>
      ) : (
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
            {paginatedProducts.map((product) => {
              const link = generateAffiliateLink(product.slug);
              const displayPrice = product.on_sale ? product.sale_price : product.regular_price;

              return (
                <div key={product._id} className="rounded-3xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4">
                    <div className="rounded-2xl border bg-white overflow-hidden">
                      <img src={product?.images?.[0]?.src} alt={product?.name} className="w-full h-[180px] object-contain" loading="lazy" />
                    </div>
                    <div className="mt-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-extrabold text-gray-900 leading-snug line-clamp-2">{product.name}</h3>
                        <Badge tone={product.on_sale ? "purple" : "gray"}>{product.on_sale ? "Sale" : "Regular"}</Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-lg font-extrabold text-gray-900">৳{displayPrice}</p>
                        <p className="text-sm font-semibold text-green-700">
                          10% = ৳{Math.round(Number(displayPrice || 0) * 0.1)}
                        </p>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-gray-600 mb-2">Affiliate Link</p>
                        <input readOnly value={link} className="w-full px-3 py-2 border rounded-2xl bg-white text-[11px]" />
                      </div>
                      <div className="mt-4 flex gap-3">
                        <button onClick={() => onCopyLink(link)} className="flex-1 rounded-2xl bg-black text-white py-3 font-semibold hover:bg-gray-800 inline-flex items-center justify-center gap-2">
                          Copy
                        </button>
                        <button onClick={() => onOpenDetails(product)} className="flex-1 rounded-2xl border py-3 font-semibold hover:bg-gray-50">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
              </p>
              <div className="flex gap-3">
                <IconBtn onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </IconBtn>
                <IconBtn onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="disabled:opacity-50 disabled:cursor-not-allowed">
                  Next
                </IconBtn>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsTab;