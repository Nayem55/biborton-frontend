"use client";
import React, { useContext, useEffect, useState } from "react";
import "./MobileCategory.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { X, ChevronDown } from "lucide-react";
import { FASHION_MENU_CONFIG } from "../../lib/fashionMenuConfig";

const MobileCategory = ({ menu, handleMenu }) => {
  const { setCategory } = useContext(ThemeContext);
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    handleMenu(false);
  }, [pathname, handleMenu]);

  const closeMenu = () => handleMenu(false);
  const menuConfig = FASHION_MENU_CONFIG;

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div
      className={`mobile-category-container fixed top-0 left-0 h-full w-72 bg-black/95 backdrop-blur-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        menu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full ">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-xl font-bold tracking-wide">Menu</h2>
          <button onClick={closeMenu}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
          {menuConfig.map((item) => (
            <div key={item.name}>
              {/* MAIN LINK */}
              <div className="flex items-center justify-between">
                <Link
                  href={item.link}
                  onClick={closeMenu}
                  className="flex-1 py-3 px-4 font-medium hover:bg-white/10 rounded-lg"
                >
                  {item.name}
                </Link>

                {/* Dropdown toggle */}
                {item.dropdown && (
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="px-3"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition ${
                        openMenus[item.name] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* DROPDOWN */}
              {item.dropdown && openMenus[item.name] && (
                <div className="pl-6 space-y-4 py-2">
                  {item.dropdown.map((col, i) => (
                    <div key={i}>
                      <p className="text-xs text-gray-400 mb-1">{col.title}</p>

                      {col.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={closeMenu}
                          className="block py-2 px-2 text-sm hover:bg-white/5 rounded"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Static Links */}
          <Link
            href="/about"
            onClick={closeMenu}
            className="block py-3 px-4 hover:bg-white/10 rounded-lg"
          >
            ABOUT
          </Link>

          <Link
            href="/shop"
            onClick={closeMenu}
            className="block py-3 px-4 hover:bg-white/10 rounded-lg"
          >
            SHOP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileCategory;
