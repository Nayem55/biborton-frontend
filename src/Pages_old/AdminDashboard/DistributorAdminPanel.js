import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DistributorAdminPanel = () => {
  const [distributors, setDistributors] = useState([]);

  const fetchDistributors = async () => {
    try {
      const res = await fetch("http://localhost:3200/distributors");
      const data = await res.json();
      setDistributors(data);
    } catch (error) {
      toast.error("Failed to fetch distributor data");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      const res = await fetch(`http://localhost:3200/distributors/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      toast.success(result.message);
      fetchDistributors(); // refresh the list
    } catch (error) {
      toast.error("Deletion failed");
    }
  };

  useEffect(() => {
    fetchDistributors();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Distributor Queries
      </h2>
      {distributors.length === 0 ? (
        <p className="text-center">No distributor queries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Business</th>
                <th className="p-3">Email</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Country</th>
                <th className="p-3">Info</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {distributors.map((dist) => (
                <tr key={dist._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{dist.name}</td>
                  <td className="p-3">{dist.businessName}</td>
                  <td className="p-3">{dist.email}</td>
                  <td className="p-3">{dist.contactNumber}</td>
                  <td className="p-3">{dist.country}</td>
                  <td className="p-3">{dist.additionalInfo}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(dist._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DistributorAdminPanel;
