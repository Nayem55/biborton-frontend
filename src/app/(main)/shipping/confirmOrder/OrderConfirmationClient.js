"use client";
import React, { useEffect, useState } from "react";

const OrderConfirmationClient = () => {
  const [confirmationData, setConfirmationData] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const confirmationTime = JSON.parse(localStorage.getItem("orderTime"));
      if (confirmationTime) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/orderConfirmation/${confirmationTime}`)
          .then((res) => res.json())
          .then((data) => setConfirmationData(data))
          .catch((err) => console.error("Confirmation fetch error:", err));
      }
    }
  }, []); 

  const items = confirmationData?.items || [];
  const subtotal = items.reduce((sum, item) => sum + Number(item.total || 0), 0);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const orderDate = confirmationData?.order_date
    ? new Date(confirmationData.order_date)
    : null;
  const formattedDate = orderDate
    ? `${months[orderDate.getMonth()]} ${orderDate.getDate()}, ${orderDate.getFullYear()}`
    : "—";

  return (
    <div className="min-h-screen bg-gray-50/70 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Thank You Card */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 md:p-8 text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Thank You!
          </h1>
          <p className="text-gray-600 mb-2">
            Your order has been received successfully.
          </p>
          <p className="text-sm text-gray-500">
            Our delivery partner <span className="font-medium">Luvit</span> will process it soon.
          </p>
        </div>

        {/* Order Summary Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Order Number</p>
            <p className="text-lg font-bold text-[#49ADFF]">#{confirmationData?.id || "—"}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Date</p>
            <p className="text-lg font-bold text-gray-800">{formattedDate}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Total</p>
            <p className="text-lg font-bold ">৳ {confirmationData?.total || 0}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Payment</p>
            <p className="text-lg font-medium text-gray-800">
              {confirmationData?.payment_method || "—"}
            </p>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Details</h2>

            {/* Table Header */}
            <div className="flex justify-between text-sm font-semibold text-gray-700 pb-3 border-b border-gray-200">
              <span>Product</span>
              <span>Total</span>
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-100 py-2">
              {items.length > 0 ? (
                items.map((item, index) => (
                  <div
                    key={`${item.product_name}-${index}`}
                    className="py-4 flex justify-between items-start text-sm"
                  >
                    <div className="pr-4">
                      <p className="font-medium text-gray-900">
                        {item.product_name} × {item.quantity}
                      </p>
                      {item?.variation && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.variation}
                        </p>
                      )}
                    </div>
                    <p className="font-medium text-gray-900 whitespace-nowrap">
                      ৳ {Number(item.total).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="py-6 text-center text-gray-500">No items found</p>
              )}
            </div>

            {/* Summary */}
            <div className="pt-6 space-y-3 text-sm border-t border-gray-200">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium">৳ {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Fixed Cart Discount</span>
                <span className="font-medium text-red-600">
                  -৳{" "}
                  {(
                    subtotal +
                    Number(confirmationData?.shipping_total || 0) -
                    Number(confirmationData?.total || 0)
                  ).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-medium">
                  ৳ {Number(confirmationData?.shipping_total || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-gray-700 pt-3 border-t font-medium">
                <span>Payment Method</span>
                <span>{confirmationData?.payment_method || "—"}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-[#49ADFF] pt-4 border-t">
                <span>Total</span>
                <span>৳ {Number(confirmationData?.total || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <p className="text-center text-sm text-gray-500 mt-10">
          Thank you for shopping with us! We'll notify you once your order ships.
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmationClient;