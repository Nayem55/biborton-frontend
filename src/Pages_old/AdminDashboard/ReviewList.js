"use client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [statusMap, setStatusMap] = useState({}); // store status per review

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviewCount`)
      .then((res) => res.json())
      .then((data) => {
        const count = data.count;
        const pages = Math.ceil(count / 50);
        setPageCount(pages);
      });
  }, []);

  useEffect(() => {
    setReviews([]);
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/allReviews?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        // initialize statusMap
        const map = {};
        data.forEach((r) => (map[r._id] = r.status));
        setStatusMap(map);
        setLoading(false);
      });
  }, [page]);

  const handleDelete = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/${id}`, { method: "delete" })
      .then((res) => res.json())
      .then(() => {
        toast.success("Review deleted successfully");
        setReviews(reviews.filter((r) => r._id !== id));
      });
  };

  const handleEditReview = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/${id}`, {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: statusMap[id] }),
    })
      .then((res) => res.json())
      .then(() => toast.success("Review status updated"));
  };

  return (
    <div className="px-2 bg-[#f9fafe] min-h-screen">
      <h1 className="text-2xl lg:text-3xl font-bold px-2 text-gray-800 mb-6">Reviews</h1>

      {loading && reviews.length < 1 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <ThreeDots height="80" width="80" color="#49ADFF" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Review</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {reviews.map((review, idx) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-2 flex flex-col">
                    <span className="font-medium">{review.reviewer}</span>
                    <span className="text-gray-500 text-xs">{review.reviewer_email}</span>
                  </td>
                  <td className="px-4 py-2">{review.rating}</td>
                  <td className="px-4 py-2 max-w-[300px] overflow-hidden">
                    <div dangerouslySetInnerHTML={{ __html: review.review }} />
                  </td>
                  <td className="px-4 py-2">
                    <select
                      className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                      value={statusMap[review._id]}
                      onChange={(e) =>
                        setStatusMap((prev) => ({ ...prev, [review._id]: e.target.value }))
                      }
                    >
                      <option>{review.status}</option>
                      <option>approved</option>
                      <option>unapproved</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">{review.product_name}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEditReview(review._id)}
                      className="px-3 py-1 bg-[#49ADFF] hover:scale-105 rounded  transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setDeletedId(review._id);
                        document.getElementById("confirmation").showModal();
                      }}
                      className="px-3 py-1  text-red-600 rounded hover:border transition"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="bg-gray-50 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Review</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Actions</th>
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
          <p className="mb-4">Are you sure you want to delete this review?</p>
          <button
            onClick={() => handleDelete(deletedId)}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
          >
            Confirm
          </button>
        </form>
      </dialog>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex gap-2 mt-6">
          {[...Array(pageCount).keys()].map((index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${
                page == index ? "bg-gray-50 text-gray-700" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-500 hover:text-gray-700 transition`}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;