"use client";
import React from "react";
import dynamic from "next/dynamic";
import "./Home.css";

import Banner from "../../Components/Banner/Banner";
import MostFavorite from "../../Components/MostFavorite/MostFavorite";
import FeaturesSection from "../../Components/FeaturesSection/FeaturesSection";
import BestSellers from "../../Components/BestSellers/BestSellers";
import StoreLocator from "../../Components/StoreLocator/StoreLocator";
import HomeAboutUpdated from "../../Components/HomeAboutUpdated/HomeAboutUpdated";
import BestSale from "../../Components/BestSale/BestSale";
import PremiumSection from "../../Components/PremiumSection/PremiumSection";
import BodySpraySecrion from "../../Components/BodySpraySecrion/BodySpraySecrion";
import MssArmaf from "../../Components/MssArmaf/MssArmaf";
import SingleProduct from "../../Components/SingleProduct/SingleProduct";
import FlormarSection from "../../Components/FlormarSection/FlormarSection";
import flormarSection from "../../Components/FlormarSection/FlormarSection";
import Header from "../../Components/Header/Header";
import ShopByCategory from "../../Components/ShopByCategory/ShopByCategory";
import CustomerReview from "../../Components/CustomerReview/CustomerReview";
import ShopByBrand from "../../Components/ShopByBrand/ShopByBrand";
import ChosenForYou from "../../Components/ChosenForYou/ChosenForYou";
import PomoCard from "../../Components/PomoCard/PomoCard";
import BannerCard from "../../Components/Banner/CardBanner";
import NewArrival from "../../Components/BestSale copy/NewArrival";
import { FASHION_CATEGORIES } from "../../lib/fashionMenuConfig";

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
      <h1 className="sr-only">Biborton | Fashion and Lifestyle in Bangladesh</h1>
      {/* <Banner /> */}
      <BannerCard></BannerCard>
      <ShopByBrand></ShopByBrand>
      <ChosenForYou></ChosenForYou>
      <MssArmaf></MssArmaf>
      <BestSale />
      <NewArrival></NewArrival>
      <PremiumSection />
      <GallerySection />

    </div>
  );
};

export default Home;
