import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

const Sitemap = () => {
  const { products } = useContext(ThemeContext);

  return (
    <div>
      {/* {products.map((product) => (
        <p>
          {`<url>`}<br></br>
            {`<loc>`}https://biborton.shop/product/{product.slug}{`</loc>`}<br></br>
          {`</url>`}
        </p>
      ))} */}
      {products.map((product) => (
        <p>
          {`<url>`}
          <br></br>
          {`<loc>`}https://biborton.shop/sku/{product.sku}
          {`</loc>`}
          <br></br>
          {`</url>`}
        </p>
      ))}
    </div>
  );
};

export default Sitemap;
