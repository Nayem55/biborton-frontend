"use client";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import auth from "../../firebase.init";
import { toast } from "react-hot-toast";
import "firebase/auth";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { TailSpin } from "react-loader-spinner";

const Signup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [name, setName] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [showOTP, setShowOTP] = useState(false);
  const recaptchaVerifier = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const from = searchParams.get("from") || "/";
  const [user] = useAuthState(auth);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    if (user?.phoneNumber) {
      router.push(from);
    }
  }, [user?.phoneNumber]);

  useEffect(() => {
    if (ph.length === 11) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUser/${ph}`)
        .then((res) => res.json())
        .then((data) => setCustomer(data));
    }
  }, [ph]);

  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignInSubmit();
          },
        },
        auth
      );
    }
  };

  const onSignInSubmit = () => {
    setLoading(true);
    onCaptchaVerify();
    const phoneNumber = "+88" + ph;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent to your number");
      })
      .catch((error) => {
        console.log(error, "otp not sent");
        setLoading(false);
      });
  };

  const onOtpVerify = () => {
    const phoneNumber = "+88" + ph;
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    if (!customer?.phone) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/postUser`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          phone: phoneNumber,
          role: "customer",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      console.log("Customer exists");
    }
  };

  return (
    <div className={`2xl:w-[65%] lg:w-[75%] w-[90%] mx-auto mb-20 `}>
      <div id="recaptcha-container"></div>
      <div className="my-10">
        <p className="text-[12px] font-semibold">
          Home
          <FontAwesomeIcon
            className="mx-2"
            icon={faCaretRight}
          ></FontAwesomeIcon>
          Account
        </p>
        <p className="text-xl my-4 font-bold">CUSTOMER LOGIN</p>
      </div>
      {/* <form> */}
      {showOTP ? (
        <div className="mb-4 flex flex-col">
          <p className="text-[14px] font-semibold mb-2">Enter OTP</p>
          <input
            type="number"
            placeholder="Enter OTP"
            className="border px-3 border-secondary border-opacity-50 w-[80%] lg:w-[30vw] h-[40px]"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          {loading ? (
            <button className="px-10 py-2 bg-accent text-primary w-[80%] lg:w-[30vw] mt-6 flex justify-center items-center">
              <TailSpin
                height="25"
                width="25"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </button>
          ) : (
            <button
              onClick={onOtpVerify}
              className="px-10 py-2 bg-accent text-primary w-[80%] lg:w-[30vw] mt-6 flex justify-center items-center hover:bg-secondary ease-in-out duration-200"
            >
              Login
            </button>
          )}
        </div>
      ) : (
        <div className="mb-4 flex flex-col">
          <p className="text-[14px] font-semibold mb-2">Full Name</p>
          <input
            type="text"
            placeholder="Enter your name"
            required
            className="border px-3 border-secondary border-opacity-50 mb-4 w-[80%] lg:w-[30vw] h-[40px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="text-[14px] font-semibold mb-2">Phone Number</p>
          <input
            type="number"
            required
            placeholder="Enter your phone number"
            className="border px-3 border-secondary border-opacity-50 w-[80%] lg:w-[30vw] h-[40px]"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
          />
          {loading ? (
            <button className="px-10 py-2 bg-accent text-primary w-[80%] lg:w-[30vw] mt-6 flex justify-center items-center">
              <TailSpin
                height="25"
                width="25"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </button>
          ) : (
            <button
              onClick={onSignInSubmit}
              className="px-10 py-2 bg-accent text-primary w-[80%] lg:w-[30vw] mt-6 flex justify-center items-center hover:bg-secondary ease-in-out duration-200"
            >
              Send OTP
            </button>
          )}
        </div>
      )}

      {/* <p className="text-error mb-3 font-bold">{error?.message}</p> */}
      {/* <input
          type="submit"
          value="LOGIN"
          className="w-[200px] lg:w-[150px] flex justify-center items-center cursor-pointer bg-secondary text-primary h-[30px] text-xs font-bold"
        />
        <p className="text-[14px] font-semibold my-4">
          Dont have an account ?{" "}
          <Link to="/signup" className="text-accent font-bold">
            Signup
          </Link>
        </p> */}
      {/* </form> */}
    </div>
  );
};

export default Signup;
