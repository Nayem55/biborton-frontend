"use client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [searchedText, setSearchedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [editUser, setEditUser] = useState();

  useEffect(() => {
    setUsers([]);
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAllUser?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, [page]);

  const handleDelete = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteUser/${id}`, { method: "delete" })
      .then((res) => res.json())
      .then(() => {
        toast.success("User deleted successfully");
        setUsers(users.filter((user) => user._id !== id));
      });
  };

  const handleMakeAdmin = (U) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/editUser/${U._id}`, {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role: "admin" }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("User updated successfully");
        setUsers(users.map(u => u._id === U._id ? { ...u, role: "admin" } : u));
      });
  };

  const handleRemoveAdmin = (U) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/editUser/${U._id}`, {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role: "customer" }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("User updated successfully");
        setUsers(users.map(u => u._id === U._id ? { ...u, role: "customer" } : u));
      });
  };

  const handleSearch = () => {
    setUsers([]);
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/searchUser/${searchedText}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  };

  return (
    <div className="p-1 min-h-screen bg-[#f9fafe]">
      <div className="flex flex-col lg:flex-row justify-between mb-8 gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Users</h1>
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchedText}
            onChange={(e) => setSearchedText(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      {loading && users.length < 1 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <ThreeDots height="80" width="80" color="#49ADFF" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Orders</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-2  text-sm">{user.name || "---"}</td>
                  <td className="px-4 py-2  text-sm">{user.phone || "---"}</td>
                  <td className="px-4 py-2  text-sm">{user.email || "---"}</td>
                  <td className="px-4 py-2">
                    {user.phone || user.email ? (
                      <Link
                        href={`/admin/user/${user.phone || user.email}`}
                        className="px-3 py-1 bg-gray-50 border rounded hover:bg-gray-200 transition"
                      >
                        View
                      </Link>
                    ) : (
                      <span className="text-gray-400">No Info</span>
                    )}
                  </td>
                  <td className="px-4 py-2 font-semibold">{user.role}</td>
                  <td className="px-4  py-2 flex justify-between flex-wrap gap-2 max-w-[200px]">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditUser(user);
                          document.getElementById("confirmaAdmin").showModal();
                        }}
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Make Admin
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setDeletedId(user._id);
                        document.getElementById("confirmation").showModal();
                      }}
                      className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition"
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

      {/* Make Admin Confirmation */}
      <dialog id="confirmaAdmin" className="bg-blue-600 rounded-lg p-6 text-white">
        <form method="dialog" className="relative">
          <button className="absolute top-2 right-2 text-white font-bold text-lg">✕</button>
          <h3 className="font-bold text-lg mb-2">Confirm Update!</h3>
          <p className="mb-4">Are you sure you want to make this user an admin?</p>
          <button
            onClick={() => handleMakeAdmin(editUser)}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
          >
            Confirm
          </button>
        </form>
      </dialog>

      {/* Delete Confirmation */}
      <dialog id="confirmation" className="bg-blue-600 rounded-lg p-6 text-white">
        <form method="dialog" className="relative">
          <button className="absolute top-2 right-2 text-white font-bold text-lg">✕</button>
          <h3 className="font-bold text-lg mb-2">Confirm Delete!</h3>
          <p className="mb-4">Are you sure you want to delete this user?</p>
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

export default AllUser;