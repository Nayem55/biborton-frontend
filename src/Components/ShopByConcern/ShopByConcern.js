import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

import acne from "../../Images/acne.webp";
import haircare from "../../Images/hair care.webp";
import dullSkin from "../../Images/Dull Skin.webp";
import tan from "../../Images/Tanning (1).webp";
import oily from "../../Images/Oily skin.webp";
import dry from "../../Images/Dry skin.webp";
import aging from "../../Images/aging.webp";
import spot from "../../Images/spot.jpg";

import "./ShopByConcern.css";

// ✅ Categories data (easier to manage)
const concerns = [
  { slug: "acne", label: "Acne", img: acne, alt: "Acne skincare products" },
  { slug: "haircare", label: "Haircare", img: haircare, alt: "Hair care solutions" },
  { slug: "dullskin", label: "Dull Skin", img: dullSkin, alt: "Brightening solutions for dull skin" },
  { slug: "tan", label: "Tanning", img: tan, alt: "Anti-tan skincare" },
  { slug: "oily", label: "Oily Skin", img: oily, alt: "Oil control skincare products" },
  { slug: "dry", label: "Dry Skin", img: dry, alt: "Hydrating solutions for dry skin" },
  { slug: "aging", label: "Aging", img: aging, alt: "Anti-aging skincare products" },
  { slug: "spot", label: "Spot", img: spot, alt: "Spot treatment skincare" }
];

const ShopByConcern = () => {
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);

  // ✅ Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Shop by Concern",
    "description": "Browse skincare and haircare products by concern including acne, dull skin, tanning, oily skin, dry skin, aging, and spots.",
    "hasPart": concerns.map((concern) => ({
      "@type": "CollectionPage",
      "name": concern.label,
      "url": `https://yourwebsite.com/product-category/${concern.slug}`
    }))
  };

  return (
    <section className="shopByConcern" aria-label="Shop by Skin & Hair Concerns">
      {/* ✅ Structured Data for Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 25 },
          1400: { slidesPerView: 6, spaceBetween: 30 }
        }}
        pagination={{ clickable: true }}
        grabCursor={!isDragging}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        className="shopConcern"
      >
        {concerns.map((concern, index) => (
          <SwiperSlide key={concern.slug}>
            <Link href={`/product-category/${concern.slug}`} title={`Shop ${concern.label} products`}>
              <img
                className="w-[160px] h-[160px] lg:w-[180px] lg:h-[180px] rounded-full object-cover"
                width={180}
                height={180}
                src={concern.img}
                alt={concern.alt}
                loading="lazy"
              />
              <p className="text-center mt-6 text-2xl font-bold">{concern.label}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ShopByConcern;
