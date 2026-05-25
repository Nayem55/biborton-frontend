"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faList } from "@fortawesome/free-solid-svg-icons";
import Product from "../Components/Shared/Product";

const Shop = ({ initialProducts = [], initialPageCount = 0 }) => {
  const [categoryProducts, setCategoryProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams(); // not used (all products page)
  const [list, setList] = useState(false);
  const [pageCount, setPageCount] = useState(initialPageCount);
  const [page, setPage] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(1000);
  const [sortBy, setSortBY] = useState("Recommended");

  // ✅ If you want: only fetch count on client when SSR didn't provide it
  useEffect(() => {
    if (pageCount > 0) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/shopProductCount`)
      .then((res) => res.json())
      .then((data) => {
        const pages = Math.ceil((data?.count || 0) / 50);
        setPageCount(pages);
      });
  }, [pageCount]);

  // ✅ Fetch products ONLY when page changes AND page !== 0 (because 0 is SSR)
  useEffect(() => {
    if (page === 0 && initialProducts?.length) return;

    setCategoryProducts([]);
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryProducts(data || []);
        setLoading(false);
      });

    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [page, initialProducts]);

  // Sorting
  useEffect(() => {
    if (sortBy === "Price: Low to High") {
      setFilteredProducts(
        [...categoryProducts].sort(
          (a, b) =>
            Number(a?.regular_price || 0) - Number(b?.regular_price || 0),
        ),
      );
    } else if (sortBy === "Price: High to Low") {
      setFilteredProducts(
        [...categoryProducts].sort(
          (a, b) =>
            Number(b?.regular_price || 0) - Number(a?.regular_price || 0),
        ),
      );
    } else {
      setFilteredProducts([]);
    }
  }, [sortBy, categoryProducts]);

  // Price filter
  const handleFilter = () => {
    const filtered = categoryProducts.filter(
      (product) =>
        Number(product?.regular_price || 0) >= Number(from || 0) &&
        Number(product?.regular_price || 0) <= Number(to || 0),
    );
    setFilteredProducts(filtered);
  };

  const handleReset = () => {
    setFilteredProducts([]);
  };

  const displayProducts =
    filteredProducts.length > 0 ? filteredProducts : categoryProducts;

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container mx-auto mb-20">
      {/* ================= Breadcrumb ================= */}
      <div className="mt-10 w-[90%] 2xl:w-full lg:w-full mx-auto">
        <p className="text-[14px] font-semibold">
          <Link href={"/"} className="cursor-pointer hover:underline">
            Home
          </Link>
          <FontAwesomeIcon className="mx-2" icon={faCaretRight} />
          <span>Shop</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* ================= H1 ================= */}
        <h1 className="w-[90%] 2xl:w-full lg:w-full mx-auto font-bold my-10 text-xl md:text-2xl pb-10">
          All PRODUCT OF Biborton
        </h1>

        {/* ================= View Toggle ================= */}
        <div className="hidden lg:flex justify-end items-center mb-5 gap-6">
          <button onClick={() => setList(false)}>
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/sf-regular-filled/48/grid.png"
              alt="Grid view"
              className="inline mb-1"
            />
            Grid
          </button>
          <button onClick={() => setList(true)}>
            <FontAwesomeIcon className="mx-2" icon={faList} />
            List
          </button>
        </div>
      </div>

      {/* ================= Content ================= */}
      {loading ? (
        <div className="py-20 min-h-[50vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-accent border-t-transparent"></div>
            <p className="mt-2 text-sm tracking-widest opacity-70">
              Loading collections...
            </p>
          </div>
        </div>
      ) : (
        <>
          {list ? (
            <div className="grid gap-6  grid-cols-1">
              {displayProducts.map((product) => (
                <Product key={product._id} list={true} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-5 sm:gap-8 space-y-0">
              {displayProducts.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* ================= Pagination ================= */}
          {pageCount > 1 && (
            <div className="mt-16 mb-24 flex flex-wrap justify-center gap-3">
              {[...Array(pageCount).keys()].map((index) => (
                <button
                  key={index}
                  onClick={() => setPage(index)}
                  className={`px-4 py-2 border rounded text-sm font-medium ${
                    page === index
                      ? "bg-accent  border-black"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;
