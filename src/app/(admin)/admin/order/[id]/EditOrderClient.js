"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ThemeContext } from "../../../../../Components/Providers";
import { toast } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase.init";

const EditOrderClient = () => {
  const params = useParams();
  const id = params.id;
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [platform, setPlatform] = useState("");
  const [order, setOrder] = useState({});
  const { products } = useContext(ThemeContext);
  const [couponText, setCouponText] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/uniqueOrder/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDate(data.order_date || "");
        setStatus(data.order_status || "");
        setPlatform(data.platform || "");
        setOrder(data);
        setSubTotal(data.subtotal || 0);
        setTotal(data.total || 0);
      });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCoupons`)
      .then((res) => res.json())
      .then((data) => setCoupons(data));
  }, [id]);

  const handleUpdate = () => {
    const data = {
      order_status: status,
      platform: platform,
      updated_by: user?.email || user?.phoneNumber || "System",
      last_updated: new Date().toISOString(),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/editOrder/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => toast.success("Order updated"))
      .catch(() => toast.error("Update failed"));
  };

  const handleCoupon = () => {
    if (!couponText.trim()) return toast.error("Enter coupon code");

    const appliedCoupon = coupons.find(
      (c) => c.code.toLowerCase() === couponText.toLowerCase()
    );

    if (!appliedCoupon) return toast.error("Invalid coupon");
    
    const now = new Date();
    const expiry = new Date(appliedCoupon.date_expires);

    if (now > expiry) return toast.error("Coupon expired");

    let discount = 0;
    if (appliedCoupon.discount_type === "percent") {
      discount = Math.floor(order.subtotal * (appliedCoupon.amount / 100));
    } else {
      discount = appliedCoupon.amount;
    }

    const newSub = order.subtotal - discount;
    const newTotal = newSub + Number(order.shipping_total || 0);

    setSubTotal(newSub);
    setTotal(newTotal);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/editOrder/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subtotal: newSub.toString(),
        total: newTotal.toString(),
        coupon_used: appliedCoupon,
      }),
    })
      .then(() => {
        toast.success("Coupon applied");
        setCouponText("");
      })
      .catch(() => toast.error("Failed to apply coupon"));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order #{id}</h1>
            <p className="text-sm text-gray-600 mt-1">
              Payment: Cash on Delivery
            </p>
          </div>
        </div>

        {/* Main grid - more compact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left - General + Items (bigger column) */}
          <div className="lg:col-span-8 space-y-6">

            {/* General Card - compact */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-5">
              <h2 className="text-lg font-semibold mb-4">General</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">

                <div>
                  <label className="block text-xs text-gray-500 mb-1">Date Created</label>
                  <input
                    type="text"
                    value={date}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-gray-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">Platform</label>
                  <div className="flex gap-2">
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    >
                      <option value="web">Web</option>
                      <option value="social media">Social Media</option>
                    </select>
                    <button
                      onClick={handleUpdate}
                      className="px-4 py-2 bg-[#49ADFF] text-white text-sm rounded hover:bg-[#4698db] hover:scale-105 transition min-w-[70px]"
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Order Status</label>
                  <div className="flex gap-2">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    >
                      <option>Pending payment</option>
                      <option>Processing</option>
                      <option>On hold</option>
                      <option>Completed</option>
                      <option>Partially shipped</option>
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
                      className="px-4 py-2 bg-[#49ADFF] text-white text-sm rounded hover:bg-[#4698db] hover:scale-105 transition min-w-[70px]"
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-600 sm:col-span-2">
                  Updated by: <span className="font-medium">{order?.updated_by || "—"}</span>
                </div>
              </div>
            </div>

            {/* Order Items - compact */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-5">
              <h2 className="text-lg font-semibold mb-4">Items</h2>

              <div className="space-y-4 divide-y divide-gray-100 text-sm">
                {order?.items?.map((item) => (
                  <div key={item.product_id} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-gray-100 flex-shrink-0 overflow-hidden">
                        {item?.product_img ? (
                          <img src={item.product_img} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">No img</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium line-clamp-2">{item.product_name}</p>
                        <p className="text-xs text-gray-500">
                          SKU: {products?.find((p) => p?._id === item?.product_id)?.sku || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-6 sm:gap-10 text-right">
                      <div className="w-20">
                        <p className="text-xs text-gray-500">Unit</p>
                        <p>৳ {(item.total / item.quantity).toFixed(0)}</p>
                      </div>
                      <div className="w-14">
                        <p className="text-xs text-gray-500">Qty</p>
                        <p>{item.quantity}</p>
                      </div>
                      <div className="w-20">
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="font-medium">৳ {item.total}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary - more compact */}
              <div className="mt-6 pt-5 border-t border-gray-200">
                <div className="ml-auto max-w-xs space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>৳ {subTotal || order.subtotal || 0}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>৳ {order.shipping_total || 0}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Coupon</span>
                    <span>{order?.coupon_used?.code || "None"}</span>
                  </div>
                  <div className="pt-3 border-t font-semibold text-base flex justify-between text-indigo-700">
                    <span>Total</span>
                    <span>৳ {total || order.total || 0}</span>
                  </div>
                </div>
              </div>

              {/* Coupon - compact */}
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={couponText}
                  onChange={(e) => setCouponText(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                />
                <button
                  onClick={handleCoupon}
                  className="px-5 py-2 bg-[#49ADFF] text-white text-sm rounded hover:bg-[#4698db] hover:scale-105 transition whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Right column - Billing & Shipping (smaller) */}
          <div className="lg:col-span-4 space-y-6">

            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-5 text-sm">
              <h2 className="text-lg font-semibold mb-4">Billing</h2>
              <div className="space-y-3 text-gray-700">
                <p className="font-medium">
                  {order?.billing?.first_name} {order?.billing?.last_name}
                </p>
                <p className="leading-snug">
                  {order?.billing?.address_1}, {order?.billing?.state}
                </p>
                <p>District: {order?.billing?.city}</p>
                {order?.billing?.postcode && <p>Area: {order?.billing?.postcode}</p>}
                <div>
                  <span className="font-medium">Email:</span><br />
                  {order?.billing?.email}
                </div>
                <div>
                  <span className="font-medium">Phone:</span><br />
                  {order?.billing?.phone}
                </div>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-5 text-sm">
              <h2 className="text-lg font-semibold mb-4">Shipping</h2>
              <p className="font-medium">
                {order?.billing?.first_name} {order?.billing?.last_name}
              </p>
              <p className="mt-2 leading-snug">
                {order?.billing?.address_1}, {order?.billing?.state}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrderClient;