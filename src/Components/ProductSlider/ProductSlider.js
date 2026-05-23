"use client";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import SliderProduct from "../SliderProduct/SliderProduct";

export default function ProductSlider({ swiperProducts }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="px-[6%]">
      <Carousel
        // autoPlay={true}
        // autoPlaySpeed={3000}
        responsive={responsive}
      >
        {swiperProducts?.map((product) => (
          <SliderProduct key={product?._id} product={product}></SliderProduct>
        ))}
      </Carousel>
      ;
      {/* <Swiper
        slidesPerView={window.innerWidth<740?1:window.innerWidth<992?2:3}
        spaceBetween={20}
        pagination={window.innerWidth < 700 ? false : { dynamicBullets: true } }
        navigation={window.innerWidth < 992 ? false : true}
        modules={[Pagination,Navigation]}
        className="myProductSwiper"
      >
        {swiperProducts?.map((product) => (
          <SwiperSlide className="text-center w-[300px]">
            <Link href={`/product/${product._id}`}>
              <div className="h-[230px] sm:h-[320px]">
                <img
                  className="w-[190px] sm:w-[250px] mx-auto"
                  alt=""
                  src={product?.images[0]?.src}
                />
              </div>
            </Link>

            <p>{product?.name}</p>
            <div className={`flex gap-2 justify-center`}>
              <p className="text-accent font-bold">
                {" "}
                {JSON.stringify(product?.on_sale) === "true"
                  ? product?.sale_price
                  : product?.regular_price}{" "}
                TK.
              </p>
              {JSON.stringify(product.on_sale) === "true" && (
                <p
                  style={{
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                    color: "#000",
                    opacity: 0.5,
                  }}
                >
                  {`${product?.regular_price} TK.`}
                </p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
}
