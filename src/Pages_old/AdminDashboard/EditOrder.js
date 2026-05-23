import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { toast } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const EditOrder = () => {
  const { id } = useParams();
  const [date, setDate] = useState();
  const [status, setStatus] = useState();
  const [platform, setPlatform] = useState();
  const [order, setOrder] = useState({});
  const { products } = useContext(ThemeContext);
  const [disabled, setDisabled] = useState(false);
  const [couponText, setCouponText] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`http://localhost:3200/uniqueOrder/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDate(data.order_date);
        setStatus(data.order_status);
        setPlatform(data.platform);
        setOrder(data);
      });
    fetch(`http://localhost:3200/getCoupons`)
      .then((res) => res.json())
      .then((data) => setCoupons(data));
  }, []);
  const handleUpdate = () => {
    const data = {
      order_status: status,
      platform: platform,
      updated_by: user.email || user.phoneNumber,
      last_updated: new Date().toISOString(), // <-- Add this line
    };

    fetch(`http://localhost:3200/editOrder/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Update result:", result);
        toast.success("Order updated successfully");
        // Optional: refetch orders to reflect changes immediately
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update order");
      });
  };
  const handleCoupon = (id) => {
    const appliedCoupon = coupons.find(
      (coupon) => coupon.code.toLowerCase() === couponText.toLocaleLowerCase(),
    );
    const currentDate = new Date();
    const couponExpiryDate = new Date(appliedCoupon?.date_expires);
    if (appliedCoupon && currentDate <= couponExpiryDate) {
      let data = {};
      if (appliedCoupon.discount_type === "percent") {
        data = {
          subtotal: JSON.stringify(
            order?.subtotal -
              Math.floor(order?.subtotal * (appliedCoupon.amount / 100)),
          ),
          total: JSON.stringify(
            parseInt(
              order?.subtotal -
                Math.floor(order?.subtotal * (appliedCoupon.amount / 100)),
            ) + parseInt(order.shipping_total),
          ),
          coupon_used: appliedCoupon || null,
        };
        setSubTotal(
          order?.subtotal -
            Math.floor(order?.subtotal * (appliedCoupon.amount / 100)),
        );
        setTotal(
          parseInt(
            order?.subtotal -
              Math.floor(order?.subtotal * (appliedCoupon.amount / 100)),
          ) + parseInt(order.shipping_total),
        );
      } else {
        data = {
          subtotal: JSON.stringify(order?.subtotal - appliedCoupon.amount),
          total: JSON.stringify(
            parseInt(order?.subtotal - appliedCoupon.amount) +
              parseInt(order.shipping_total),
          ),
          coupon_used: appliedCoupon || null,
        };
        setSubTotal(order?.subtotal - appliedCoupon.amount);
        setTotal(
          parseInt(order?.subtotal - appliedCoupon.amount) +
            parseInt(order.shipping_total),
        );
      }
      fetch(`http://localhost:3200/editOrder/${id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      toast.success("Coupon added successfully");
    }
  };
  return (
    <div className="p-10">
      <p className="text-2xl">Order Details</p>
      <p className="text-black text-opacity-60">
        Payment via Cash on delivery.
      </p>
      <div className="mt-10 border p-10 flex justify-between gap-10">
        <div>
          <p className="text-xl">General</p>
          <p>Date created :</p>
          <input
            type="text"
            value={date}
            className="border px-4 my-2 border-secondary"
          ></input>
          <p>Platform :</p>
          <div>
            <select
              onChange={(e) => setPlatform(e.target.value)}
              className="border px-4 py-1 mt-2 border-secondary"
            >
              <option>{platform}</option>
              <option>web</option>
              <option>social media</option>
            </select>
            <button
              onClick={handleUpdate}
              className="px-4 bg-accent py-[3px] ml-2 text-primary hover:bg-secondary ease-in-out duration-200"
            >
              Save
            </button>
          </div>
          <p>Order status :</p>
          <div>
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="border px-4 py-1 mt-2 border-secondary"
            >
              <option>{status}</option>
              <option>Pending payment</option>
              <option>Processing</option>
              <option>On hold</option>
              <option>Completed</option>
              <option>Pertially shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
              <option>Cancelled (Stock Out)</option>
              <option>Cancelled (Customer Change of mind)</option>
              <option>Cancelled (Delivery delay)</option>
              <option>Cancelled (Out of Coverage Area)</option>
              <option>Refunded</option>
              <option>Failed</option>
              <option>Shipping</option>
              <option>New order</option>
            </select>
            <button
              onClick={handleUpdate}
              className="px-4 bg-accent py-[3px] ml-2 text-primary hover:bg-secondary ease-in-out duration-200"
            >
              Save
            </button>
          </div>
          <p className="mt-6">Updated by : {order?.updated_by}</p>
        </div>
        <div>
          <p className="text-xl">Billing</p>
          <p className="text-black text-opacity-60">
            {order?.billing?.first_name + " " + order?.billing?.last_name}
          </p>
          <p className="text-black text-opacity-60">
            {order?.billing?.address_1 + " " + order?.billing?.state}
          </p>
          <p className="text-black text-opacity-60">
            <spanm className="font-bold text-black text-opacity-100">
              District :
            </spanm>{" "}
            {order?.billing?.city}
          </p>
          {order?.billing?.postcode && (
            <p className="text-black text-opacity-60">
              <spanm className="font-bold text-black text-opacity-100">
                Area :
              </spanm>{" "}
              {order?.billing?.postcode}
            </p>
          )}

          <p className="text-black font-bold">Email address :</p>
          <p className="text-black text-opacity-60">{order?.billing?.email}</p>
          <p className="text-black font-bold">Phone :</p>
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
            <p className="w-[100px] text-left">Cost</p>
            <p className="w-[100px] text-left">Qty</p>
            <p className="w-[100px] text-left">Total</p>
          </div>
        </div>
        {order?.items?.map((order) => (
          <div className="flex justify-between">
            <div className="flex items-center">
              <img className="w-[50px]" src={order?.product_img} alt="" />
              <div>
                <p>{order?.product_name}</p>
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
              <p className="w-[100px] text-left">
                TK. {order.total / order.quantity}
              </p>
              <p className="w-[100px] text-left">{order.quantity}</p>
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
        <div className="flex justify-between">
          <div>
            <p>Applied coupon</p>
          </div>
          <div className="flex gap-6 text-left">
            <p className="w-[100px] text-left">
              {order?.coupon_used?.code
                ? order?.coupon_used?.code
                : order?.coupon_used}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-[100px]">
          <div className="">
            <input
              onChange={(e) => setCouponText(e.target.value)}
              type="text"
              placeholder="Add a coupon"
              className="border border-secondary py-1 px-4"
            />
            <button
              onClick={() => handleCoupon(order?.id)}
              className="ml-4 bg-accent px-4 py-1 text-primary hover:bg-secondary ease-in-out duration-200"
            >
              Add Coupon
            </button>
          </div>
          <div className="text-left mr-4">
            <div className="w-[300px] text-right mr-[37px] text-accent font-bold flex justify-between">
              <p>Items Subtotal:</p>
              <p>TK. {subTotal > 0 ? subTotal : order.subtotal}</p>
            </div>
            <div className="w-[300px] text-right mr-[37px] text-accent font-bold flex justify-between">
              <p>Shipping:</p>
              <p>TK. {order.shipping_total}</p>
            </div>
            <div className="w-[300px] text-right mr-[37px] text-accent font-bold flex justify-between">
              <p>Order Total:</p>
              <p>TK. {total > 0 ? total : order.total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
