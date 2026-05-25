"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import "./MobileNavMenu.css";
import Cart from "../Cart/Cart";
import Link from "next/link";
import PopCart from "../PopCart/PopCart";
import MobileSearch from "../MobileSearch/MobileSearch";
import MobileCategory from "../MobileCategory/MobileCategory";
import { ThemeContext } from "../../Contexts/ThemeContext";

import { Menu, Search, User, Settings2 } from "lucide-react";

const MobileNavMenu = ({ popCart, handlePopCart }) => {
  const { isAdmin } = useContext(ThemeContext);

  const [showSearch, setShowSearch] = useState(false);
  const [otpUser, setOtpUser] = useState(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        setOtpUser(JSON.parse(user));
      } catch {
        setOtpUser(null);
      }
    }
  }, []);

  const handleSearch = useCallback(
    (value) => {
      setShowSearch(value);

      if (value) {
        setMenu(false);
        handlePopCart(false);
      }
    },
    [handlePopCart],
  );

  const handleMenu = useCallback(
    (value) => {
      setMenu(value);
      setShowSearch(false);

      if (value) {
        handlePopCart(false);
      }
    },
    [handlePopCart],
  );

  useEffect(() => {
    const isOpen = popCart || showSearch || menu;

    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [popCart, showSearch, menu]);

  const closeAll = () => {
    handleMenu(false);
    handleSearch(false);
    handlePopCart(false);
  };

  return (
    <div className="relative z-50 md:hidden">
      <PopCart handlePopCart={handlePopCart} popCart={popCart} />

      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          popCart || menu || showSearch
            ? "bg-white/70 backdrop-blur-xl shadow-lg"
            : "bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-screen-xl px-4 h-14 flex items-center justify-between">
          
          {/* Left Side */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => handleMenu(true)}
              className="text-black/90 hover:text-black transition-colors touch-manipulation"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link
              href="/"
              aria-label="Home"
              onClick={closeAll}
            >
              <img
                src="https://i.ibb.co.com/qL6G2k62/3039b878-bec9-43ca-b082-1cec9a342a71-removebg-preview.png"
                alt="Biborton"
                className="h-10 object-contain mt-[-8px] ml-[-20px]"
                title="Biborton Logo"
                width={140}
                height={50}
              />
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-5 sm:gap-6 -mr-1">
            <button
              type="button"
              aria-label="Search"
              onClick={() => handleSearch(!showSearch)}
              className="text-black/90 hover:text-black transition-colors touch-manipulation"
            >
              <Search className="w-6 h-6 sm:w-5 sm:h-5" />
            </button>

            {isAdmin ? (
              <Link
                href="/admin"
                aria-label="Admin Dashboard"
                onClick={closeAll}
                className="pr-4 text-black/90 hover:text-black transition-transform hover:scale-110 touch-manipulation"
              >
                <Settings2 className="w-6 h-6 sm:w-5 sm:h-5" />
              </Link>
            ) : (
              <Link
                href={otpUser?.phone ? "/dashboard" : "/customerDashboard"}
                aria-label={otpUser?.phone ? "My Account" : "Login"}
                onClick={closeAll}
                className="pr-4 text-black/90 hover:text-black transition-transform hover:scale-110 touch-manipulation"
              >
                <User className="w-6 h-6 sm:w-5 sm:h-5" />
              </Link>
            )}

            <div className="touch-manipulation ml-3">
              <Cart
                popCart={popCart}
                handlePopCart={handlePopCart}
                handleSearch={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>

      {(popCart || menu || showSearch) && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={closeAll}
        />
      )}

      <MobileCategory menu={menu} handleMenu={handleMenu} />

      <MobileSearch showSearch={showSearch} handleSearch={handleSearch} />
    </div>
  );
};

export default MobileNavMenu;