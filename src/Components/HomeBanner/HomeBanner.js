import React from "react";
import "./HomeBanner.css";
import Link from "next/link";
import banner1 from "../../Images/ebay-home-Banner.png";

const HomeBanner = () => {
  return (
    <div className="homeBanner">
      <div className="w-[100vw] overflow-hidden">
        <Link href="/shop">
          <img src={banner1} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default HomeBanner;
