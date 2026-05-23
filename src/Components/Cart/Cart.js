"use client";
import React, { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useScroll from "../../Hooks/useScroll";
import { ThemeContext } from "../../Contexts/ThemeContext";
import "./Cart.css";
import { ShoppingBag, ShoppingCart } from "lucide-react";

const Cart = ({ handlePopCart, popCart, handleSearch }) => {
  const pathname = usePathname();
  const [scrollPosition] = useScroll();

  const handleCartClick = () => {
    handlePopCart(!popCart);
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      handleSearch(false);
    }
  };

  const { cart } = useContext(ThemeContext);

  let quantity = 0;
  cart?.forEach((product) => {
    quantity = quantity + product?.quantity;
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex-none">
      {/*----------------- Navbar Cart -----------------*/}
      <div className={` cart-icon  mobile-cart-position`}>
        <div className="indicator">
          {/*-------------- cart icon -------------*/}

          {pathname.includes("/cart") || (
            <button
              type="button"
              aria-label="Open cart"
              onClick={handleCartClick}
              style={{ all: "unset", cursor: "pointer" }} // keeps existing styles intact
            >
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`transition ease-in duration-200 ${
                  scrollPosition > 80
                    ? "h-7 w-7 cursor-pointer  "
                    : "h-7 w-7  cursor-pointer"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.6" // ⬅ thinner stroke = more premium
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386a.75.75 0 01.728.584l.383 1.913M6 14.25h10.5a.75.75 0 00.728-.584l1.5-6.75a.75.75 0 00-.728-.916H5.106M6 14.25L4.106 5.497M9 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm9 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg> */}
              <span className=" ">
                <ShoppingCart className="md:w-[18px] md:h-[18px] w-[22px] h-[22px] text-black"></ShoppingCart>
                {/* <ShoppingCart className="w-[18px] h-[18px] text-white"></ShoppingCart> */}
              </span>

              {mounted && (
                <span
                  className={`badge  ml-1 font-bold border-none cursor-pointer ${
                    scrollPosition > 80
                      ? "lg:badge-sm text-xs"
                      : "lg:badge-sm text-xs"
                  } indicator-item bggg-[#FF0836] bg-transparent flex justify-center items-center text-black/70  pt-[2px]`}
                >
                  {quantity}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;


// "use client";
// import React, { useContext } from "react";
// import { usePathname } from "next/navigation";
// import useScroll from "../../Hooks/useScroll";
// import { ThemeContext } from "../../Contexts/ThemeContext";
// import "./Cart.css";

// const Cart = ({ handlePopCart, popCart, handleSearch }) => {
//   const pathname = usePathname();
//   const [scrollPosition] = useScroll();

//   const handleCartClick = () => {
//     handlePopCart(!popCart);
//     if (typeof window !== "undefined" && window.innerWidth < 640) {
//       handleSearch(false);
//     }
//   };

//   const { cart } = useContext(ThemeContext);

//   let quantity = 0;
//   cart?.forEach((product) => {
//     quantity = quantity + product?.quantity;
//   });

//   return (
//     <div className="flex-none">
//       {/*----------------- Navbar Cart -----------------*/}
//       <div className={` cart-icon  mobile-cart-position`}>
//         <div className="indicator">
//           {/*-------------- cart icon -------------*/}

//           {pathname.includes("/cart") || (
//             <button
//               type="button"
//               aria-label="Open cart"
//               onClick={handleCartClick}
//               style={{ all: "unset", cursor: "pointer" }} // keeps existing styles intact
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`transition ease-in duration-200 ${
//                   scrollPosition > 80
//                     ? "h-7 w-7 cursor-pointer text-secondary "
//                     : "h-7 w-7 text-secondary cursor-pointer"
//                 }`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="1.6" // ⬅ thinner stroke = more premium
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M2.25 3h1.386a.75.75 0 01.728.584l.383 1.913M6 14.25h10.5a.75.75 0 00.728-.584l1.5-6.75a.75.75 0 00-.728-.916H5.106M6 14.25L4.106 5.497M9 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm9 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
//                 />
//               </svg>

//               <span
//                 className={`badge text-primary font-bold border-none cursor-pointer ${
//                   scrollPosition > 80
//                     ? "lg:badge-sm text-xs "
//                     : "lg:badge-sm text-xs"
//                 } indicator-item bg-accent flex justify-center items-center pt-[1px]`}
//               >
//                 {quantity}
//               </span>
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
