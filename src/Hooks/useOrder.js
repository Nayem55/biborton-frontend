import { useEffect, useState } from "react";

const useOrder = () => {
  const [orderList, setOrderList] = useState();
  // useEffect(() => {
  //   fetch("http://localhost:3200/order")
  //     .then((res) => res.json())
  //     .then((data) => setOrderList(data));
  // }, []);

  return [orderList, setOrderList];
};
export default useOrder;
