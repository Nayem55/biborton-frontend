import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

const ResellerSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    password: "",
    contactNumber: "",
    country: "",
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3200/resellers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Signup failed");
        setLoading(false);
        return;
      }

      // Success message with Reseller ID
      toast.success(
        `Signup Successful! Your Reseller ID is: ${result.resellerID}`,
      );

      // Clear the form
      setFormData({
        name: "",
        businessName: "",
        email: "",
        password: "",
        contactNumber: "",
        country: "",
        additionalInfo: "",
      });

      // Redirect to login page after successful signup
      navigate("/reseller-login");
    } catch (error) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 py-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Reseller Signup
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Join as a reseller and start selling today
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          name="businessName"
          type="text"
          placeholder="Business Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          value={formData.businessName}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          name="password"
          type="password"
          placeholder="Create Password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          name="contactNumber"
          type="text"
          placeholder="Contact Number (e.g. 01XXXXXXXXX)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          value={formData.contactNumber}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          name="country"
          type="text"
          placeholder="Your Country"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          value={formData.country}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <textarea
          name="additionalInfo"
          placeholder="Additional Information (optional)"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none resize-none"
          value={formData.additionalInfo}
          onChange={handleChange}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black hover:opacity-90 text-white py-3 rounded-lg font-semibold flex items-center justify-center disabled:opacity-70 transition"
        >
          {loading ? (
            <TailSpin height={24} color="#ffffff" />
          ) : (
            "Sign Up as Reseller"
          )}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/reseller-login")}
          className="text-black font-semibold hover:underline"
        >
          Login here
        </button>
      </p>
    </div>
  );
};

export default ResellerSignup;
