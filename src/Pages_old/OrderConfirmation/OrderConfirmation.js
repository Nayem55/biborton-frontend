import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../Contexts/ThemeContext";
const OrderConfirmation = () => {
  const confirmationTime = JSON.parse(localStorage.getItem("orderTime"));
  const [confirmationData, setConfirmationData] = useState({});
  const { products } = useContext(ThemeContext);
  useEffect(() => {
    fetch(`http://localhost:3200/orderConfirmation/${confirmationTime}`)
      .then((res) => res.json())
      .then((data) => setConfirmationData(data));
  }, []);
  let subtotal = 0;
  confirmationData?.items?.forEach((product) => {
    subtotal = subtotal + parseInt(product.total);
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${
    months[new Date(confirmationData?.order_date).getMonth()]
  } ${new Date(confirmationData?.order_date).getDate()}, ${new Date(
    confirmationData?.order_date,
  ).getFullYear()}`;

  return (
    <div className="flex flex-col items-center gap-4 text-black">
      <div className="border border-secondary border-dotted p-10 my-10 w-[80%] sm:w-[50%]">
        <p className="text-center text-black">
          Thank you. Your order has been received
        </p>
        <p className="text-center mt-4 text-black">
          The order will be proceed by our online delivery partner luvit
        </p>
        {/* <p className="text-center mt-4">The order will be proceed after 14th June</p> */}
      </div>

      <div className="flex flex-col w-full mb-10 items-center gap-10 sm:flex-row sm:justify-center">
        <div className="text-center">
          <p className="text-secondary text-opacity-70 mb-3">Order number:</p>
          <p className="font-bold">{confirmationData?.id}</p>
        </div>
        <div className="h-[1px] w-[80%] bg-secondary bg-opacity-30 mx-4 sm:h-[60px] sm:w-[1px]"></div>
        <div className="text-center">
          <p className="text-secondary text-opacity-70 mb-3"> Date:</p>
          <p className="font-bold">{formattedDate}</p>
        </div>
        <div className="h-[1px] w-[80%] bg-secondary bg-opacity-30 mx-4 sm:h-[60px] sm:w-[1px]"></div>
        <div className="text-center">
          <p className="text-secondary text-opacity-70 mb-3"> Total:</p>
          <p className="font-bold">{confirmationData?.total} TK.</p>
        </div>
        <div className="h-[1px] w-[80%] bg-secondary bg-opacity-30 mx-4 sm:h-[60px] sm:w-[1px]"></div>
        <div className="text-center">
          <p className="text-secondary text-opacity-70 mb-3">
            {" "}
            Payment method:
          </p>
          <p className="font-bold">{confirmationData?.payment_method}</p>
        </div>
      </div>

      <p className="font-bold">ORDER DETAILS</p>
      <div className="w-[100%] px-6 mb-10 flex flex-col gap-2 lg:w-[50%]">
        <div className="flex justify-between mb-4 mt-6">
          <p className="font-bold">PRODUCT</p>
          <p className="font-bold">TOTAL</p>
        </div>
        <hr className="bg-secondary mb-2 text-secondary" />
        <div>
          {confirmationData?.items?.map((order) => (
            <div className="flex flex-col ">
              <div className="flex justify-between">
                <p className="w-[70%]">
                  {order?.product_name} x{order?.quantity}
                </p>
                <p className="w-[30%] text-right">
                  <span className="text-xs">TK.</span> {order.total}
                </p>
              </div>
              <hr className="bg-secondary my-2 text-secondary" />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <p className="">Subtotal:</p>
          <p className="">
            <span className="text-xs">TK.</span> {subtotal}
          </p>
        </div>
        <hr className="bg-secondary my-2 text-secondary" />
        <div className="flex justify-between">
          <p className="">Fixed Cart Discount:</p>
          <p className="">
            <span className="text-xs">TK.</span>{" "}
            {subtotal +
              parseInt(confirmationData?.shipping_total) -
              parseInt(confirmationData?.total) || 0}
          </p>
        </div>
        <hr className="bg-secondary my-2 text-secondary" />
        <div className="flex justify-between">
          <p className="">Shipping:</p>
          <p className="">
            <span className="text-xs">TK.</span>{" "}
            {confirmationData?.shipping_total}
          </p>
        </div>
        <hr className="bg-secondary my-2 text-secondary" />
        <div className="flex justify-between">
          <p className="">Payment method:</p>
          <p className=""> {confirmationData?.payment_method}</p>
        </div>
        <hr className="bg-secondary my-2 text-secondary" />
        <div className="flex justify-between mb-10">
          <p className="text-xl">Total:</p>
          <p className="text-xl">
            <span className="text-xs">TK.</span> {confirmationData?.total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
