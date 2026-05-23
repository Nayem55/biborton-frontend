"use client";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletedId, setDeletedId] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAllCoupons`)
      .then((res) => res.json())
      .then((data) => {
        setCoupons(data);
        setLoading(false);
      });
  }, []);

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  const handleDelete = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteCoupon/${id}`, { method: "delete" })
      .then((res) => res.json())
      .then(() => {
        toast.success("Coupon deleted successfully");
        setCoupons(coupons.filter((coupon) => coupon._id !== id));
      });
  };

  const handleSearch = () => {
    const searchedCoupon = coupons.filter((coupon) =>
      coupon.code.toLowerCase().includes(searchedText.toLowerCase())
    );
    setCoupons(searchedCoupon);
  };

  return (
    <div className="p-8 min-h-screen bg-[#f9fafe]">
      <div className="flex flex-col lg:flex-row justify-between mb-8 gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-4">Coupons</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <Link
            href="/admin/addCoupon"
            className="px-4 py-2 bg-gray-50 text-gray-700 rounded hover:bg-blue-700 transition"
          >
            Add Coupon
          </Link>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchedText}
            onChange={(e) => setSearchedText(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-gray-50 text-gray-700 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      {loading && coupons.length < 1 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <ThreeDots height="80" width="80" color="#49ADFF" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-left">Coupon type</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Usage</th>
                <th className="px-4 py-2 text-left">Expiry date</th>
                <th className="px-4 py-2 text-left">Orders</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {coupons.map((coupon, index) => (
                <tr key={coupon._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-2 font-medium">{coupon.code} - {coupon.status}</td>
                  <td className="px-4 py-2">{coupon.discount_type}</td>
                  <td className="px-4 py-2">{coupon.amount}</td>
                  <td className="px-4 py-2">{coupon.description}</td>
                  <td className="px-4 py-2">{coupon.usage_count}</td>
                  <td className="px-4 py-2">
                    {months[new Date(coupon.date_expires).getMonth()]}{" "}
                    {new Date(coupon.date_expires).getDate()},{" "}
                    {new Date(coupon.date_expires).getFullYear()}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      href={`/admin/couponOrders/${coupon._id}`}
                      className="px-3 py-1 bg-gray-50 text-gray-700 rounded hover:bg-blue-700 transition"
                    >
                      View
                    </Link>
                  </td>
                  <td className="px-4 py-2 flex flex-wrap gap-2">
                    <Link href={`/admin/editCoupon/${coupon._id}`} className="px-3 py-1 bg-green-600 text-gray-700 rounded hover:bg-green-700 transition">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                    <button
                      onClick={() => {
                        setDeletedId(coupon._id);
                        document.getElementById("confirmation").showModal();
                      }}
                      className="px-3 py-1 bg-red-600 text-gray-700 rounded hover:bg-red-700 transition"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="bg-gray-50 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-left">Coupon type</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Usage</th>
                <th className="px-4 py-2 text-left">Expiry date</th>
                <th className="px-4 py-2 text-left">Orders</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Delete Confirmation */}
      <dialog id="confirmation" className="bg-gray-50 rounded-lg p-6 text-gray-700">
        <form method="dialog" className="relative">
          <button className="absolute top-2 right-2 text-gray-700 font-bold text-lg">✕</button>
          <h3 className="font-bold text-lg mb-2">Confirm Delete!</h3>
          <p className="mb-4">Are you sure you want to delete this coupon?</p>
          <button
            onClick={() => handleDelete(deletedId)}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
          >
            Confirm
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default CouponList;