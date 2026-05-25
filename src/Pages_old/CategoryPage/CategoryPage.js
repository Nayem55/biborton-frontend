import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "../../Contexts/ThemeContext";
import Product from "../../Components/Shared/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faList } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Helmet } from "react-helmet-async";
import "./CategoryPage.css";
import { Circle, Loader } from "lucide-react";

const CategoryPage = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();
  const [list, setList] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(1000);
  const [sortBy, setSortBY] = useState("Recommanded");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(
      `https://biborton-server.vercel.app/categoryProductCount?name=${category}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const count = data.count;
        const pages = Math.ceil(count / 50);
        setPageCount(pages);
      });

    fetch(`https://biborton-server.vercel.app/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [category]);

  useEffect(() => {
    setCategoryProducts([]);
    setLoading(true);

    fetch(
      `https://biborton-server.vercel.app/getProductsByCategories?name=${category}&page=${page}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setCategoryProducts(data);
        setLoading(false);
      });

    window.scrollTo(0, 0);
  }, [category, page]);

  useEffect(() => {
    if (sortBy === "Price: Low to High") {
      setFilteredProducts(
        [...categoryProducts].sort((a, b) => a.price - b.price),
      );
    } else if (sortBy === "Price: High to Low") {
      setFilteredProducts(
        [...categoryProducts].sort((a, b) => b.price - a.price),
      );
    } else {
      setFilteredProducts([]);
    }
  }, [sortBy, categoryProducts]);

  const handleFilter = () => {
    const filtered = categoryProducts.filter(
      (p) => p.regular_price >= from && p.regular_price <= to,
    );
    setFilteredProducts(filtered);
  };

  const handleReset = () => {
    setFilteredProducts([]);
  };

  const meta_description = categories.find(
    (item) => item?.name?.toLowerCase() === category,
  )?.meta_description;

  const title = categories.find(
    (item) => item?.name?.toLowerCase() === category,
  )?.title;

  const displayProducts =
    filteredProducts.length > 0 ? filteredProducts : categoryProducts;

  return (
    <div
      className={`w-[95%] mb-20 mx-auto ${
        window.innerWidth >= 1920 ? "2xl:w-[65%]" : "2xl:w-[80%]"
      }`}
    >
      <Helmet>
        <title>{`${title || category} - Junaid Jamshed collections`}</title>
        <meta name="description" content={meta_description} />
        <link
          rel="canonical"
          href={`https://biborton.shop/product-category/${category}`}
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "ItemList",
              "name": "${title} - Junaid Jamshed collections",
              "description": "${meta_description || ""}",
              "itemListElement": [
                ${categoryProducts
                  .map(
                    (product, index) => `
                  {
                    "@type": "ListItem",
                    "position": ${index + 1},
                    "url": "https://biborton.shop/product/${product?.slug}"
                  }`,
                  )
                  .join(",")}
              ]
            }
          `}
        </script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="my-10 w-[90%] 2xl:w-full lg:w-full mx-auto">
        <p className="text-[14px] font-semibold">
          Home
          <FontAwesomeIcon className="mx-2" icon={faCaretRight} />
          <span className="inline">{title || category?.toUpperCase()}</span>
        </p>
      </div>

      <h1
        className={`w-[90%] 2xl:w-full lg:w-full mx-auto font-bold my-10 text-[22px] ${
          category?.includes("top 10") ? "text-center" : ""
        }`}
      >
        {category?.toUpperCase()}
      </h1>

      {/* View toggle - you can improve this later */}
      <div className="hidden lg:flex items-center mb-10 gap-4">
        <button onClick={() => setList(false)}>Grid</button>
        <button onClick={() => setList(true)}>List</button>
      </div>

      {loading ? (
        <div className="py-20 min-h-[50vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-accent border-t-transparent"></div>
            <p className="mt-2 text-sm tracking-widest text-secondary opacity-70">
              Loading collections...
            </p>
          </div>
        </div>
      ) : (
        <>
          {list ? (
            <div className="list-container grid gap-6 grid-cols-1">
              {displayProducts.map((product) => (
                <Product key={product._id} list={true} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6">
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
                      ? "bg-accent text-white border-purple-700"
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
};

export default CategoryPage;
