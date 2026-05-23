"use client";
import React, { useState, useEffect } from "react";
import Product from "../Shared/Product";
import "./HomeNewArrivals.css";
import Link from "next/link";

const HomeNewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getProductsByTags?name=new arrivals`)
      .then((res) => res.json())
      .then((data) => setNewArrivals(data));

    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 1920);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const products = newArrivals?.slice(0, 4);

  // ✅ Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "New Arrivals",
    itemListElement: products?.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product?.name,
      url: `https://themynt.shop/product/${product?.slug}`,
    })),
  };

  return (
    <section className="overflow-hidden" aria-label="Newly Arrived Products">
      {/* Inject JSON-LD for rich snippets */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="relative">
        <div
          className={`flex flex-col px-[10px] items-center sm:px-[20px] lg:px-[0px] lg:w-[90%] mx-auto ${
            isLargeScreen ? "2xl:w-[65%]" : "2xl:w-[80%]"
          }`}
        >
          {/* ✅ Changed to <h2> for better heading hierarchy */}
          <h2 className="text-center text-xl text-accent font-bold mt-[50px] sm:text-2xl">
            New Arrivals
          </h2>
          <div className="w-[100px] mx-auto h-1 bg-accent my-6 mb-10"></div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 featured-collections">
            {products?.map((product) => (
              <Product key={product?._id} product={product} />
            ))}
          </div>

          <Link
            href="/newarrivals"
            className="text-white bg-accent px-10 rounded sm:mt-20 py-2 hover:bg-secondary ease-in-out duration-200 font-bold sm:my-10"
            title="View more new arrival products"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeNewArrivals;
