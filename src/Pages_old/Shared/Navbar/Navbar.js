import React, { useContext, useState } from "react";
import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { ThemeContext } from "../../../Contexts/ThemeContext";
import SearchedProducts from "../../../Components/SearchedProducts/SearchedProducts";
import Cart from "../../../Components/Cart/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useScroll from "../../../Hooks/useScroll";

const Navbar = ({ popCart, handlePopCart }) => {
  const [user] = useAuthState(auth);
  const { products, searchText, setSearchText, setCategory } =
    useContext(ThemeContext);

  const [focus, setFocus] = useState(false);
  const [scrollPosition] = useScroll();
  const router = useRouter();

  // ✅ CHECK RESELLER LOGIN
  const reseller = JSON.parse(localStorage.getItem("reseller"));
  console.log(reseller);

  let searchedProducts = [];
  let highPriorityProducts = [];

  if (searchText.length > 2) {
    searchedProducts = products?.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // ✅ USER ICON CLICK HANDLER
  const handleUserRedirect = () => {
    if (reseller) {
      router.push("/reseller-dashboard");
    } else if (user) {
      router.push("/customerDashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="w-full hidden lg:block z-10 bg-primary">
      <div className="navbar px-0 py-6 lg:px-10 flex justify-between">
        {/* LOGO */}
        <div className="cursor-pointer">
          <Link href="/">
            <Image 
              src="https://luvit.com.bd/wp-content/uploads/2026/03/favicon.png" 
              alt="MYNTLogo" 
              width={200}
              height={80}
              className="w-full h-[80px]"
              priority
              quality={90}
            />
          </Link>
        </div>

        {/* SEARCH */}
        <div className="form-control text-black 2xl:w-[60%] lg:w-[50%] relative">
          <form
            className="input-group"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search/${searchText}`);
              setFocus(false);
            }}
          >
            <input
              type="text"
              className="border border-r-0 border-[#cccccc] w-full px-4"
              placeholder="Search products"
              onFocus={() => setFocus(true)}
              onBlur={() => setTimeout(() => setFocus(false), 200)}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-rounded bg-primary border border-l-0 border-[#cccccc]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>

          {/* SEARCH RESULTS */}
          <SearchedProducts
            highPriorityProducts={highPriorityProducts}
            searchedProducts={searchedProducts}
            focus={focus}
          />
        </div>

        {/* USER + CART */}
        <div>
          <div
            className={`cart-icon mobile-cart-position ${
              scrollPosition > 10 ? "cart-scrolled-50" : "cart-not-scrolled"
            } ${
              scrollPosition > 80 ? "cart-scrolled-80" : "cart-scrolled-50"
            }`}
          >
            {/* ✅ UPDATED REDIRECT */}
            <button
              onClick={handleUserRedirect}
              className="hover:text-accent"
            >
              <FontAwesomeIcon
                className="text-[24px] mr-10 mb-2"
                icon={faUser}
              />
            </button>
          </div>

          <Cart popCart={popCart} handlePopCart={handlePopCart} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
