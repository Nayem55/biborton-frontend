"use client";
import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from 'next/link';
import { ThemeContext } from "../../../Components/Providers"; // Adjusted path

const Bogo3Client = () => {
  const { products,bogoProducts,setSelectedComboproduct1,setSelectedComboproduct2,setComboDiscount } = useContext(ThemeContext);
  useEffect(()=>{
    if (setSelectedComboproduct1) setSelectedComboproduct1({})
    if (setSelectedComboproduct2) setSelectedComboproduct2({})
  },[])

  const OfferProduct = products?.filter((product) =>
    product?.name.toLowerCase().includes("body lotion")
  );
  const freeProducts = products?.filter((product) =>
    product?.name.toLowerCase().includes("shower gel")
  );

  return (
    <div className="2xl:w-[75%] lg:w-[85%] w-[95%] mx-auto mb-20">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-[70%]">
          <p className="text-center lg:text-left font-bold text-xl sm:text-2xl text-accent my-10">Body Lotion 300ML - Choose One </p>
          <div className="grid grid-cols-1 gap-y-8 lg:gap-6 lg:grid-cols-2 2xl:grid-cols-3">
            {OfferProduct?.map((product) => (
              <div key={product._id} className="flex flex-col border border-secondary py-10">
                <div className="h-[250px]">
                  <img
                    className="w-[200px] mx-auto mt-[-40px]"
                    alt=""
                    src={product?.images[0].src}
                  />
                </div>
                <p className="text-center mx-10">{product?.name}</p>
                <p className="text-center font-bold text-accent">
                  TK. {product?.regular_price}
                </p>
                <button
                  onClick={() =>{
                    if (setSelectedComboproduct1) setSelectedComboproduct1(product)
                    toast.success("Product Selected")
                  }}
                  className="bg-secondary py-1 px-4 text-primary w-[150px] mx-auto mt-4 hover:bg-accent ease-in-out duration-200"
                >
                  Select
                </button>
              </div>
            ))}
          </div>
          <p className="text-center lg:text-left font-bold text-xl sm:text-2xl text-accent my-10">
            Shower Gel 350ML - Choose One
          </p>
          <div className="grid grid-cols-1 gap-y-8 lg:gap-6 lg:grid-cols-2 2xl:grid-cols-3">
            {freeProducts?.map((product) => (
              <div key={product._id} className="flex flex-col border border-secondary py-10">
                <div className="h-[250px]">
                  <img
                    className="w-[200px] mx-auto"
                    alt=""
                    src={product?.images[0].src}
                  />
                </div>
                <p className="text-center mx-10">{product?.name}</p>
                <p className="text-center font-bold text-accent">
                  TK. {product?.regular_price}
                </p>
                <button
                  onClick={() =>{
                    if (setSelectedComboproduct2) setSelectedComboproduct2(product)
                    toast.success("Product Selected")
                  }}
                  className="bg-secondary py-1 px-4 text-primary w-[150px] mx-auto mt-4 hover:bg-accent ease-in-out duration-200"
                >
                  Select
                </button>
              </div>
            ))}
          </div>
          
        </div>
        <p className="text-center lg:text-left font-bold text-xl mt-10 lg:hidden">Selected Products</p>
        <div className="lg:w-[30%] border border-secondary sm:mt-[11.5vh] ">
          <div className="sticky top-0 flex flex-col">
            {bogoProducts && bogoProducts.map(
              (product) =>
                Object.keys(product).length > 0 && (
                  <div key={product._id} className="flex flex-col items-center m-10 ">
                    <div className="h-[250px]">
                      <img
                        className="w-[200px] mx-auto"
                        alt=""
                        src={product?.images[0].src}
                      />
                    </div>
                    <p className="text-center mx-10">{product?.name}</p>
                    <p className="text-center font-bold text-accent">
                      TK. {product?.regular_price}
                    </p>
                  </div>
                )
            )}
            <p className={`text-center font-bold text-accent text-xl mx-10 mt-10  ${(bogoProducts && Object.keys(bogoProducts[0]).length > 0 && Object.keys(bogoProducts[1]).length > 0 ) ? "hidden":""}`}>Please choose a product from all section to proceed</p>
            <Link href="/check-out"
            onClick={()=>{if(setComboDiscount) setComboDiscount(42.77)}}
                className={`w-[200px] text-center text-primary py-2 mx-auto my-16 ease-in-out duration-200 ${(bogoProducts && Object.keys(bogoProducts[0]).length > 0 &&Object.keys(bogoProducts[1]).length > 0 )?"bg-secondary hover:bg-accent":"pointer-events-none bg-[#cccccc]"}`}>
              Proceed To Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bogo3Client;
