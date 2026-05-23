"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "next/navigation"; // next/navigation ব্যবহার করা উচিত (react-router-dom না)

const CustomerOrders = () => {
  const { ph } = useParams();
  const [userOrders, setUserOrders] = useState([]);
  const [user1Orders, setUser1Orders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchOrders = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch(`http://localhost:3200/userOrder/${ph}`),
          fetch(`http://localhost:3200/user1Order/${ph}`),
        ]);

        const data1 = await res1.json();
        const data2 = await res2.json();

        setUserOrders(Array.isArray(data1) ? data1 : []);
        setUser1Orders(Array.isArray(data2) ? data2 : []);
      } catch (err) {
        console.error("Orders fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [ph]);

  const orders = userOrders.length > 0 ? userOrders : user1Orders;

  const total = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0,
  );
  const aov = orders.length > 0 ? (total / orders.length).toFixed(0) : 0;

  return (
    <div className="min-h-screen bg-gray-50/60 py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Customer Orders
          </h1>
          <div className="flex flex-wrap gap-6 text-sm font-medium">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              Total Spend:{" "}
              <span className="font-bold text-indigo-700">৳ {total}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              AOV: <span className="font-bold text-indigo-700">৳ {aov}</span>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ThreeDots
              height="70"
              width="70"
              radius="9"
              color="#6366f1"
              ariaLabel="loading"
            />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-500 text-lg">
              No orders found for this customer.
            </p>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-5 py-3 text-left text-sm font-semibold w-10"></th>
                    <th className="px-5 py-3 text-left text-sm font-semibold">
                      Order ID / Customer
                    </th>
                    <th className="px-5 py-3 text-left text-sm font-semibold">
                      Date
                    </th>
                    <th className="px-5 py-3 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-5 py-3 text-left text-sm font-semibold">
                      Total
                    </th>
                    <th className="px-5 py-3 text-left text-sm font-semibold">
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/order/${order?.id}`}
                          className="group block"
                        >
                          <p className="font-medium text-indigo-600 group-hover:underline">
                            #{order?.id}
                          </p>
                          <p className="text-gray-600 mt-0.5">
                            {order?.billing?.first_name}{" "}
                            {order?.billing?.last_name}
                          </p>
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {order?.order_date || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                            order?.order_status
                              ?.toLowerCase()
                              .includes("cancel")
                              ? "bg-red-100 text-red-700"
                              : order?.order_status
                                    ?.toLowerCase()
                                    .includes("complete") ||
                                  order?.order_status
                                    ?.toLowerCase()
                                    .includes("delivered")
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order?.order_status || "Unknown"}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-900">
                        ৳ {Number(order?.total || 0).toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {order?.payment_method || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;
