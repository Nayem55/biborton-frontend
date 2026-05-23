import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { toast } from "react-hot-toast";

const OrderDetails = () => {
  const { id } = useParams();
  const [date, setDate] = useState();
  const [status, setStatus] = useState();
  const [order, setOrder] = useState({});
  const { products } = useContext(ThemeContext);

  useEffect(() => {
    fetch(`http://localhost:3200/order/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDate(data.order_date);
        setStatus(data.order_status);
        setOrder(data);
      });
  }, []);

  return (
    <div className="p-4 sm:p-12">
      <p className="text-2xl">Order Details</p>
      <p className="text-black text-opacity-60">
        Payment via Cash on delivery.
      </p>
      <div className="mt-10 border p-4 sm:p-10 flex flex-col gap-10 sm:flex-row justify-between">
        <div>
          <p className="text-xl mb-4">General</p>
          <p>Date created : {date}</p>
          <p>Order status : {status}</p>
        </div>
        <div>
          <p className="text-xl">Billing</p>
          <p className="text-black text-opacity-60">
            {order?.billing?.first_name + " " + order?.billing?.last_name}
          </p>
          <p className="text-black text-opacity-60">
            {order?.billing?.address_1 + " " + order?.billing?.state}
          </p>
          <p className="text-black text-opacity-60">Email address:</p>
          <p className="text-black text-opacity-60">{order?.billing?.email}</p>
          <p className="text-black text-opacity-60">Phone:</p>
          <p className="text-black text-opacity-60">{order?.billing?.phone}</p>
        </div>
        <div>
          <p className="text-xl">Shipping</p>
          <p className="text-black text-opacity-60">
            {order?.billing?.first_name + " " + order?.billing?.last_name}
          </p>
          <p className="text-black text-opacity-60">
            {order?.billing?.address_1 + " " + order?.billing?.state}
          </p>
        </div>
      </div>
      <div className="border mt-10 p-10">
        <div className="flex justify-between mb-10">
          <div>
            <p>Item</p>
          </div>
          <div className="flex gap-6 ">
            <p className="w-[100px] text-left hidden sm:block">Cost</p>
            <p className="w-[100px] text-left hidden sm:block">Qty</p>
            <p className="w-[100px] text-left">Total</p>
          </div>
        </div>
        {order?.items?.map((order) => (
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                className="w-[50px] hidden sm:block mr-6"
                src={order?.product_img}
                alt=""
              />
              <div>
                <p className="mr-10">{order?.product_name}</p>
                <p className="text-black text-opacity-60">
                  SKU:{" "}
                  {
                    products?.find(
                      (product) => product?._id === order?.product_id,
                    )?.sku
                  }
                </p>
              </div>
            </div>
            <div className="flex gap-6 text-left">
              <p className="w-[100px] text-left hidden sm:block">
                TK. {order.total / order.quantity}
              </p>
              <p className="w-[100px] text-left hidden sm:block">
                {order.quantity}
              </p>
              <p className="w-[100px] text-left">TK. {order.total}</p>
            </div>
          </div>
        ))}
        <div className="flex justify-between mt-10">
          <div>
            <p>Shipping charge</p>
          </div>
          <div className="flex gap-6 text-left">
            <p className="w-[100px] text-left">TK. {order?.shipping_total}</p>
          </div>
        </div>
        <div className="flex justify-between mt-[100px]">
          <div>
            <p></p>
          </div>
          <div className="text-left mr-4">
            <div className="w-[320px] text-right sm:mr-[37px] text-accent font-bold flex gap-4 sm:justify-between">
              <p>Items Subtotal:</p>
              <p>TK. {order.subtotal}</p>
            </div>
            <div className="w-[320px] text-right sm:mr-[37px] text-accent font-bold flex gap-4 sm:justify-between">
              <p>Shipping:</p>
              <p>TK. {order.shipping_total}</p>
            </div>
            <div className="w-[320px] text-right sm:mr-[37px] text-accent font-bold flex gap-4 sm:justify-between">
              <p>Order Total:</p>
              <p>TK. {order.total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
