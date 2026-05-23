import React from "react";
import "./ShopByCategory.css";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ShopByCategory = () => {
  return (
    <div>
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
          <div class="text-center mb-12">
            <h2 class="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-2">
              Our Curation
            </h2>
            <h3 class="text-3xl">Shop By Category</h3>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link class="group relative h-80 overflow-hidden bg-white" href="/product-category/perfume">
              <img
                alt="Perfumes"
                class="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                src="https://luvit.com.bd/wp-content/uploads/2026/03/Shop-by-category-1.webp"
              />
              <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <span class="text-white text-xs tracking-widest font-bold uppercase border-b border-transparent group-hover:border-white py-1">
                  Perfumes
                </span>
              </div>
            </Link>
            <Link class="group relative h-80 overflow-hidden bg-white" href="/product-category/body spray">
              <img
                alt="Body Sprays"
                class="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                // src="https://luvit.com.bd/wp-content/uploads/2026/03/body-spry-collection.png"
                src="https://luvit.com.bd/wp-content/uploads/2026/03/Shop-by-category-1.png"
              />
              <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <span class="text-white text-xs tracking-widest font-bold uppercase border-b border-transparent group-hover:border-white py-1">
                  Body Sprays
                </span>
              </div>
            </Link>
            <Link class="group relative h-80 overflow-hidden bg-white" href="/product-category/attar">
              <img
                alt="attar"
                class="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                // src="https://luvit.com.bd/wp-content/uploads/2026/03/attar-collection.png-.png"
                src="https://luvit.com.bd/wp-content/uploads/2026/03/Shop-by-category-2.png"
              />
              <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <span class="text-white text-xs tracking-widest font-bold uppercase border-b border-transparent group-hover:border-white py-1">
                  Attar
                </span>
              </div>
            </Link>
            <Link class="group relative h-80 overflow-hidden bg-white" href="/product-category/perfume">
              <img
                alt="Deodorants"
                class="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                // src="https://luvit.com.bd/wp-content/uploads/2026/03/body-mist-collection-1.png-1.png"
                src="https://luvit.com.bd/wp-content/uploads/2026/03/Shop-by-category-3.png"
              />
              <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <span class="text-white text-xs tracking-widest font-bold uppercase border-b border-transparent group-hover:border-white py-1">
                  Body Mist
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

{/* Icon  */}
      <section class="py-10  bg-gray-50">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="flex flex-col items-center text-center">
              <div class="mb-4 text-gold-accent">
                <svg
                  class="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                  ></path>
                </svg>
              </div>
              <span class="text-[9px] uppercase tracking-[0.3em] font-medium">
                Sustainably Sourced
              </span>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="mb-4 text-gold-accent">
                <svg
                  class="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                  ></path>
                </svg>
              </div>
              <span class="text-[9px] uppercase tracking-[0.3em] font-medium">
                Crafted in Grasse
              </span>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="mb-4 text-gold-accent">
                <svg
                  class="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                  ></path>
                </svg>
              </div>
              <span class="text-[9px] uppercase tracking-[0.3em] font-medium">
                Heritage Formulas
              </span>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="mb-4 text-gold-accent">
                <svg
                  class="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                  ></path>
                </svg>
              </div>
              <span class="text-[9px] uppercase tracking-[0.3em] font-medium">
                Certified
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopByCategory;
