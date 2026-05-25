"use client";
import React, { useEffect, useState } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";

const Analytics = () => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [platform, setPlatform] = useState("all");
  const [orders, setOrders] = useState([]);
  const [netSales, setNetSales] = useState(0);
  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (update && from && to) {
        setLoading(true);
        try {
          const startDate = new Date(
            new Date(from).setHours(0, 1, 0, 0),
          ).toISOString();
          const endDate = new Date(
            new Date(to).setHours(23, 59, 0, 0),
          ).toISOString();
          const platformParam =
            platform !== "all" ? `&platform=${platform}` : "";

          const [ordersResponse, totalResponse] = await Promise.all([
            fetch(
              `https://biborton-server.vercel.app/sortOrders?startDate=${startDate}&endDate=${endDate}${platformParam}`,
            ),
            fetch(
              `https://biborton-server.vercel.app/orders/total${
                platform !== "all" ? `?platform=${platform}` : ""
              }`,
            ),
          ]);

          const [ordersData, totalData] = await Promise.all([
            ordersResponse.json(),
            totalResponse.json(),
          ]);

          setOrders(ordersData);
          setNetSales(totalData.totalValue);
          setUpdate(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [update, from, to, platform]);

  // Calculate totals
  const totalSales = orders.reduce(
    (sum, order) => sum + parseInt(order.total),
    0,
  );
  const totalProduct = orders.reduce(
    (sum, order) =>
      sum +
      order.items.reduce(
        (itemSum, item) => itemSum + parseInt(item.quantity),
        0,
      ),
    0,
  );

  // Aggregate products
  const productMap = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!productMap[item.product_id]) {
        productMap[item.product_id] = {
          name: item.product_name,
          qty: 0,
          total: 0,
          id: item.product_id,
        };
      }
      productMap[item.product_id].qty += parseInt(item.quantity);
      productMap[item.product_id].total += parseInt(item.total);
    });
  });
  const sortedOrder = Object.values(productMap);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Sales Analytics
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <div className="flex gap-2">
                <input
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="date"
                  value={from || ""}
                  onChange={(e) => setFrom(e.target.value)}
                />
                <span className="flex items-center">to</span>
                <input
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="date"
                  value={to || ""}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform
              </label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option value="all">All Platforms</option>
                <option value="web">Web</option>
                <option value="social media">Social Media</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setUpdate(true)}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !from || !to}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Apply Filters"
                )}
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Total Sales
                </h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  TK. {totalSales.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Lifetime Sales
                </h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  TK. {netSales.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Total Orders
                </h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {orders.length.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Products Sold
                </h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {totalProduct.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Product Sales Breakdown
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Sales
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedOrder.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.qty.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          TK. {order.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
