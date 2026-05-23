"use client";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";

const AllBlog = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(localStorage.getItem("page") || 0);
  const [blogs, setBlogs] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletedId, setDeletedId] = useState();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogCount`)
      .then((res) => res.json())
      .then((data) => {
        const count = data.count;
        const pages = Math.ceil(count / 50);
        setPageCount(pages);
      });
  }, []);

  useEffect(() => {
    setBlogs([]);
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAllBlogs?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      });
  }, [page]);

  const handleDelete = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteBlog/${id}`, { method: "delete" })
      .then((res) => res.json())
      .then(() => {
        toast.success("Blog deleted successfully");
        setBlogs(blogs.filter((blog) => blog._id !== id));
      });
  };

  const handleSearch = () => {
    setBlogs([]);
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/searchBlog/${searchedText}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
        setPageCount(0);
      });
  };

  return (
    <div className="p-8 min-h-screen bg-[#f9fafe]">
      <div className="flex flex-col lg:flex-row justify-between mb-8 gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-4">Blogs</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <Link
            href="/admin/addBlog"
            className="px-4 py-2 bg-gray-50 text-gray-700 rounded hover:bg-blue-700 transition"
          >
            Add New
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

      {loading && blogs.length < 1 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <ThreeDots height="80" width="80" color="#49ADFF" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Categories</th>
                <th className="px-4 py-2">Tags</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {blogs.map((blog, index) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-2 font-medium">{blog?.title?.rendered || "---"}</td>
                  <td className="px-4 py-2">{blog?.yoast_head_json?.author || "---"}</td>
                  <td className="px-4 py-2">{blog?.status || "---"}</td>
                  <td className="px-4 py-2">Skin Care</td>
                  <td className="px-4 py-2 flex flex-wrap gap-1">
                    {blog?.tags?.map((tag) => (
                      <span key={tag?.name} className="bg-gray-200 px-2 py-1 rounded text-xs">{tag?.name}</span>
                    ))}
                  </td>
                  <td className="px-4 py-2 flex flex-wrap gap-2">
                    <Link href={`/admin/editBlog/${blog._id}`} className="px-3 py-1 bg-green-600 text-gray-700 rounded hover:bg-green-700 transition">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                    <button
                      onClick={() => {
                        setDeletedId(blog._id);
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
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Categories</th>
                <th className="px-4 py-2">Tags</th>
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
          <p className="mb-4">Are you sure you want to delete this blog?</p>
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
              className={`px-3 py-1 rounded ${page == index ? "bg-gray-50 text-gray-700" : "bg-gray-200 text-gray-700"} hover:bg-blue-500 hover:text-gray-700 transition`}
              onClick={() => {
                setPage(index);
                localStorage.setItem("page", index);
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlog;