import Product from "../Shared/Product";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { useContext } from "react";
import Link from "next/link";

const MostFavorite = () => {
  const { MostFavorite } = useContext(ThemeContext);
  // const products = MostFavorite?.slice(5, 13);
  const products = MostFavorite?.slice(0,4)

  const isLoading = !MostFavorite || MostFavorite.length === 0;

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
      className="overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20"
      aria-label="Signature Perfume Collection"
    >
      {/* ✅ Structured Data */}
      {!isLoading && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      <div className="container mx-auto px-6 text-center">
        {/* Section Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between text-left">
          {/* Left */}
          {/* <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-gold uppercase">
              Our Curated Selection
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary-red ">
              Most Favorite
            </h2>
          </div> */}
          <div class=" mb-2">
          <h2 class="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-2">
            Our Curated Selection
          </h2>
          <h3 class="text-3xl  uppercase">Explore More</h3>
        </div>

          {/* Right */}
          <Link
            href="/product-category/perfume"
            className="hidden md:inline-flex group  items-center gap-2 text-sm font-medium tracking-wide text-gold hover:text-accent transition-colors"
          >
            View All Fragrances
            <span className="block h-[1px] w-6 bg-current transition-all duration-300 group-hover:w-10"></span>
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
            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-4  lg:gap-6">
              {products.map((product) => (
                <Product key={product?._id} product={product} />
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16   md:hidden">
              <Link
                href="/product-category/perfume"
                className="inline-block rounded-lg bg-black px-12 py-3 text-sm sm:text-base font-semibold tracking-wider text-white transition-all duration-300 hover:bg-red-700 hover:scale-105"
              >
                Explore the Collection
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MostFavorite;
