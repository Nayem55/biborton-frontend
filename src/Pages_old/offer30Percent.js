import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faList } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Product from "../Components/Shared/Product";

const Offer30Percent = () => {
  const [offeryProducts, setOfferyProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://biborton-server.vercel.app/getProductsByTags?name=30 percent",
    )
      .then((res) => res.json())
      .then((data) => {
        setOfferyProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="2xl:w-[65%] lg:w-[75%] w-[95%] mx-auto mb-20">
      <div className="my-10 w-[90%] 2xl:w-[full lg:w-full  mx-auto">
        <p className="text-[14px] font-semibold">
          Home
          <FontAwesomeIcon
            className="mx-2"
            icon={faCaretRight}
          ></FontAwesomeIcon>
          GET 30% OFF
        </p>
      </div>
      <h1
        className={`w-[90%] 2xl:w-full lg:w-full mx-auto font-bold my-10 text-[22px]`}
      >
        GET 30% OFF
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
          {offeryProducts?.map((product) => (
            <Product key={product._id} list={list} product={product}></Product>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-y-8 lg:gap-6 lg:grid-cols-4">
          {offeryProducts?.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
};

export default Offer30Percent;
