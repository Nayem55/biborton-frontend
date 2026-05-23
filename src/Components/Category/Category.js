import "./Category.css";
import { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";

import LargeCategory from "../LargeCategory/LargeCategory";
import MobileNavMenu from "../MobileNavMenu/MobileNavMenu";

const Category = ({ popCart, handlePopCart }) => {
  const { setCategory, setBrand, setProductType } = useContext(ThemeContext);
  return (
    <div
      className={`sticky top-0 z-[999] bg-secondary ${
        !popCart ? "overflow-hidden lg:overflow-visible" : ""
      }`}
    >
      <LargeCategory
        setProductType={setProductType}
        setCategory={setCategory}
        setBrand={setBrand}
        handlePopCart={handlePopCart}
        popCart={popCart}
      ></LargeCategory>
      <MobileNavMenu
        setProductType={setProductType}
        setCategory={setCategory}
        setBrand={setBrand}
        handlePopCart={handlePopCart}
        popCart={popCart}
      ></MobileNavMenu>
    </div>
  );
};

export default Category;
