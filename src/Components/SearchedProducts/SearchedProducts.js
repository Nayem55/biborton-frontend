import React, { useContext } from "react";
import "./SearchedProducts.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeContext } from "../../Contexts/ThemeContext";

const SearchedProducts = ({
  searchedProducts,
  highPriorityProducts,
  focus,
  handleSearch,
}) => {
  const router = useRouter();
  const { searchText } = useContext(ThemeContext);
  

  let searchedArray = [];

  if (highPriorityProducts.length > 0) {
    searchedArray = highPriorityProducts;
  } else {
    searchedArray = searchedProducts;
  }

  return (
    <div className={`searchedProducts bg-white border    ${focus ? "block" : "hidden"}`}>
      <p className="text-xs uppercase tracking-widest font-bold p-3">Search Results:</p>
      {/* <hr className="my-2" /> */}
      <div className="searchedProduct cursor-pointer">
        {searchedArray.slice(0, 3)?.map((product) => (
          <div
          key={product?._id}
            onClick={() => {
              router.push(`/product/${product?.slug}`);
              // handleSearch(false);
            }}
            className="flex flex-col items-center"
          >
            <img src={product.images[0].src} alt="" />
            <div className="searchedProductDetails">
              <p title={product.name}>
                {product.name.length < 40
                  ? product.name
                  : product.name.slice(0, 40) + "....."}
              </p>
              <p className="text-accent font-bold">TK. {(JSON.stringify(product?.on_sale) === "true") 
              ? product?.sale_price
              : product?.regular_price}{" "}</p>
            </div>
          </div>
        ))}
      </div>
      {searchedProducts.length > 0 && (
        <div>
          <hr className="my-2" />
          <Link
            // onClick={() => {
            //   handleSearch(false);
            // }}
            href={`/search/${searchText}`}
          >
            <p className="text-center text-secondary  mt-2 text-xs font-bold hover:text-accent pointer">
              SEE ALL RESULTS ( {searchedProducts.length} )
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchedProducts;
