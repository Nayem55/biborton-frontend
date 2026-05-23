"use client";
import React, { useState, useEffect } from "react";
import "./SwingImage.css";
import lgBanner from "../../Images/Milk face wash offer web 1800-800 new.png";
import mbBanner from "../../Images/Milk face wash offer web 300-280 new.png";
import Link from "next/link";

const SwingImage = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsDesktop(window.innerWidth > 992);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const banner = isDesktop ? lgBanner : mbBanner;

  return (
    <section className="swing-container" aria-label="Special Promotional Offer">
      <div className="hook"></div>

      <Link
        className="m-4 lg:m-0 lg:w-[40%] flex justify-center"
        href="/product/conditionar-agran-ketarin"
        title="Buy Agran Ketarin Conditioner - Special Offer"
      >
        <img
          className="swing-image"
          src="https://luvit.com.bd/wp-content/uploads/2025/07/b2f15ab4-6c06-4b0a-b8bc-d5da9456d1fb-1200x800.jpg"
          alt="Agran Ketarin Conditioner special offer banner"
          width={isDesktop ? 1200 : 400} 
          height={isDesktop ? 800 : 280} 
          loading="lazy"
        />
      </Link>
    </section>
  );
};

export default SwingImage;
