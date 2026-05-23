import { ThemeContext } from "../../Contexts/ThemeContext";
import useScroll from "../../Hooks/useScroll";
import { useContext, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const AllProducts = () => {
  const [linkOneHover, setLinkOneHover] = useState(false);
  const [scrollPosition] = useScroll();

  return (
    <div
      onMouseEnter={() => setLinkOneHover(true)}
      onMouseLeave={() => setLinkOneHover(false)}
      className={`transition-all ease-in-out min-h-[65px] duration-300 flex items-center relative`}
    >
      <Link
        href="/shop"
        className={`mr-10 block font-bold ${
          scrollPosition > 80
            ? "hover:text-accent text-secondary"
            : "text-secondary hover:text-accent"
        }`}
      >
        SHOP
        <FontAwesomeIcon
          className="w-3 ms-2"
          icon={faChevronDown}
        ></FontAwesomeIcon>
      </Link>

      {/* Face Hover product-Category  */}

      <div
        className={`${
          linkOneHover
            ? "absolute text-start pt-[28px] w-[200px] top-[45px] bg-primary right-0 rounded"
            : "hidden"
        }  text-black `}
      >
        <div className="border border-accent border-t-0 rounded shadow-lg px-4 pb-4 pt-4 bg-[#d8e4e9] bg-opacity-20">
          <Link href="/product-category/cica care"
            className=" hover:text-accent block"
          >
            Cica Care
          </Link>
          <div className="h-[1px] my-[10px] w-[100%] bg-accent"></div>
          <Link href="/product-category/face wash"
            className=" hover:text-accent block"
          >
            Face Wash
          </Link>
          <div className="h-[1px] my-[10px] w-[100%] bg-accent"></div>
          <Link href="/product-category/sunscreen"
            className=" hover:text-accent block"
          >
            Sunscreen Cream
          </Link>
          <div className="h-[1px] my-[10px] w-[100%] bg-accent"></div>
          <Link href="/product-category/hand wash"
            className=" hover:text-accent block"
          >
            Hand Wash
          </Link>
          <div className="h-[1px] my-[10px] w-[100%] bg-accent"></div>
          <Link href="/product-category/shower gel"
            className=" hover:text-accent block"
          >
            Shower Gel
          </Link>
          <div className="h-[1px] my-[10px] w-[100%] bg-accent"></div>
          <Link href="/product-category/soothing gel"
            className=" hover:text-accent block"
          >
            Soothing Gel
          </Link>
          <div className="h-[1px] my-[10px] w-[100%] bg-accent"></div>
          <Link href="/product-category/oil" className=" hover:text-accent block">
            Hair Oil
          </Link>
          <div className="h-[1px] my-[10px] w-[100%] bg-accent"></div>
          <Link href="/product-category/shampoo" className=" hover:text-accent block">
            Hair Shampoo
          </Link>
          <div className="h-[1px] my-[10px] w-[100%] bg-accent"></div>
          <Link href="/product-category/conditioner" className=" hover:text-accent block">
            Hair Conditioner
          </Link>

          <div className="h-[1px] my-[10px] w-[100%] bg-accent"></div>
          <Link href="/product-category/moisturizer"
            className=" hover:text-accent block"
          >
            Moisturizer
          </Link>
          <div className="h-[1px] my-[10px] w-[100%] bg-accent"></div>
          <Link href="/product-category/mist toner"
            className=" hover:text-accent block"
          >
            Mist Toner
          </Link>

          <div className="h-[1px] my-[10px] w-[100%] bg-accent"></div>
          <Link href="/product-category/lotion"
            className=" hover:text-accent block"
          >
            Lotion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
