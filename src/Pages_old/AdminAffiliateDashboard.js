import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AdminAffiliateDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [selectedReseller, setSelectedReseller] = useState(null);
  const [resellerOrders, setResellerOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersPagination, setOrdersPagination] = useState({
    totalPages: 1,
    totalOrders: 0,
  });
  const [updatingOrderId, setUpdatingOrderId] = useState(null); // for loading state on button

  const firstDayOfMonth = dayjs().startOf("month").format("YYYY-MM-DD");
  const lastDayOfMonth = dayjs().endOf("month").format("YYYY-MM-DD");

  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(lastDayOfMonth);

  const fetchSummary = () => {
    setLoading(true);
    fetch(
      `https://biborton-server.vercel.app/admin/affiliate-summary?start=${startDate}&end=${endDate}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setData([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSummary();
  }, [startDate, endDate]);

  // Fetch orders for selected reseller
  const fetchResellerOrders = async (resellerID, page = 1) => {
    setOrdersLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 20,
        start: startDate,
        end: endDate,
      });

      const res = await fetch(
        `https://biborton-server.vercel.app/orders/affiliate/${resellerID}?${params}`,
      );
      const result = await res.json();

      setResellerOrders(result.orders || []);
      setOrdersPagination(
        result.pagination || { totalPages: 1, totalOrders: 0 },
      );
      setOrdersPage(page);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setOrdersLoading(false);
    }
  };

  const openOrdersModal = (reseller) => {
    setSelectedReseller(reseller);
    setShowOrdersModal(true);
    fetchResellerOrders(reseller.resellerID, 1);
  };

  const closeModal = () => {
    setShowOrdersModal(false);
    setSelectedReseller(null);
    setResellerOrders([]);
    setUpdatingOrderId(null);
  };

  // Update payment status (general function)
  const updatePaymentStatus = async (orderId, isPaid) => {
    setUpdatingOrderId(orderId);
    try {
      const response = await fetch(
        `https://biborton-server.vercel.app/editOrder/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reseller_payment: isPaid }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update payment status");
      }

      const result = await response.json();

      if (result.modifiedCount > 0 || result.upsertedCount > 0) {
        // Update local state optimistically
        setResellerOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, reseller_payment: isPaid }
              : order,
          ),
        );
        toast.success(
          `Order #${orderId} marked as ${isPaid ? "Paid" : "Unpaid"}`,
        );
        // Refetch orders for real-time sync (optional but ensures accuracy)
        fetchResellerOrders(selectedReseller.resellerID, ordersPage);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update payment status");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Affiliate Earnings (Admin)</h1>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col lg:flex-row gap-4 items-end">
          <div>
            <label className="text-sm font-semibold block mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm font-semibold block mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-3 py-2 rounded"
            />
          </div>
          <button
            onClick={fetchSummary}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Apply Filter
          </button>
        </div>

        {/* Summary Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : data.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No affiliate data found for selected period.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left">
                    <th className="px-6 py-3 font-medium">Reseller ID</th>
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Number</th>
                    <th className="px-6 py-3 font-medium">Total Orders</th>
                    <th className="px-6 py-3 font-medium">Total Sales</th>
                    <th className="px-6 py-3 font-medium">Commission (10%)</th>
                    <th className="px-6 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr
                      key={row.resellerID}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-semibold">
                        {row.resellerID}
                      </td>
                      <td className="px-6 py-4 font-semibold">{row.name}</td>
                      <td className="px-6 py-4 font-semibold">{row.number}</td>
                      <td className="px-6 py-4">{row.totalOrders}</td>
                      <td className="px-6 py-4 font-semibold">
                        ৳{row.totalSales.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-green-600 font-bold">
                        ৳{row.commission.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openOrdersModal(row)}
                          className="bg-blue-600 text-white px-4 py-2 rounded text-xs hover:bg-blue-700 transition"
                        >
                          Order List
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Orders Modal */}
      {showOrdersModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold">
                Orders - {selectedReseller?.name} (
                {selectedReseller?.resellerID})
              </h3>
              <button
                onClick={closeModal}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {ordersLoading ? (
                <p className="text-center py-8">Loading orders...</p>
              ) : resellerOrders.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No orders found.
                </p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left text-gray-600">
                          <th className="py-3">Order ID</th>
                          <th className="py-3">Order Date</th>
                          <th className="py-3">Delivery Date</th>
                          <th className="py-3">Customer</th>
                          <th className="py-3">Subtotal</th>
                          <th className="py-3">Commission</th>
                          <th className="py-3">Order Status</th>
                          <th className="py-3">Payment Status</th>
                          <th className="py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resellerOrders.map((order) => {
                          const commission = Math.round(
                            Number(order.subtotal || 0) * 0.1,
                          );
                          const isPaid = order.reseller_payment === true;
                          const isUpdating = updatingOrderId === order._id;

                          return (
                            <tr
                              key={order._id}
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="py-4 font-medium">#{order.id}</td>
                              <td className="py-4">
                                {new Date(order.order_date).toLocaleDateString(
                                  "en-GB",
                                )}
                              </td>
                              <td className="py-4">
                                {new Date(
                                  order.last_updated,
                                ).toLocaleDateString("en-GB")}
                              </td>
                              <td className="py-4">
                                {new Date(order.order_date).toLocaleDateString(
                                  "en-GB",
                                )}
                              </td>
                              <td className="py-4">
                                {order.billing?.first_name}{" "}
                                {order.billing?.last_name}
                              </td>
                              <td className="py-4 font-medium">
                                ৳{order.subtotal}
                              </td>
                              <td className="py-4 text-green-600 font-bold">
                                ৳{commission}
                              </td>
                              <td className="py-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    order.order_status === "Processing"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : order.order_status === "Completed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {order.order_status}
                                </span>
                              </td>
                              <td className="py-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    isPaid
                                      ? "bg-green-100 text-green-800"
                                      : "bg-orange-100 text-orange-800"
                                  }`}
                                >
                                  {isPaid ? "Paid" : "Pending"}
                                </span>
                              </td>
                              <td className="py-4">
                                <button
                                  onClick={() =>
                                    updatePaymentStatus(order._id, !isPaid)
                                  }
                                  disabled={isUpdating}
                                  className={`${
                                    isPaid
                                      ? "bg-red-600 hover:bg-red-700"
                                      : "bg-green-600 hover:bg-green-700"
                                  } text-white px-4 py-2 rounded text-xs disabled:opacity-70 transition`}
                                >
                                  {isUpdating
                                    ? "Updating..."
                                    : isPaid
                                      ? "Mark as Unpaid"
                                      : "Mark as Paid"}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {ordersPagination.totalPages > 1 && (
                    <div className="flex justify-center gap-4 mt-8">
                      <button
                        onClick={() =>
                          fetchResellerOrders(
                            selectedReseller.resellerID,
                            ordersPage - 1,
                          )
                        }
                        disabled={ordersPage === 1 || ordersLoading}
                        className="px-5 py-2 border rounded disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="py-2 px-4">
                        Page {ordersPage} of {ordersPagination.totalPages}
                      </span>
                      <button
                        onClick={() =>
                          fetchResellerOrders(
                            selectedReseller.resellerID,
                            ordersPage + 1,
                          )
                        }
                        disabled={
                          ordersPage === ordersPagination.totalPages ||
                          ordersLoading
                        }
                        className="px-5 py-2 border rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAffiliateDashboard;
