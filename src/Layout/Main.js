import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import "swiper/css";


import Features from "../Components/Features";
import Header from "../Components/Header/Header";

const Main = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      {!((pathname === "/combo") || (pathname ==="/combo/cart") || (pathname ==="/combo/checkout")) && <Header></Header>}
      <Outlet></Outlet>
      {!((pathname === "/combo") || (pathname ==="/combo/cart") || (pathname ==="/combo/checkout")) && <Footer></Footer>}
    </div>
  );
};

export default Main;
