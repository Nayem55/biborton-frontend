"use client"
import { useState } from "react";
import Category from "../Category/Category";

const Header = () => {
  const [popCart, setPopCart] = useState(false);
  const handlePopCart = (boolean) => {
    setPopCart(boolean);
  };
  return (
    <>
      {/* <Navbar popCart={popCart} handlePopCart={handlePopCart}></Navbar> */}
      <Category handlePopCart={handlePopCart} popCart={popCart}></Category>
    </>
  );
};

export default Header;
