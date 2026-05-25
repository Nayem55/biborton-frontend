"use client";
import React from "react";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Flormar Makeup ",
    subtitle: "Primer Plus",
    link: "product-category/flormar gel cream",
    tag: "NEW COLLECTION",
    // image: "https://luvit.com.bd/wp-content/uploads/2026/04/flormar-product-photogrph-2.png", Larger img for better quality
    image:
      "https://luvit.com.bd/wp-content/uploads/2026/05/flormar-product-photogrph-2.png",
  },

  {
    id: 2,
    title: "signature Jdot fashion",
    subtitle: "Jdot fashion",
    tag: "NEW COLLECTION",
    link: "product/mushfiqur-rahim-bold-mr-15",
    // image: "https://luvit.com.bd/wp-content/uploads/2026/04/flormar-product-photogrph-1.png", Larger img for better quality
    // image: "https://luvit.com.bd/wp-content/uploads/2026/05/flormar-product-photogrph-1.png",
    image: "https://i.ibb.co.com/1txdP6BJ/jdot-banner.png",
  },
  {
    id: 3,
    title: "Flormar Pore Minimizer",
    link: "product/mushfiqur-rahim-bold-mr-15",
    subtitle: "makeup primer",
    tag: "NEW COLLECTION",
    // image: "https://luvit.com.bd/wp-content/uploads/2026/04/flormar-product-photogrph-3.png", Larger img for better quality
    image:
      "https://luvit.com.bd/wp-content/uploads/2026/05/flormar-product-photogrph-3.png",
  },
];

const ShopByCategory = () => {
  return (
    <section className="w-full py-10 bg-white">
      <div className="container mx-auto px-4 md:px-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item) => (
            <div
              key={item.id}
              className="relative rounded-xl overflow-hidden min-h-[200px] group"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              />

              {/* Overlay (for readability) */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col justify-center h-full">
                <p className="text-xs tracking-widest text-gray-700 mb-2">
                  {item.tag}
                </p>

                <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                  {item.title}
                </h3>

                <p className="text-lg text-gray-800 mb-4">{item.subtitle}</p>

                <Link
                  href={item.link}
                  className="text-sm underline font-medium text-black hover:opacity-70"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
