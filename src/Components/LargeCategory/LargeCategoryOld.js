"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useScroll from "../../Hooks/useScroll";
import PopCart from "../PopCart/PopCart";
import SearchedProducts from "../SearchedProducts/SearchedProducts";
import Cart from "../Cart/Cart";
import { ThemeContext } from "../../Contexts/ThemeContext";

// Lucide icons
import {
  User,
  ShieldCheck,
  Search,
  ShoppingBag,
  ChevronDown,
  Settings2,
} from "lucide-react";
import Image from "next/image";

const LargeCategory = ({ popCart, handlePopCart }) => {
  const { products, searchText, setSearchText, isAdmin } =
    useContext(ThemeContext);
  const [otpUser, setOtpUser] = useState(null);
  const [focus, setFocus] = useState(false);
  const [scrollPosition] = useScroll();
  const navigate = useRouter();

  const searchedProducts =
    searchText.length > 2
      ? products?.filter((product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase()),
        )
      : [];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        setOtpUser(JSON.parse(user));
      }
    }
  }, []);

  // Dropdown items configuration
  const dropdownItems = {
    SHOP: [
      // { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/product-category/new" },
      { label: "Best Sellers", href: "/product-category/best seller" },
      { label: "Jdot Products", href: "/product-category/jdot product" },
      {
        label: "biborton Products",
        href: "/product-category/biborton product",
      },
    ],
    fashionS: [
      { label: "All fashions", href: "/product-category/fashion" },
      { label: "Jdot fashions", href: "/product-category/jdot fashion" },
      {
        label: "biborton fashions",
        href: "/product-category/biborton fashion",
      },
    ],
    "BODY SPRAY": [
      { label: "Jdot Collection", href: "/product-category/jdot body spray" },
      {
        label: "biborton Collection",
        href: "/product-category/biborton body spray",
      },
    ],
  };

  return (
    <header className="hidden lg:block w-full">
      {/* 1. ANNOUNCEMENT BAR */}
      <div className="bg-[#f4b6c7] py-2.5 text-center text-[10px] tracking-[0.4em] text-black uppercase font-light">
        A scent that speaks before you do — Free Shipping on Orders Over BDT
        5000
      </div>

      {/* 2. MAIN HEADER */}
      <div
        className={`z-40 w-full bg-white  transition-all duration-500 ease-in-out ${
          scrollPosition > 50
            ? "fixed top-0 bg-black/90 backdrop-blur-xl shadow-lg border-b border-white/10"
            : "relative bg-transparent border-b border-transparent"
        }`}
      >
        <PopCart handlePopCart={handlePopCart} popCart={popCart} />

        <div className="mx-auto container px-10 flex items-center justify-between h-16 md:h-20">
          {/* LEFT: LOGO */}
          <div className="flex-shrink-0 mb-2">
            <Link href="/" aria-label="Home" className="block">
              {/* <Image
                // src="https://luvit.com.bd/wp-content/uploads/2026/03/Aroma-Talks-logo-3-1.png"
                src="https://luvit.com.bd/wp-content/uploads/2026/03/aroma-talks-logo-gold.png"
                alt="BibortonLogo"
                width={140}
                height={50}
                priority
                className="w-[130px] sm:w-[120px] md:w-[140px] h-auto"
              /> */}
              <span className="text-2xl tracking-[0.3em] font-medium">
                Biborton
              </span>
            </Link>
          </div>
          {/* "New",
            "Shop",
            "Mackeup",
            "Skincare",
            "collection",
            "Body spray",
            "Brands",
            "Top deals", */}

          {/* CENTER: NAVIGATION with updated dropdown */}
          <nav className="flex items-center gap-10">
            {[
              {
                label: "SHOP",
                href: "/shop",
                hasDropdown: true,
              },
              {
                label: "fashionS",
                href: "/product-category/fashion",
                hasDropdown: true,
              },
              {
                label: "BODY SPRAY",
                href: "/product-category/body spray",
                hasDropdown: true,
              },
              {
                label: "ATTAR",
                href: "/product-category/attar",
              },
              { label: "ABOUT US", href: "/about", hasDropdown: false },
              { label: "STORE", href: "/malls", hasDropdown: false },
              // { label: "Dashboard", href: "/admin", hasDropdown: false },
            ].map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="text-xs md:text-sm font-semibold tracking-wider text-black hover:text-black/80 transition-colors flex items-center gap-1"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>

                {/* Updated dropdown */}
                {item.hasDropdown && (
                  <div className="absolute top-full left-0 pt-[30px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                    <div className="bg-white/90 backdrop-blur-lg    shadow-2xl py-4 px-6 min-w-[230px] text-sm text-black/90">
                      <ul className="space-y-3">
                        {dropdownItems[item.label]?.map((subItem) => (
                          <li key={subItem.label}>
                            <Link
                              href={subItem.href}
                              className="hover:text-black block py-1 transition-colors hover:translate-x-1 duration-150"
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* RIGHT: SEARCH + ICONS  */}
          <div className="flex items-center gap-6">
            {/* Sleek Search */}
            <div className="relative">
              <form
                className="flex items-center border  border-black/30 focus-within:border-black/60 transition-colors p-2"
                onSubmit={(e) => {
                  e.preventDefault();

                  if (!searchText.trim()) return;

                  navigate.push(`/search/${encodeURIComponent(searchText)}`);
                  setFocus(false);
                }}
              >
                <Search className="w-4 h-4 text-black/60 mr-2" />
                <input
                  type="text"
                  placeholder="SEARCH"
                  value={searchText}
                  onFocus={() => setFocus(true)}
                  onBlur={() => setTimeout(() => setFocus(false), 150)}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-24 lg:w-36 bg-transparent text-xs tracking-widest text-black placeholder:text-black/50 outline-none uppercase"
                />
              </form>

              {/* Search dropdown */}
              <div className="absolute right-0 top-full pt-5 z-50">
                <SearchedProducts
                  searchedProducts={searchedProducts}
                  highPriorityProducts={[]}
                  focus={focus}
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-5 border-l border-black/15 pl-6">
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="text-black/80 hover:text-black transition-transform hover:scale-110"
                  aria-label="Admin"
                >
                  <Settings2 className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  href={otpUser?.phone ? "/dashboard" : "/customerDashboard"}
                  className="text-black/80 hover:text-black transition-transform hover:scale-110"
                  aria-label="Account"
                >
                  <User className="w-5 h-5 text-black/80" />
                </Link>
              )}

              <div className="transition-transform mt-2">
                <span className="sr-only">Open cart</span>
                <Cart popCart={popCart} handlePopCart={handlePopCart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LargeCategory;
