"use client";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";
import ReactToPrint from "react-to-print";
import PackingSlip from "../../../../Components/PackingSlip/PackingSlip";
import Invoice from "../../../../Components/Invoice/Invoice";

const OrdersClient = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [orderRefs, setOrderRefs] = useState([]);
  const [invoiceRefs, setInvoiceRefs] = useState([]);
  const [filterBy, setFilterBy] = useState("Name");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orderCount`)
      .then((res) => res.json())
      .then((data) => {
        setPageCount(Math.ceil(data.count / 50));
      });
  }, []);

  useEffect(() => {
    setOrders([]);
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    setOrderRefs(orders.map(() => React.createRef()));
    setInvoiceRefs(orders.map(() => React.createRef()));
  }, [orders]);

  const handleDelete = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteorder/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Order deleted successfully");
        setOrders(orders.filter((order) => order._id !== id));
      });
  };

  const handleSearch = () => {
    setOrders([]);
    setLoading(true);
    let url;
    if (filterBy === "Name") url = `${process.env.NEXT_PUBLIC_API_URL}/searchOrder/${searchedText}`;
    else if (filterBy === "Phone") url = `${process.env.NEXT_PUBLIC_API_URL}/searchOrderByPhone/${searchedText}`;
    else url = `${process.env.NEXT_PUBLIC_API_URL}/searchOrderById/${searchedText}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  };

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <div className=" min-h-screen  py-3 bg-[#f9fafe]">

      <div className="flex flex-col lg:flex-row justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 px-2">Orders</h1>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <label className="text-gray-700 text-sm font-semibold">Filter by:</label>
            <select
              className="px-3 py-1 text-sm font-light rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option>Name</option>
              <option>Phone</option>
              <option>Order ID</option>
            </select>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-1 border text-sm border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchedText}
              onChange={(e) => setSearchedText(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="px-4 py-1 text-sm bg-[#49ADFF] text-white rounded hover:bg-[#43a2f0] transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && orders.length < 1 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <ThreeDots height="80" width="80" color="#49ADFF" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-600 uppercase text-sm tracking-wider">
              <tr>
                <th className="px-2 py-2 text-left">#</th>
                <th className="px-2 py-2 text-left">Order</th>
                <th className="px-0 py-2 text-left">Platform</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Payment</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {orders.map((order, i) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-2 py-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-2 py-2 text-sm">
                    <Link href={`/admin/order/${order._id}`} className="flex flex-col hover:text-blue-600 hover:underline">
                      <span className="font-medium">{order?.id}</span>
                      <span className="text-gray-600">{order?.billing?.first_name} {order?.billing?.last_name}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-sm">{order.platform}</td>
                  <td className="px-4 py-2 text-sm">
                    {months[new Date(order?.order_date).getMonth()]} {new Date(order?.order_date).getDate()}, {new Date(order?.order_date).getFullYear()}
                  </td>
                  <td className="px-4 py-2 text-sm">{order?.order_status}</td>
                  <td className="px-4 py-2 text-sm">TK. {order?.total}</td>
                  <td className="px-4 py-2 text-sm">{order?.payment_method}</td>
                  <td className="px-4 py-2 flex items-center flex-wrap gap-2 text-sm">
                    <Link href={`/admin/order/${order._id}`} className="text-green-500 hover:text-green-700 border-r border-gray-800 pr-4">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                    <button
                      onClick={() => setDeletedId(order._id)}
                      className="text-red-500 hover:text-red-700 pl-2"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                    <PackingSlip orderRefs={orderRefs} i={i} orderContent={order} />
                    <ReactToPrint
                      trigger={() => (
                        <button className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-blue-50">Packing Slip</button>
                      )}
                      content={() => orderRefs[i].current}
                    />

                    <Invoice invoiceRefs={invoiceRefs} i={i} orderContent={order} />
                    <ReactToPrint
                      trigger={() => (
                        <button className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-blue-50">Invoice</button>
                      )}
                      content={() => invoiceRefs[i].current}
                    />

                    <dialog id="confirmation" className="bg-[#49ADFF] rounded-lg p-6 text-white">
                      <form method="dialog" className="relative">
                        <button className="absolute top-2 right-2 text-white font-bold text-lg">✕</button>
                        <h3 className="font-bold text-lg mb-2">Confirm Delete!</h3>
                        <p className="mb-4">Are you sure you want to delete this order?</p>
                        <button
                          onClick={() => handleDelete(deletedId)}
                          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                        >
                          Confirm
                        </button>
                      </form>
                    </dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex gap-2 justify-center mt-6 mb-20">
          {[...Array(pageCount).keys()].map((index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className={`px-3 py-1 rounded ${page === index ? "bg-[#49ADFF] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

    </div>
  );
};

export default OrdersClient;