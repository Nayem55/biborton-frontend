import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


const MobileAllProducts = () => {
  const [linkOneHover, setLinkOneHover] = useState(false);

  return (
    <div className={`mobile-perfume transition-all ease-in-out duration-300`}>
      <button
        onClick={() => setLinkOneHover(!linkOneHover)}
        className={`mr-10 w-[85%] text-start relative ${
          linkOneHover ? "text-accent" : "text-secondary"
        } font-bold `}
      >
        SHOP
        <FontAwesomeIcon
          className=" w-3 absolute right-0"
          icon={faChevronDown }
        ></FontAwesomeIcon>
      </button>

      {/* Face Hover product-Category  */}

      <div
        className={`mobile-menu-hover ${
          linkOneHover ? "grid-transition text-start px-4 py-4 " : ""
        } text-black `}
      >
        <div>
          <hr className=" w-full my-2 text-accent" />
          <Link
            href="/shop"
            className=" hover:text-accent"
          >
            All Products
          </Link>
          <hr className=" w-full my-2 text-accent" />
          <Link
            href="/product-category/cica care"
            className=" hover:text-accent"
          >
            Cica Care
          </Link>
          <hr className=" w-full my-2 text-accent" />
          <Link
            href="/product-category/face wash"
            className=" hover:text-accent"
          >
            Face Wash
          </Link>
          <hr className=" w-full my-2 text-accent" />
          <Link
            href="/product-category/sunscreen"
            className=" hover:text-accent"
          >
            Sunscreen
          </Link>
          <hr className=" w-full my-2" />
        <Link
          href="/product-category/hand wash"
          className=" hover:text-accent"
        >
          Hand Wash
        </Link>
        <hr className=" w-full my-2" />
        <Link
          href="/product-category/shower gel"
          className=" hover:text-accent"
        >
          Shower Gel
        </Link>
        <hr className=" w-full my-2" />
        <Link
          href="/product-category/soothing gel"
          className=" hover:text-accent"
        >
          Soothing Gel
        </Link>
        <hr className=" w-full my-2" />
        <Link
          href="/product-category/oil"
          className=" hover:text-accent"
        >
          Hair Oil
        </Link>
        <hr className=" w-full my-2" />
        <Link
          href="/product-category/shampoo"
          className=" hover:text-accent"
        >
          Hair Shampoo
        </Link>
        <hr className=" w-full my-2" />
        <Link
          href="/product-category/conditioner"
          className=" hover:text-accent"
        >
          Hair Conditioner
        </Link>
        <hr className=" w-full my-2" />
        <Link
          href="/product-category/moisturizer"
          className=" hover:text-accent"
        >
          Moisturizer
        </Link>
        <hr className=" w-full my-2" />
        <Link
          href="/product-category/mist toner"
          className=" hover:text-accent"
        >
          Mist Toner
        </Link>
 
        <hr className=" w-full my-2 text-accent" />
        <Link
          href="/product-category/lotion"
          className=" hover:text-accent"
        >
          Lotion
        </Link>
 
    

        </div>
      </div>
    </div>
  );
};

export default MobileAllProducts;
