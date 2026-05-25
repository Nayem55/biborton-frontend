import React, { useState } from "react";
import toast from "react-hot-toast";

const DistributorEnlishment = () => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    contactNumber: "",
    country: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://biborton-server.vercel.app/distributors",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const result = await res.json();
      toast.success("Form Submitted Successfully");

      // ✅ Clear the form after success
      setFormData({
        name: "",
        businessName: "",
        email: "",
        contactNumber: "",
        country: "",
        additionalInfo: "",
      });
    } catch (error) {
      toast.error("Submission failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 py-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Distributor Enlistment Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="businessName"
          type="text"
          placeholder="Business Name"
          className="w-full p-2 border rounded"
          value={formData.businessName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="contactNumber"
          type="text"
          placeholder="Contact Number"
          className="w-full p-2 border rounded"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <input
          name="country"
          type="text"
          placeholder="Your Country"
          className="w-full p-2 border rounded"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <textarea
          name="additionalInfo"
          placeholder="Additional Information (optional)"
          className="w-full p-2 border rounded"
          value={formData.additionalInfo}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-accent hover:bg-secondary ease-in-out duration-200 text-white py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DistributorEnlishment;
