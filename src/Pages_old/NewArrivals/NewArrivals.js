import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../Contexts/ThemeContext";
import Product from "../../Components/Shared/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faList } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Helmet } from "react-helmet-async";

const NewArrivals = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://biborton-server.vercel.app/newArrivals`)
      .then((res) => res.json())
      .then((data) => {
        setNewProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className={`w-[95%] mx-auto mb-20 ${
        window.innerWidth >= 1920 ? "2xl:w-[65%]" : "2xl:w-[80%]"
      }`}
    >
      <Helmet>
        <title>New Arrivals | Natual Beauty Products Shop Now!</title>
        <meta
          name="description"
          content="Discover the newest beauty products and trends at Junaid Jamshed collections. Update your skincare routine with our latest arrivals."
        />
        <link rel="canonical" href={`https://biborton.shop/newarrivals`} />
      </Helmet>
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
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/sf-regular-filled/48/grid.png"
            alt="grid"
            className="inline mt-[-4px]"
          />
          Grid
        </button>
        <button onClick={() => setList(false)}>
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

export default NewArrivals;
