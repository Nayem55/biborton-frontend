"use client";

import React, { useEffect, useState } from "react";
import Product from "../../../../Components/Shared/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faList } from "@fortawesome/free-solid-svg-icons";
import { ThreeDots } from "react-loader-spinner";

const API = process.env.NEXT_PUBLIC_API_URL;

const SearchPageClient = ({ searchText }) => {
  // ✅ searchText is already decoded on server
  // console.log("SearchText:", searchText);

  const decodedSearchText = String(searchText ?? "").trim();

  const [searchedProducts, setSearchedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(false);

  useEffect(() => {
    if (!decodedSearchText) {
      setSearchedProducts([]);
      return;
    }

    let cancelled = false;

    setSearchedProducts([]);
    setLoading(true);

    fetch(`${API}/searchProduct/${decodedSearchText}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (cancelled) return;
        setSearchedProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setSearchedProducts([]);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [decodedSearchText]);

  return (
    <div className="container mx-auto mb-20">
      <div className="my-10 w-[90%] 2xl:w-full lg:w-full mx-auto">
        <p className="text-[14px] font-semibold">
          Home
          <FontAwesomeIcon className="mx-2" icon={faCaretRight} />
          SEARCH RESULTS
        </p>
      </div>

      <h1 className="w-[90%] 2xl:w-full lg:w-full mx-auto font-bold my-10 text-[22px]">
        SEARCH RESULTS: {decodedSearchText}
      </h1>

      <div className="hidden lg:flex items-center mb-10">
        <button onClick={() => setList(false)}>Grid</button>
        <button onClick={() => setList(true)} className="ml-4">
          <FontAwesomeIcon className="mx-2" icon={faList} />
          List
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-[50vh]">
          <ThreeDots
            height="100"
            width="100"
            radius="10"
            color="#000000"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      )}

      {!loading && searchedProducts.length === 0 ? (
        <div className="py-10 text-center opacity-70">
          No products found for “{decodedSearchText}”.
        </div>
      ) : list ? (
        <div className="grid gap-6 grid-cols-1">
          {searchedProducts.map((product) => (
            <Product key={product._id} list={true} product={product} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-y-8 lg:gap-6 lg:grid-cols-5">
          {searchedProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPageClient;
