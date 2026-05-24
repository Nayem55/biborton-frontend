import React, { useState, useEffect } from "react";
import Link from "next/link";
import Product from "./Shared/Product";

const HomeCicaCare = () => {
  const [cicaProducts, setCicaProducts] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/getProductsByCategories?name=Cica Care`,
    )
      .then((res) => res.json())
      .then((data) => setCicaProducts(data));
  }, []);

  const products = cicaProducts?.slice(0, 4);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cica Care Collection",
    itemListElement: products?.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product?.name,
      url: `https://biborton.shop/product/${product?.slug}`,
    })),
  };

  return (
    <section className="bg-[#F9FFFA] py-16 w-full relative">
      {/* SEO Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* 🌿 Hero Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start mx-auto w-[90%] 2xl:w-[65%] gap-10">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <p className="uppercase text-green-700 font-semibold tracking-wide text-sm">
            Cica Care • Skin Barrier Healing
          </p>

          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-green-800 leading-tight">
            Calm, Repair & Restore
            <br /> Your Sensitive Skin
          </h2>

          <p className="mt-4 text-gray-600 text-base">
            Powered by **Centella Asiatica**, our Cica range is formulated to
            soothe irritation, repair damaged skin barriers, and deeply hydrate.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              ✅ Dermatologist Approved
            </div>
            <div className="flex items-center gap-2">
              🌱 Centella Extract 95%
            </div>
            <div className="flex items-center gap-2">
              🧪 Skin Barrier Strengthening
            </div>
            <div className="flex items-center gap-2">💧 Hydrates & Repairs</div>
          </div>

          <Link
            href="/product-category/cica care"
            className="inline-block mt-8 bg-green-700 text-white px-8 py-3 rounded-lg shadow hover:bg-green-800 transition font-semibold text-sm tracking-wide"
          >
            Explore Full Cica Collection →
          </Link>
        </div>

        {/* Right Image Area */}
        <div className="flex-1 relative w-full h-[300px] md:h-[420px] rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://luvit.com.bd/wp-content/uploads/2025/11/Cica-Care-Mineral-Clay-Cleanser_front.png"
            alt="Cica Care"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-green-900 bg-opacity-60 text-white p-4 backdrop-blur-md">
            <p className="font-semibold">
              Cica — The Miracle Herb for Skin Recovery 💚
            </p>
            <p className="text-xs opacity-90">
              Used for centuries in Asian medicine to heal wounds & soothe
              inflammation.
            </p>
          </div>
        </div>
      </div>

      {/* Product Display */}
      <div className="mt-14 w-[90%] mx-auto 2xl:w-[65%]">
        <h3 className="text-xl font-bold text-green-800 mb-4 text-center md:text-left">
          Best-Selling Cica Care Essentials
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {products?.map((product) => (
            <Product key={product?._id} product={product} />
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 text-gray-700 text-xs sm:text-sm font-medium">
        <div className="px-3 py-2 bg-white rounded-md shadow">
          ✔️ Cruelty-Free
        </div>
        <div className="px-3 py-2 bg-white rounded-md shadow">
          ✔️ Vegan Formula
        </div>
        <div className="px-3 py-2 bg-white rounded-md shadow">
          ✔️ Fragrance-Free
        </div>
        <div className="px-3 py-2 bg-white rounded-md shadow">
          ✔️ Sensitive-Skin Safe
        </div>
      </div>
    </section>
  );
};

export default HomeCicaCare;
