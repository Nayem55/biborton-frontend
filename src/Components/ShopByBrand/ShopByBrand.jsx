"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const brands = [
  {
    name: "Flormar",
    count: "1000+",
    img: "https://luvit.com.bd/wp-content/uploads/2026/05/flormar-logo.jpg",
    slug: "/product-category/flormar product",
  },
  {
    name: "Armaf",
    count: "100+",
    img: "https://luvit.com.bd/wp-content/uploads/2026/05/armaf-logo.png",
    slug: "/product-category/armaf product",
  },
  {
    name: "Armaf Beauty",
    count: "100+",
    img: "https://luvit.com.bd/wp-content/uploads/2026/05/armaf-beauty-logo.jpg",
    slug: "/product-category/armaf beauty product",
  },
  {
    name: "J.",
    count: "100+",
    img: "https://luvit.com.bd/wp-content/uploads/2026/05/jdot.png",
    slug: "/product-category/jdot product",
  },
  {
    name: "Best Sale",
    count: "100+",
    img: "https://luvit.com.bd/wp-content/uploads/2026/05/jdot-logo.png",
    slug: "/product-category/jdot product",
  },
  {
    name: "Premium",
    count: "100+",
    img: "https://luvit.com.bd/wp-content/uploads/2026/05/jdot-logo.png",
    slug: "/product-category/jdot product",
  },
{
    name: "Flormar",
    count: "1000+",
    img: "https://luvit.com.bd/wp-content/uploads/2026/05/flormar-logo.jpg",
    slug: "/product-category/flormar product",
  },
  {
    name: "Armaf",
    count: "100+",
    img: "https://luvit.com.bd/wp-content/uploads/2026/05/armaf-logo.png",
    slug: "/product-category/armaf product",
  },
];

const ShopByBrand = () => {
  return (
    <section className="pt-5 bg-white">
      <div className="container mx-auto px-4 md:px-1">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={2}
          // pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          autoplay={{
            delay: 3000, // 3 second পর slide change হবে
            disableOnInteraction: false, // user swipe করলেও autoplay বন্ধ হবে না
          }}
          className="pb-14"
        >
          {brands.map((item, index) => (
            <SwiperSlide key={index}>
              {/* ✅ Link Added */}
              <Link href={`${item.slug}`}>
                <div className="bg-[#E6F2EF] border rounded-xl flex items-center gap-3 px-4 py-3 cursor-pointer hover:shadow-md transition">
                  {/* Icon */}
                  <div className="w-12 h-12 flex items-center justify-center bg-white">
                    <Image
                      src={item.img}
                      alt={item.name}
                      title={item.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500">{item.count}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination {
          bottom: 10px !important;
        }

        .swiper {
          padding-bottom: 50px;
        }

        .swiper-pagination-bullet {
          margin-top: 8px;
        }
      `}</style>
    </section>
  );
};

export default ShopByBrand;
