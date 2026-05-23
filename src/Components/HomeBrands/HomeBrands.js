"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "./HomeBrand.css";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";

const HomeBrands = () => {
  const { setCategory, setBrand } = useContext(ThemeContext);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setQuantity(1); // Keep it 1 based on current logic, but made SSR safe
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="homeBrand 2xl:w-[80%] lg:w-[85%] mx-auto px-4 lg:px-0 ">
      <h2 className="text-center">OUR BRANDS</h2>
      <Swiper
        slidesPerView={quantity}
        spaceBetween={quantity < 5 ? 0 : 50}
        navigation={quantity < 5 ? false : true}
        pagination={quantity < 5 ? { dynamicBullets: true } : false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Link
            onClick={() => {
              setCategory("brand");
              localStorage.setItem("category", "brand");
              setBrand("armaf");
              localStorage.setItem("brand", "armaf");
            }}
            className="mb-16"
            href="/category/armaf"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0559/7921/2972/files/Armaf_Luxury_french_logo_350x.jpg?v=1620128356"
              alt=""
            />
          </Link>
        </SwiperSlide>
        {/* <SwiperSlide>
          <Link onClick={()=>{
              setCategory("brand")
              localStorage.setItem('category','brand')
              setBrand("flavia")
              localStorage.setItem('brand','flavia')
            }}
            to="/category/flavia">
            <img
              src="https://cdn.shopify.com/s/files/1/0559/7921/2972/files/Flavia_Square_350x.jpg?v=1620128356"
              alt=""
            />
          </Link>
        </SwiperSlide> */}
        {/* <SwiperSlide>
          <Link onClick={()=>{
              setCategory("brand")
              localStorage.setItem('category','brand')
              setBrand("estiara")
              localStorage.setItem('brand','estiara')
            }}
            to="/category/estiara">
            <img
              src="https://cdn.shopify.com/s/files/1/0559/7921/2972/files/estiara_29f0aab0-ba7e-4df8-8eb7-7db49e5978a6_350x.jpg?v=1620128356"
              alt=""
            />
          </Link>
        </SwiperSlide> */}
        <SwiperSlide>
          <Link
            onClick={() => {
              setCategory("brand");
              localStorage.setItem("category", "brand");
              setBrand("armaf enchanted");
              localStorage.setItem("brand", "armaf enchanted");
            }}
            href="/category/armaf enchanted"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0559/7921/2972/files/Estiara_Logo_350x.jpg?v=1620128356"
              alt=""
            />
          </Link>
        </SwiperSlide>
        {/* <SwiperSlide>
          <Link onClick={()=>{
              setCategory("brand")
              localStorage.setItem('category','brand')
              setBrand("bioluxe")
              localStorage.setItem('brand','bioluxe')
            }}
            to="/category/bioluxe">
            <img
              src="https://cdn.shopify.com/s/files/1/0559/7921/2972/files/Bioluxe_Logo_350x.jpg?v=1620128356"
              alt=""
            />
          </Link>
        </SwiperSlide> */}
        {/* <SwiperSlide>
          <Link onClick={()=>{
              setCategory("brand")
              localStorage.setItem('category','brand')
              setBrand("paris")
              localStorage.setItem('brand','paris')
            }}
            to="/category/paris">
            <img
              src="https://cdn.shopify.com/s/files/1/0559/7921/2972/files/Paris_350x.jpg?v=1620128356"
              alt=""
            />
          </Link>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default HomeBrands;
