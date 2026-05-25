"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Product from "../../../../Components/Shared/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const API = process.env.NEXT_PUBLIC_API_URL;

function safeJsonLd(obj) {
  // Prevent JSON-LD script from breaking due to quotes/newlines
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export default function CategoryPageClient({ initialCategory }) {
  const routeParams = useParams(); // ✅ Next.js params
  const rawCategory = routeParams?.category ?? initialCategory ?? ""; // use route first, fallback to server-passed

  // decode + normalize
  const category = useMemo(() => {
    try {
      return decodeURIComponent(String(rawCategory)).trim().toLowerCase();
    } catch {
      return String(rawCategory).trim().toLowerCase();
    }
  }, [rawCategory]);

  const [categoryProducts, setCategoryProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [list, setList] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("Recommended");
  const [categories, setCategories] = useState([]);

  const [windowWidth, setWindowWidth] = useState(1200);

  // Window width
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load category count + categories list
  useEffect(() => {
    if (!category) return;

    fetch(`${API}/categoryProductCount?name=${encodeURIComponent(category)}`)
      .then((res) => (res.ok ? res.json() : { count: 0 }))
      .then((data) => {
        const count = Number(data?.count ?? 0);
        setPageCount(Math.ceil(count / 50));
      })
      .catch(() => setPageCount(0));

    fetch(`${API}/categories`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
  }, [category]);

  // Load products by category + page
  useEffect(() => {
    if (!category) return;

    setCategoryProducts([]);
    setLoading(true);

    fetch(
      `${API}/getProductsByCategories?name=${encodeURIComponent(category)}&page=${page}`,
    )
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setCategoryProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setCategoryProducts([]);
        setLoading(false);
      });

    window.scrollTo(0, 0);
  }, [category, page]);

  // Sorting
  useEffect(() => {
    if (sortBy === "Price: Low to High") {
      setFilteredProducts(
        [...categoryProducts].sort((a, b) => (a?.price ?? 0) - (b?.price ?? 0)),
      );
    } else if (sortBy === "Price: High to Low") {
      setFilteredProducts(
        [...categoryProducts].sort((a, b) => (b?.price ?? 0) - (a?.price ?? 0)),
      );
    } else {
      setFilteredProducts([]);
    }
  }, [sortBy, categoryProducts]);

  // Find category meta/title (normalize both sides)
  const matchedCategory = useMemo(() => {
    return categories.find(
      (item) =>
        String(item?.name ?? "")
          .trim()
          .toLowerCase() === category,
    );
  }, [categories, category]);

  const meta_description = matchedCategory?.meta_description ?? "";
  const title = matchedCategory?.title ?? "";

  const displayProducts =
    filteredProducts.length > 0 ? filteredProducts : categoryProducts;

  const jsonLd = useMemo(() => {
    const itemList = categoryProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://biborton.shop/product/${product?.slug ?? ""}`,
    }));

    return {
      "@context": "http://schema.org",
      "@type": "ItemList",
      name: `${title || category} - Biborton Fashion World`,
      description: meta_description,
      itemListElement: itemList,
    };
  }, [categoryProducts, title, category, meta_description]);

  return (
    <div className="container mb-20 mx-auto px-4">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="my-10 w-[90%] 2xl:w-full lg:w-full mx-auto">
        <p className="text-[14px] font-semibold">
          Home
          <FontAwesomeIcon className="mx-2" icon={faCaretRight} />
          <span className="inline">{title || category.toUpperCase()}</span>
        </p>
      </div>

      <h1
        className={`w-[100%] 2xl:w-full lg:w-full mx-auto font-bold my-10 text-[22px] ${
          category.includes("top 10") ? "text-center" : ""
        }`}
      >
        {category.toUpperCase()}
      </h1>

      {/* Controls */}
      <div className="hidden lg:flex items-center mb-10 gap-4">

        <select
          className="ml-auto border rounded-md px-3 py-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <div className="py-20 min-h-[50vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            <p className="mt-2 text-sm tracking-widest text-secondary opacity-70">
              Loading collections...
            </p>
          </div>
        </div>
      ) : (
        <>
          {list ? (
            <div className="grid gap-6 grid-cols-1">
              {displayProducts.map((product) => (
                <Product key={product._id} list={true} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-4 sm:gap-6">
              {displayProducts.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="mt-16 mb-24 flex flex-wrap justify-center gap-3">
              {[...Array(pageCount).keys()].map((index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-md border ${
                    page === index
                      ? "bg-accent text-black border-purple-700"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setPage(index)}
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
}
