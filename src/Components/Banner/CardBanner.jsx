"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CardBanner = () => {
  const banners = [
    {
      id: 3,
      link: "",
      label: "Top",
      title: "Beauty Collection",
      desc: "On purchases and services.",
      btn1: "Shop now",
      bg: "#ffd7c7",
      img: "https://confidenceresellerbd.com/_next/image?url=https%3A%2F%2Fapi.confidenceresellerbd.com%2Fmedia%2Fproduct_thumbnails%2F17675908108532.jpg&w=640&q=75",
    },

    {
      id: 4,
      link: "",
      label: "New!",
      title: "Rare Beauty",
      desc: "The Flormar Product. Made to feel good in.",
      btn1: "Shop now",
      bg: "#f1e5da",
      img: "https://confidenceresellerbd.com/_next/image?url=https%3A%2F%2Fapi.confidenceresellerbd.com%2Fmedia%2Fproduct_thumbnails%2F17569045477978.jpg&w=640&q=75",
    },
    {
      id: 5,
      link: "",
      label: "New!",
      title: "Flormar Beauty",
      desc: "The Flormar Product. Made to feel good in.",
      btn1: "Shop now",
      bg: "#f1e5da",
      img: "https://confidenceresellerbd.com/_next/image?url=https%3A%2F%2Fapi.confidenceresellerbd.com%2Fmedia%2Fproduct_thumbnails%2F17664196851775.jpg&w=640&q=75",
    },
  ];

  return (
    <div className="container mx-auto pt-16 md:pt-10 pb-2 px-3 md:px-0">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="mySwiper"
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              href={item.link}
              className="relative p-4 md:p-6 bg-cover rounded-xl h-[220px] sm:h-[250px] md:h-[280px] lg:h-[320px] shadow-md cursor-pointer transition hover:shadow-xl flex flex-col justify-between bg-no-repeat bg-right"
              style={{
                backgroundColor: item.bg,
                backgroundImage: `url(${item.img})`,
              }}
            >
              <div className="relative z-10 w-[70%] md:w-[60%]">
                {/* {item.label && (
                  <span className="bg-white text-black text-[10px] md:text-xs px-2 py-1 rounded-md font-medium">
                    {item.label}
                  </span>
                )} */}

                {/* <h2 className="text-lg md:text-xl lg:text-2xl text-gray-900 font-bold mt-2 md:mt-3">
                  {item.title}
                </h2>

                {item.desc && (
                  <p className="text-[11px] md:text-[13px] font-medium text-gray-800">
                    {item.desc}
                  </p>
                )} */}

                {/* <div className="flex gap-2 md:gap-3 mt-3 md:mt-4">
                  <span className="px-3 md:px-4 py-1.5 md:py-2 bg-black text-white text-xs md:text-sm rounded-full font-medium">
                    {item.btn1}
                  </span>

                  {item.btn2 && (
                    <span className="text-xs md:text-sm font-medium underline hover:no-underline">
                      {item.btn2}
                    </span>
                  )}
                </div> */}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardBanner;
