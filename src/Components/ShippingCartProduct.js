import React from "react";

const ShippingCartProduct = ({ product }) => {
  return (
    <div className="cartModalProductContainer">
      <div className="cartModalProduct">
        <img src={product.images[0].src} alt="" />
        <div className="cartModalProductDetails">
          <p>{product.name}</p>
          <p>
            price :{" "}
            <span className="text-accent font-bold">${product.price}</span>
          </p>
          <p>Quantity : {product.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default ShippingCartProduct;
