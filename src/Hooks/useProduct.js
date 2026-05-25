import { useEffect, useState } from "react";

const useProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch("https://biborton-server.vercel.app/products")
    fetch("https://biborton-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return [products, loading];
};
export default useProduct;

// https://biborton-server.vercel.app/
