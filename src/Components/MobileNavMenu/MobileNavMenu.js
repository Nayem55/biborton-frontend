"use client";
import React, { useState, useEffect, useContext } from "react";
import "./MobileNavMenu.css";
import Cart from "../Cart/Cart";
import Link from "next/link";
import PopCart from "../PopCart/PopCart";
import MobileSearch from "../MobileSearch/MobileSearch";
import MobileCategory from "../MobileCategory/MobileCategory";
import { ThemeContext } from "../../Contexts/ThemeContext";

// Lucide icons
import {
  Menu,
  Search,
  User,
  ShieldCheck,
  ShoppingBag,
  Settings2,
} from "lucide-react";

const MobileNavMenu = ({ popCart, handlePopCart }) => {
  const { isAdmin } = useContext(ThemeContext);
  const [userLogin, setUserLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [otpUser, setOtpUser] = useState(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        setOtpUser(JSON.parse(user));
      }
    }
  }, []);

  const handleSearch = (search) => {
    setShowSearch(search);
  };

  const handleMenu = (menu) => {
    setMenu(menu);
    setShowSearch(false);
    if (menu) {
      handlePopCart(false);
    }
  };

  // Prevent body scroll when overlay open
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (popCart || showSearch || menu) {
        if (window.innerWidth < 640) {
          document.body.style.overflow = "hidden";
        }
      } else {
        document.body.style.overflow = "";
      }
    }
  }, [popCart, showSearch, menu]);

  return (
    <div className="relative z-50 md:hidden">
      {/* Pop-up Cart */}
      <PopCart handlePopCart={handlePopCart} popCart={popCart} />

      {/* Main Mobile Header Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          popCart || menu || showSearch
            ? "bg-white/70 backdrop-blur-xl shadow-lg"
            : "bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-screen-xl px-4 h-14 flex items-center justify-between">
          {/* Left:  */}
          <button
            aria-label="Open menu"
            onClick={() => handleMenu(true)}
            className="text-black/90 hover:text-black transition-colors"
          >
            <Menu className="w-7 h-7" />
          </button>

          {/* Center: Logo */}
          <Link
            href="/"
            aria-label="Home"
            className="absolute  left-1/3 -translate-x-1/2 -ml-2 md:ml-1  pr-7 md:pr-0"
          >
            <img
              src="https://i.ibb.co.com/qL6G2k62/3039b878-bec9-43ca-b082-1cec9a342a71-removebg-preview.png"
              alt="Biborton"
              className="h-10 mt-[-10px] object-contain"
              title="Biborton Logo"
              width={140}
              height={50}
              priority
            />
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-5 sm:gap-6 -mr-1">
            {/* Search */}
            <button
              aria-label="Search"
              onClick={() => handleSearch(!showSearch)}
              className="r-2 text-black/90 hover:text-black transition-colors touch-manipulation"
            >
              <Search className="w-6 h-6 sm:w-5 sm:h-5" />
            </button>

            {/* Admin (if applicable) */}
            {isAdmin ? (
              <Link
                href="/admin"
                aria-label="Admin Dashboard"
                className="pr-4 text-black/90 hover:text-black transition-transform hover:scale-110 touch-manipulation"
              >
                <Settings2 className="w-6 h-6 sm:w-5 sm:h-5" />
              </Link>
            ) : (
              <Link
                href={otpUser?.phone ? "/dashboard" : "/customerDashboard"}
                aria-label={otpUser?.phone ? "My Account" : "Login"}
                className="pr-4 text-black/90 hover:text-black transition-transform hover:scale-110 touch-manipulation"
              >
                <User className="w-6 h-6 sm:w-5 sm:h-5" />
              </Link>
            )}

            {/* Cart –  */}
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

      {/* Mobile Menu Drawer */}
      <MobileCategory menu={menu} handleMenu={handleMenu} />

      {/* Mobile Search Drawer */}
      <MobileSearch showSearch={showSearch} handleSearch={handleSearch} />

      {/* Overlay (closes menu/search/cart on click) */}
      {(popCart || menu || showSearch) && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => {
            handleMenu(false);
            handleSearch(false);
            handlePopCart(false);
          }}
        />
      )}
    </div>
  );
};

export default MobileNavMenu;
