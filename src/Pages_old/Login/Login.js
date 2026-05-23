"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import googleIcon from "../../Images/google.jpg"; // যদি public folder-এ থাকে তাহলে "/google.jpg" ব্যবহার করতে পারো
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [otpUser, setOtpUser] = useState({});
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [ph, setPh] = useState("");
  const [name, setName] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({});
  const [signInWithGoogle, user1, loading1, error1] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user1) {
      toast.success("Logged in successfully");
      const email = user1?.user?.email;

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/postGoogleUser/${email}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: user1?.user?.displayName,
          phone: "",
          email: user1?.user?.email,
          role: "customer",
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      router.push("/");
    }
  }, [user1, router]);

  useEffect(() => {
    if (otpUser?.phone) {
      router.push("/");
    }
  }, [otpUser, router]);

  useEffect(() => {
    if (ph.length === 11) {
      const phoneNumber = "+88" + ph;
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUser/${phoneNumber}`)
        .then((res) => res.json())
        .then((data) => setCustomer(data));
    }
  }, [ph]);

  const generateOtp = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    return otpCode;
  };

  const onSignInSubmit = async () => {
    setLoading(true);
    const phoneNumber = "+88" + ph;
    const otpCode = generateOtp();

    const formData = new URLSearchParams({
      api_key: "LZbvUzDw1N2oqCJfXFsNOZ2VM29w0JJ0UdDdKU5F",
      msg: `Your OTP for JDOT BD is ${otpCode}`,
      to: phoneNumber,
    });

    try {
      const response = await fetch("https://api.sms.net.bd/sendsms", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to send OTP");

      setLoading(false);
      setShowOTP(true);
      toast.success("OTP sent successfully");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
      setLoading(false);
    }
  };

  const onOtpVerify = () => {
    setLoading(true);
    const phoneNumber = "+88" + ph;
    const loggedUser = {
      name,
      phone: phoneNumber,
      email: "",
      role: "customer",
    };

    if (otp === generatedOtp) {
      toast.success("Logged In Successfully");
      setOtpUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setLoading(false);

      if (!customer?.phone) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/postUser`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      }
      router.push("/");
    } else {
      toast.error("Invalid OTP");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen   py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm  mb-8">
          {/* <span>Home</span> */}
          <Link href={"/"}>Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="font-medium ">Account</span>
        </nav>

        {/* Card */}
        <div className="   border rounded-xl border-gray-200 overflow-hidden">
          <div className="px-5 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight mb-1">
              Customer Login
            </h1>
            <p className="text-gray-800 mb-4">
              Welcome back! Please enter your details.
            </p>

            {showOTP ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1.5">
                    Enter OTP
                  </label>
                  <input
                    type="number"
                    placeholder="6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 order border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    required
                  />
                </div>

                <button
                  onClick={onOtpVerify}
                  disabled={loading}
                  className="w-full py-3.5 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Verify & Login"
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium  mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium   mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={ph}
                    onChange={(e) => setPh(e.target.value)}
                    maxLength={11}
                    className="w-full px-4 py-3 bg-white/50  border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    required
                  />
                </div>

                <button
                  onClick={onSignInSubmit}
                  disabled={loading || ph.length !== 11}
                  className="w-full  py-3 text-gray-800    hover:scale-105 cursor-pointer font-medium  transition-all duration-200 flex items-center justify-center gap-2  disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Send OTP"
                  )}
                </button>

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white  ">
                      OR
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => signInWithGoogle()}
                  disabled={loading1}
                  className="w-full py-3.5 btn bg-white text-gray-800   border border-gray-300  rounded-lg font-medium hover:bg-gray-50  transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow"
                >
                  <Image
                    src={googleIcon}
                    alt="Google"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-gray-800 dark:text-gray-400 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;