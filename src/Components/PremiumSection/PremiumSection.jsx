import Product from "../Shared/Product";
import { useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "../Providers";

const PremiumSection = () => {
  const { premium } = useContext(ThemeContext);
  const products = premium;
  // const products = MostFavorite
  const isLoading = !premium || premium.length === 0;

  // ✅ JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Signature collections Collection",
    description:
      "Discover our signature collections crafted for elegance, confidence, and long-lasting impressions.",
    itemListElement: products?.map((product, index) => ({
      "@type": "Product",
      position: index + 1,
      name: product?.name,
      url: `https://biborton.shop/product/${product?.slug}`,
      image: product?.images?.[0]?.src,
      offers: {
        "@type": "Offer",
        priceCurrency: "BDT",
        price: product?.on_sale ? product?.sale_price : product?.regular_price,
        availability:
          product?.stock_quantity > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
      },
    })),
  };

  return (
    <section
      className="overflow-hidden  pt-5 mt-14 pb-16 "
      aria-label="Signature fashion Collection"
    >
      {/* ✅ Structured Data */}
      {!isLoading && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      <div className="container mx-auto px-4 md:px-1 text-center">
        {/* Section Header */}
        {/* <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between text-left">
          <div>
            <p className="mb-2  text-xs font-semibold tracking-[0.25em] text-[#131624] uppercase">
              Best Selection
            </p>

            <h2 className="font-montserrat font-medium text-xl lg:text-[30px] text-primary-red ">
              WHAT’S TRENDING
            </h2>
          </div>

          <Link
            href="/product-category/collection"
            className="hidden md:inline-flex group  items-center gap-2 text-sm font-medium tracking-wide text-black hover:text-[#131624] underline  transition-colors"
          >
            View All collections
            <span className="block h-[1px] w-6 bg-current transition-all duration-300 group-hover:w-10"></span>
          </Link>
        </div> */}

        <div class="flex justify-between items-end mb-5  pb-6">
          <div>
            <h2 class="text-[10px] uppercase text-left tracking-[0.4em] text-gray-400 ml-1 mb-1">
              Signature Collection
            </h2>
            <h3 class="text-xl sm:text-2xl uppercase   md:text-3xl">
              Premium fashion
            </h3>
          </div>
          <Link
            href="/product-category/shirt"
            class="text-[11px] font-bold text-gray-800 uppercase  border-b tracking-[0.2em] border-gray-700 pb-1 hover:text-gold-accent hover:border-gold-accent transition-all"
          >
            See More
          </Link>
        </div>

        {/* 🔄 Loading State */}
        {isLoading ? (
          <div className="mt-20 flex flex-col items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-accent border-t-transparent"></div>
            <p className="mt-4 text-sm tracking-widest text-secondary opacity-70">
              Loading collections...
            </p>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:gap- lg:grid-cols-6 lg:gap-3 ">
              {products.map((product) => (
                <Product key={product?._id} product={product} />
              ))}
            </div>

            {/* CTA */}
            {/* <div className="mt-24">
              <Link
                href="/shop"
                className="inline-block px-10 py-2 text-sm sm:text-base  tracking-wider text-black border border-gray-700 transition-all duration-300 hover:bg-[#131624] hover:text-white hover:scale-105"
              >
                Explore All Collection
              </Link>
            </div> */}
          </>
        )}
      </div>
    </section>
  );
};

export default PremiumSection;
