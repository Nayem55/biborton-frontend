"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useScroll from "../../Hooks/useScroll";
import PopCart from "../PopCart/PopCart";
import SearchedProducts from "../SearchedProducts/SearchedProducts";
import Cart from "../Cart/Cart";
import { ThemeContext } from "../../Contexts/ThemeContext";
import Image from "next/image";

import {
  User,
  Search,
  ChevronDown,
  Settings2,
  Phone,
  BadgePercent,
} from "lucide-react";
import { FASHION_MENU_CONFIG } from "../../lib/fashionMenuConfig";

const LargeCategory = ({ popCart, handlePopCart }) => {
  const { products, searchText, setSearchText, isAdmin } =
    useContext(ThemeContext);
  const [otpUser, setOtpUser] = useState(null);
  const [focus, setFocus] = useState(false);
  const navigate = useRouter();
  const [scrollPosition] = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const searchedProducts =
    searchText.length > 2
      ? products?.filter((product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase()),
        )
      : [];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) setOtpUser(JSON.parse(user));
    }
  }, []);

  const menuConfig = FASHION_MENU_CONFIG;

  return (
    <header className="hidden lg:block w-full font-sans ">
      {/* TOP BAR */}
      <div className="bg-white text-black">
        <div className="container mx-auto text-white text-xs py-4 flex justify-between ">
          {/* <span>Save up to 20% on all products with "GET20OFF" code</span> */}
          <span className="">
            Fashion for Every Moment - Free Shipping on Orders Over BDT 3000
          </span>
          <div className="flex gap-6">
            <Link href="/about">About Us</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/privacyPolicy">FAQs</Link>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div
        className={`w-full bg-white transition-all z-40${
          scrollPosition > 50 ? "shadow-md  top-0 z-50 fixed" : ""
        }`}
      >
        <PopCart handlePopCart={handlePopCart} popCart={popCart} />

        <div className="container mx-auto flex items-center justify-between  py-4">
          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold tracking-wide">
            <Image
              src="https://i.ibb.co.com/qL6G2k62/3039b878-bec9-43ca-b082-1cec9a342a71-removebg-preview.png"
              alt="Biborton Logo"
              title="Biborton Logo"
              width={140}
              height={50}
              priority
              className="w-[130px] sm:w-[100px] md:w-[120px] h-auto"
            />
            {/* <span className="tracking-[0.2em] text-[28px]">Biborton</span> */}
          </Link>

          {/* SEARCH */}
          <div className="flex-1 mx-10 relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!searchText.trim()) return;
                navigate.push(`/search/${encodeURIComponent(searchText)}`);
              }}
              className="flex items-center bg-gray-100 rounded-full px-4 py-2"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setTimeout(() => setFocus(false), 150)}
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <Search className="w-5 h-5 text-gray-500" />
            </form>

            <div className="absolute  right-0 top-full pt-5 z-50">
              <SearchedProducts
                searchedProducts={searchedProducts}
                highPriorityProducts={[]}
                focus={focus}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone className="w-4 h-4" />

              <a href="tel:+8801404403596">+8801404403596</a>
            </div>

            <div className="mb-1 ">
              {isAdmin ? (
                <Link href="/admin">
                  <Settings2 className="w-5 h-5" />
                  {/* <GitPullRequestDraft  className="w-[18px] h-[18px]"/> */}
                </Link>
              ) : (
                <Link
                  href={otpUser?.phone ? "/dashboard" : "/customerDashboard"}
                >
                  <User className="w-5 h-5" />
                </Link>
              )}
            </div>

            <Cart popCart={popCart} handlePopCart={handlePopCart} />
          </div>
        </div>

        {/* NAVBAR */}
        <div className="container  mx-auto flex items-center gap-8  py-4 text-sm">
          {menuConfig.map((menu) => (
            <div key={menu.name} className="relative group">
              <Link href={menu.link}>
                <span className="flex items-center gap-1 cursor-pointer">
                  {menu.name}
                  {menu.dropdown && <ChevronDown className="w-3 h-3" />}
                </span>
              </Link>
              {/* 
              <div
        className={`w-full bg-white border-b  transition-all   z-40${
          scrollPosition > 50 ? "shadow-md  top-0 z-50 fixed" : ""
        }`}
      > */}

              {/* DROPDOWN */}
              {menu.dropdown && (
                <div
                  className={`fixed left-0 w-full bg-white shadow-xl opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 ${mounted && scrollPosition > 50 ? "top-[150px]" : "top-[170px]"}`}
                >
                  <div className="container mx-auto py-10 grid grid-cols-5 gap-10">
                    {menu.dropdown.map((col, i) => (
                      <div key={i}>
                        <h4 className="font-semibold mb-3 text-gray-900">
                          {col.title}
                        </h4>

                        {col.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block py-[6px] text-gray-600 hover:text-black"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}

                    {/* OFFER CARD */}
                    <div>
                      {menu.offer && (
                        <Link href={menu.offer.link}>
                          <div className="relative mt-0 overflow-hidden group cursor-pointer">
                            <Image
                              src={menu.offer.image}
                              alt="offer"
                              title="offer"
                              width={700}
                              height={400}
                              className="w-full group-hover:scale-105 transition duration-300"
                            />

                            {/* Overlay */}
                            {/* <div className="absolute inset-0 bgg-black/20 flex flex-col justify-end p-4">
                              <p className="text-xs text-white/80">
                                {menu.offer.subtitle}
                              </p>
                              <h3 className="text-sm font-bold text-white">
                                {menu.offer.title}
                              </h3>
                            </div> */}
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="text-[#b82332] font-medium flex ml-auto gap-2">
            <BadgePercent className="w-5 h-5" />
            <span>Exclusive Fashion Deals!</span>
          </div>
        </div>
      </div>
    </header>
  );
};
export default LargeCategory;
