"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import Link from "next/link";

const ThreeDots = dynamic(
  () => import("react-loader-spinner").then((mod) => mod.ThreeDots),
  { ssr: false }
);

const ProductsClient = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  const API_URL = useMemo(() => process.env.NEXT_PUBLIC_API_URL, []);

  useEffect(() => {
    fetch(`${API_URL}/productCount`)
      .then((res) => res.json())
      .then((data) => {
        const pages = Math.ceil(data.count / 50);
        setPageCount(pages);
      });
  }, [API_URL]);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/Allproducts?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, API_URL]);

  const handleDelete = useCallback(
    (id) => {
      fetch(`${API_URL}/deleteProduct/${id}`, { method: "delete" })
        .then((res) => res.json())
        .then(() => {
          toast.success("Product deleted successfully");
          setProducts((prev) =>
            prev.filter((product) => product._id !== id)
          );
        })
        .catch(() => toast.error("Failed to delete product"));
    },
    [API_URL]
  );

  const handleSearch = useCallback(() => {
    if (!searchedText.trim()) return;
    setLoading(true);
    fetch(`${API_URL}/search/${searchedText}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setPageCount(0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchedText, API_URL]);

  return (
    <div className="space-y-8 p-2">

      {/* ===== Header Section ===== */}
      <div className="flex flex-col lg:flex-row justify-between gap-6 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 ">Products</h1>
          <p className="text-gray-500 text-sm">
            Manage and monitor your store products
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <Link
            href="/admin/addProduct"
            className="px-5 py-2 text-sm rounded-xl bg-[#49ADFF] text-white shadow hover:shadow-lg transition"
          >
            + Add New
          </Link>
          <Link
            href="/admin/filter"
            className="px-5 py-2 text-sm rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Bulk Edit
          </Link>

          <div className="flex items-center bg-white border rounded-xl px-3 shadow-sm">
            <input
              type="text"
              placeholder="Search product..."
              className="px-2 py-2 outline-none text-sm"
              value={searchedText}
              onChange={(e) => setSearchedText(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="px-3 py-2 text-sm text-[#49ADFF] font-medium"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ===== Table Card ===== */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <ThreeDots height="80" width="80" color="#49ADFF" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">SKU</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {products?.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">

                    <td className="px-6 py-4 flex items-center gap-4">
                      {product?.images && (
                        <img
                          src={product.images[0]?.src}
                          className="w-10 h-10 rounded-xl object-cover"
                          alt=""
                        />
                      )}
                      <span className="text-xs font-medium text-gray-800">
                        {product?.name}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs">{product?.sku || "--"}</td>

                    <td className="px-6 py-4">
                      {product?.stock_quantity > 0 ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 ">
                          In Stock ({product?.stock_quantity})
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                          Out of Stock
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-xs">
                      ৳ {product?.price}
                    </td>

                    <td className="px-6 py-4 text-xs capitalize">
                      {product?.status}
                    </td>

                    <td className="px-6 py-4 text-right space-x-4">
                      <Link
                        href={`/admin/editProduct/${product._id}`}
                        className="text-blue-500 text-xs hover:text-blue-700 border-r pr-5 border-gray-800"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Link>

                      <button
                        onClick={() => {
                          setDeletedId(product._id);
                          document.getElementById("confirmation").showModal();
                        }}
                        className="text-red-500 text-xs  hover:text-red-700 pl-1"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ===== Pagination ===== */}
      {pageCount > 1 && (
        <div className="flex justify-center flex-wrap gap-2 mt-6">
          {[...Array(pageCount).keys()].map((index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className={`px-4 py-2 rounded-lg text-sm ${
                page === index
                  ? "bg-[#49ADFF] text-white"
                  : "bg-white border hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* ===== Delete Modal ===== */}
      <dialog id="confirmation" className="rounded-2xl p-8 backdrop:bg-black/40">
        <form method="dialog" className="space-y-4">
          <h3 className="text-lg font-bold">Confirm Delete</h3>
          <p className="text-gray-500 text-sm">
            Are you sure you want to delete this product?
          </p>
          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 border rounded-lg">Cancel</button>
            <button
              onClick={() => handleDelete(deletedId)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        </form>
      </dialog>

    </div>
  );
};

export default ProductsClient;