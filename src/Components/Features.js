import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faStar,
  faCartShopping,
  faBurst,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Features = () => {
  const featureItems = [
    {
      icon: faBurst,
      text: "Exclusive Importer",
    },
    {
      icon: faTruck,
      text: "Shipping Across Bangladesh",
    },
    {
      icon: faStar,
      text: "Genuine Product Guarantee",
    },
    {
      icon: faCartShopping,
      text: "Free Delivery Above 999 TK",
    },
  ];

  return (
    <section
      className="py-6"
      aria-label="Key shopping benefits at MYNT Beauty and Fragrance"
    >
      {/* ✅ Desktop Features List */}
      <div className="hidden lg:flex justify-center 2xl:w-[65%] lg:w-[75%] mx-auto text-[12px] 2xl:text-[14px]">
        <ul className="flex space-x-12 font-bold">
          {featureItems.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <FontAwesomeIcon icon={feature.icon} aria-hidden="true" />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Mobile Swiper Carousel */}
      <div className="block text-center flex items-center h-[50px] lg:hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={false}
          pagination={false}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay, Pagination]}
          className="mySwiper"
        >
          {featureItems.map((feature, index) => (
            <SwiperSlide key={index} aria-label={`Feature: ${feature.text}`}>
              <p className="font-bold flex justify-center items-center gap-2">
                <FontAwesomeIcon icon={feature.icon} aria-hidden="true" />
                {feature.text}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Features;
