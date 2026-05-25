"use client";
import React from "react";
import dynamic from "next/dynamic";
import "./Home.css";
import BestSale from "../../Components/BestSale/BestSale";
import PremiumSection from "../../Components/PremiumSection/PremiumSection";
import MssArmaf from "../../Components/MssArmaf/MssArmaf";
import ShopByBrand from "../../Components/ShopByBrand/ShopByBrand";
import ChosenForYou from "../../Components/ChosenForYou/ChosenForYou";
import BannerCard from "../../Components/Banner/CardBanner";
import NewArrival from "../../Components/BestSale copy/NewArrival";
import Saree from "../../Components/ChosenForYou/Saree";

// Lazy load heavy video components
const VideoBanner = dynamic(
  () => import("../../Components/Banner/VideoBanner"),
  {
    loading: () => (
      <div className="w-full aspect-video bg-gray-100 animate-pulse" />
    ),
    ssr: false,
  },
);

const VideoPlayer = dynamic(() => import("../../Components/VideoPlayer"), {
  loading: () => (
    <div className="w-full max-w-7xl mx-auto aspect-video bg-gray-100 animate-pulse rounded-lg" />
  ),
  ssr: false,
});

const ReelsSection = dynamic(
  () => import("../../Components/ReelsSection/ReelsSection"),
  {
    loading: () => <div className="py-12 bg-white" />,
    ssr: false,
  },
);

const GallerySection = dynamic(
  () => import("../../Components/GallerySection/GallerySection"),
  {
    loading: () => <div className="py-24 bg-white" />,
    ssr: false,
  },
);

const NewsletterSection = dynamic(
  () => import("../../Components/NewsletterSection/NewsletterSection"),
  {
    loading: () => <div className="py-12 bg-white" />,
    ssr: false,
  },
);

const Home = () => {
  return (
    <div className="home">
      <h1 className="sr-only">
        Biborton | Fashion and Lifestyle in Bangladesh
      </h1>
      {/* <Banner /> */}
      <BannerCard></BannerCard>
      <ShopByBrand></ShopByBrand>
      <ChosenForYou></ChosenForYou>
      <Saree></Saree>
      <MssArmaf></MssArmaf>
      <BestSale />
      <NewArrival></NewArrival>
      <PremiumSection />
      <GallerySection />
    </div>
  );
};

export default Home;
