import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faList } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Product from "../Components/Shared/Product";
import { ThemeContext } from "../Contexts/ThemeContext";

const MaxiBrush = () => {
  //   const [offerProducts, setOfferProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(false);
  const { products } = useContext(ThemeContext);

  const offerProducts = products?.filter((product) =>
    product.name.toLowerCase().includes("maxi brush")
  );

  return (
    <div className="2xl:w-[65%] lg:w-[75%] w-[95%] mx-auto mb-20">
      <div className="my-10 w-[90%] 2xl:w-[full lg:w-full  mx-auto">
        <p className="text-[14px] font-semibold">
          Home
          <FontAwesomeIcon
            className="mx-2"
            icon={faCaretRight}
          ></FontAwesomeIcon>
          NAIL ENAMEL MAXI BRUSH
        </p>
      </div>
      <h1
        className={`w-[90%] 2xl:w-full lg:w-full mx-auto font-bold my-10 text-[22px]`}
      >
        NAIL ENAMEL MAXI BRUSH
      </h1>

      <div className="hidden lg:flex items-center mb-10">
        <button onClick={() => setList(false)}>
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/sf-regular-filled/48/grid.png"
            alt="grid"
            className="inline mt-[-4px]"
          />
          Grid
        </button>
        <button onClick={() => setList(true)}>
          <FontAwesomeIcon className="mx-2" icon={faList}></FontAwesomeIcon>List
        </button>
      </div>
      {loading && (
        <div className="flex justify-center items-center h-[50vh]">
          <ThreeDots
            height="100"
            width="100"
            radius="10"
            color="#7DC569"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      )}

      {list ? (
        <div className="list-container grid gap-6 grid-cols-1">
          {offerProducts?.map((product) => (
            <Product key={product._id} list={list} product={product}></Product>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-y-8 lg:gap-6 lg:grid-cols-4">
          {offerProducts?.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaxiBrush;
