"use client";
import React from "react";
import "./Banner.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";


const Banner = () => {
  // Use a state or ref for window width to avoid hydration mismatch, or just a simple check
  const [isDesktop, setIsDesktop] = React.useState(true);
  const [showPagination, setShowPagination] = React.useState(true);

  React.useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth > 992);
      setShowPagination(window.innerWidth >= 700);
    };
    
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const banner01 = isDesktop ? "https://luvit.com.bd/wp-content/uploads/2026/04/banner.png" : "https://luvit.com.bd/wp-content/uploads/2026/04/banner.png";
  const banner02 = isDesktop ? "https://luvit.com.bd/wp-content/uploads/2026/04/banner2.png" : "https://luvit.com.bd/wp-content/uploads/2026/04/banner2.png";
  // const banner04 = isDesktop ? "https://luvit.com.bd/wp-content/uploads/2026/04/banner4.png" : "https://luvit.com.bd/wp-content/uploads/2026/04/banner3.png";
  // const banner05 = isDesktop ? "https://luvit.com.bd/wp-content/uploads/2026/04/banner5.png" : "https://luvit.com.bd/wp-content/uploads/2026/04/banner3.png";
  // const banner07 = isDesktop ? "https://luvit.com.bd/wp-content/uploads/2026/04/banner7.png" : "https://luvit.com.bd/wp-content/uploads/2026/04/banner3.png";


  return (
    <section aria-label="Promotional Banners">
      <Swiper
        spaceBetween={0}
        effect="fade"
        navigation={isDesktop}
        autoplay={{
          delay: 6000, // ⏱ match video duration (6s example)
          disableOnInteraction: false,
        }}
        pagination={!showPagination ? false : { clickable: true }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <figure className="relative w-full">
            <Link href="/shop" className="block">
              <img alt=""
                className="w-full h-auto object-cover"
                src={banner01}
              >
              </img>
            </Link>
          </figure>
        </SwiperSlide>
        <SwiperSlide>
          <figure className="relative w-full">
            <Link href="/shop" className="block">
              <img alt=""
                className="w-full h-auto object-cover"
                src={banner02}
              >
              </img>
            </Link>
          </figure>
        </SwiperSlide>

        {/* <SwiperSlide>
          <figure className="relative w-full">
            <Link href="/shop" className="block">
              <img alt=""
                className="w-full h-auto object-cover"
                src={banner04}
              >
              </img>
            </Link>
          </figure>
        </SwiperSlide>
        <SwiperSlide>
          <figure className="relative w-full">
            <Link href="/shop" className="block">
              <img alt=""
                className="w-full h-auto object-cover"
                src={banner05}
              >
              </img>
            </Link>
          </figure>
        </SwiperSlide>

        <SwiperSlide>
          <figure className="relative w-full">
            <Link href="/shop" className="block">
              <img alt=""
                className="w-full h-auto object-cover"
                src={banner07}
              >
              </img>
            </Link>
          </figure>
        </SwiperSlide> */}
        
      </Swiper>
    </section>
  );
};

export default Banner;
