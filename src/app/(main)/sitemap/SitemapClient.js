"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../../../Components/Providers"; // Adjusted path

const SitemapClient = () => {
  const { products } = useContext(ThemeContext);

  // This renders as a visual list of links, not a real XML sitemap.
  return (
    <div>
      {products &&
        products.map((product) => (
          <p key={product._id || product.slug}>
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

export default SitemapClient;
