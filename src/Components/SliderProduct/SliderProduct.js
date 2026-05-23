import React from "react";
import { useState } from "react";
import Link from "next/link";
import './SliderProduct.css'

const SliderProduct = ({product}) => {
  const [mouseHover, setMouseHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
      className="text-center w-[300px] mx-auto "
    >
      <Link href={`/product/${product._id}`}>
        <div className="h-[230px] sm:h-[320px] slider-img-div">
          <img
            className="w-[190px] sm:w-[250px] mx-auto"
            alt=""
            src={
              mouseHover
                ? product?.images[1]?.src
                  ? product?.images[1]?.src
                  : product?.images[0]?.src
                : product?.images[0]?.src
            }
          />
        </div>
      </Link>

      <p>{product?.name}</p>
      <div className={`flex gap-2 justify-center`}>
        <p className="text-accent font-bold">
          {" "}
          {JSON.stringify(product?.on_sale) === "true"
            ? product?.sale_price
            : product?.regular_price}{" "}
          TK.
        </p>
        {JSON.stringify(product.on_sale) === "true" && (
          <p
            style={{
              textDecorationLine: "line-through",
              textDecorationStyle: "solid",
              color: "#000",
              opacity: 0.5,
            }}
          >
            {`${product?.regular_price} TK.`}
          </p>
        )}
      </div>
    </div>
  );
};

export default SliderProduct;
