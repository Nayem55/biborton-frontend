import React, { useState } from "react";

const ComboProduct = ({ product }) => {
  const [selectedId, setselectedId] = useState("");

  return (
    <div className="flex flex-col border border-secondary py-10">
      <div className="h-[250px]">
        <img
          className="w-[200px] mx-auto"
          alt=""
          src={product?.images[0].src}
        />
      </div>
      <p className="text-center">{product?.name}</p>
      <p className="text-center font-bold text-accent">
        TK. {product?.regular_price}
      </p>
      <button
        onClick={() => setselectedId(product._id)}
        className="bg-secondary py-1 px-4 text-primary w-[200px] mx-auto mt-4 hover:bg-accent ease-in-out duration-200"
      >
        Select
      </button>
    </div>
  );
};

export default ComboProduct;
