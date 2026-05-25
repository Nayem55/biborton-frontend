import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

const ResellerLogin = () => {
  const navigate = useNavigate();

  const [resellerPhone, setResellerPhone] = useState("");
  const [resellerPassword, setResellerPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResellerLogin = async () => {
    if (!resellerPhone || !resellerPassword) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://biborton-server.vercel.app/reseller-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contactNumber: resellerPhone,
            password: resellerPassword,
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("reseller", JSON.stringify(data.reseller));
      toast.success("Reseller logged in successfully");
      navigate("/reseller-dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Reseller Login
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Login to access your reseller dashboard
        </p>

        {/* FORM */}
        <div className="mt-8 space-y-4">
          <input
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            placeholder="Phone Number"
            value={resellerPhone}
            onChange={(e) => setResellerPhone(e.target.value)}
          />
          <input
            type="password"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            placeholder="Password"
            value={resellerPassword}
            onChange={(e) => setResellerPassword(e.target.value)}
          />
          <button
            onClick={handleResellerLogin}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? (
              <TailSpin height={20} color="#ffffff" />
            ) : (
              "Login as Reseller"
            )}
          </button>
        </div>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/reseller-signup")}
              className="text-black font-semibold hover:underline"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResellerLogin;
