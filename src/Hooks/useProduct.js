import { useEffect, useState } from "react";

const useProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch("http://localhost:3200/products")
    fetch("http://localhost:3200/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return [products, loading];
};
export default useProduct;

// http://localhost:3200/
