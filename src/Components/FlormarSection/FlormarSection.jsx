import Product from "../Shared/Product";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { useContext } from "react";
import Link from "next/link";

const FlormarSection = () => {
  const { flormar } = useContext(ThemeContext);
  const products = flormar.slice(16, 28);
  const isLoading = !flormar || flormar.length === 0;

  // ✅ JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Signature Fragrances Collection",
    description:
      "Discover our signature fragrances crafted for elegance, confidence, and long-lasting impressions.",
    itemListElement: products?.map((product, index) => ({
      "@type": "Product",
      position: index + 1,
      name: product?.name,
      url: `https://themynt.shop/product/${product?.slug}`,
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
      className=" overflow-hidden bg-gradient-to-b from-white to-gray-50 pb-10"
      aria-label="Signature Perfume Collection"
    >
      {/* ✅ Structured Data */}
      {!isLoading && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      <div className="container mx-auto px-4 md:pt-10   sm:px-6 md:px-1 text-center">
        {/* Section Header */}
        <div class="flex justify-between items-end mb-5  pb-0">
          <div>
            <h2 class="text-[10px] uppercase text-left tracking-[0.4em] text-gray-400 ml-1 mb-1">
              Signature Collection
            </h2>
            <h3 class="text-xl sm:text-2xl uppercase   md:text-3xl">
              Armaf Beauty Collection
            </h3>
          </div>
          <Link
            href="/product-category/armaf beauty product"
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
              Loading fragrances...
            </p>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="mt-14 grid grid-cols-2 gap:2 md:gap-3  sm:grid-cols-2 lg:grid-cols-6">
              {products.map((product) => (
                <Product key={product?._id} product={product} />
              ))}
            </div>

            {/* CTA */}
            {/* <div className="mt-16   ">
              <Link
                to="/product-category/fragrance"
                className="inline-block rounded-lg bg-black px-12 py-3 text-sm sm:text-base font-semibold tracking-wider text-white transition-all duration-300 hover:bg-red-700 hover:scale-105"
              >
                Explore the Collection
              </Link>
            </div> */}
          </>
        )}
      </div>
    </section>
  );
};

export default FlormarSection;
