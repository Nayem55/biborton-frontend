"use client";
import React, { useContext, useEffect, useState } from "react";
// import { ThemeContext } from "../../Contexts/ThemeContext";
import Product from "../../../Components/Shared/Product"; // Adjusted path
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faList } from "@fortawesome/free-solid-svg-icons";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";
// import "./HomeNewArrivals.css";

const NewArrivalsClient = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(false);

  // Mock window.innerWidth for SSR safety
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/newArrivals`)
      .then((res) => res.json())
      .then((data) => {
        setNewProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className={`w-[95%] mx-auto mb-20 ${
        windowWidth >= 1920 ? "2xl:w-[65%]" : "2xl:w-[80%]"
      }`}
    >
      <div className="my-10 w-[90%] 2xl:w-[full lg:w-full  mx-auto">
        <p className="text-[14px] font-semibold">
          HOME
          <FontAwesomeIcon
            className="mx-2"
            icon={faCaretRight}
          ></FontAwesomeIcon>
          NEW ARRIVALS
        </p>
      </div>
      <h1
        className={`w-[90%] 2xl:w-full lg:w-full mx-auto font-bold my-10 text-[22px]`}
      >
        Natural Skincare Solutions
      </h1>

      <div className="hidden lg:flex items-center mb-10">
        <button onClick={() => setList(false)}>
            {/* Using text or placeholder icon */}
            Grid
        </button>
        <button onClick={() => setList(true)} className="ml-4">
          <FontAwesomeIcon className="mx-2" icon={faList}></FontAwesomeIcon>List
        </button>
      </div>
      {loading && (
        <div className="flex justify-center items-center h-[50vh]">
          <ThreeDots
            height="100"
            width="100"
            radius="10"
            color="#abcacb"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      )}

      {list ? (
        <div className="list-container grid gap-6 grid-cols-1">
          {newProducts?.map((product) => (
            <Product key={product._id} list={list} product={product}></Product>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-y-8 lg:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {newProducts?.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivalsClient;
