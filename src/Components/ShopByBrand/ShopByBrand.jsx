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
    name: "Shirt",
    count: "50+",
    img: "https://api.confidenceresellerbd.com/media/category_thumbnails/temp_56yDKnP.jpg",
    slug: "/product-category/shirt",
  },
  {
    name: "T-shirt",
    count: "50+",
    img: "https://api.confidenceresellerbd.com/media/category_thumbnails/temp_jS730cm.jpg",
    slug: "/product-category/Tshirt",
  },
  {
    name: "2 Piece",
    count: "50+",
    img: "https://api.confidenceresellerbd.com/media/category_thumbnails/temp_MUFpWJe.jpg",
    slug: "/product-category/Two piece",
  },
  {
    name: "3 piece",
    count: "50+",
    img: "https://api.confidenceresellerbd.com/media/category_thumbnails/temp_Bq9JOrB.jpg",
    slug: "/product-category/Three piece",
  },

  {
    name: "Lehenga",
    count: "50+",
    img: "https://i.pinimg.com/736x/4c/25/0c/4c250cb5e595b75236d7e2f7271c70ad.jpg",
    slug: "/product-category/jdot product",
  },
  {
    name: "Watch",
    count: "50+",
    img: "https://api.confidenceresellerbd.com/media/category_thumbnails/temp.webp",
    slug: "/product-category/Men Watch",
  },
  {
    name: "Saree",
    count: "50+",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3doHpg-UMbuWneIN8LnrXZ5I7WH9Yf-lCQ&s",
    slug: "/product-category/saree",
  },
  {
    name: "New",
    count: "50+",
    img: "https://png.pngtree.com/png-clipart/20250103/original/pngtree-new-arrival-label-business-style-red-png-image_6810585.png",
    slug: "/product-category/new",
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
                      width={28}
                      height={28}
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
