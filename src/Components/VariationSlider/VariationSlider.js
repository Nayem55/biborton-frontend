"use client";
import React, { useState, useEffect } from "react";
import "./VariationSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";

const VariationSlider = ({ variations,id }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 640) {
          setQuantity(5);
        } else {
          setQuantity(10);
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return (
    <div className="homeBrand px-4 sm:px-0 ">
      <Swiper
        slidesPerView={quantity}
        spaceBetween={0}
        navigation={quantity > 5?true:false}
        // pagination={false}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        modules={[Navigation, Autoplay]}
        className="variation-swiper"
      >
        {variations?.map((variation,i) => {
          let code = variation?.code;
          let style = { backgroundColor: code };
          return (
          <SwiperSlide>
            <Link href={`/product/${variation.product_id}`}>
              <div
                className={`w-[30px] h-[30px] cursor-pointer rounded-full ${id===variations[i]?.product_id?"border border-secondary border-[2px]":""}`}
                style={style}
              >
                {/* <p className="opacity-0 hover:opacity-60 bg-secondary text-primary px-2 absolute ml-[-150px] ease-in-out duration-200">{variation.color}</p>prod */}
              </div>
            </Link>
          </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default VariationSlider;
