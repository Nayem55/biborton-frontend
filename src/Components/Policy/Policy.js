"use client";
import React, { useState } from "react";
import "./Policy.css";
import img1 from "../../Images/output-onlinegiftools.png";
import gif1 from "../../Images/output-onlinegiftools.gif";
import gif2 from "../../Images/return-policy.gif";
import gif3 from "../../Images/online-payment.gif";
import img2 from "../../Images/delivery-status-q2799n3iypgh9l68ln7z8ejstamgh49cdexz6jvl0g.png";
import img3 from "../../Images/payment-security-q2799o1d5jhrl74vg5mlswb9eohtotd2pjlgntu6u8.png";
import img4 from "../../Images/24-hours-support.png";
import gif4 from "../../Images/phone.gif";
import { useRouter } from "next/navigation";

const Policy = () => {
  const router = useRouter();
  const [img1Hover, setImg1Hover] = useState(false);
  const [img2Hover, setImg2Hover] = useState(false);
  const [img3Hover, setImg3Hover] = useState(false);
  const [img4Hover, setImg4Hover] = useState(false);

  const handleCall = () => {
    if (typeof window !== "undefined") {
      window.location.href = `tel:+8801404403965`;
    }
  };

  return (
    <section
      className="grid justify-center gap-10 bg-[#F5F5F5] p-10 2xl:px-[20%] lg:px-[15%] mx-auto grid-cols-2 lg:grid-cols-4"
      aria-label="Our Service Policies"
    >
      {/* ✅ Fast Delivery */}
      <article
        onMouseEnter={() => setImg1Hover(true)}
        onMouseLeave={() => setImg1Hover(false)}
        className="flex flex-col items-center text-center"
      >
        <img
          src={img1Hover ? gif1 : img1}
          alt="Fast & Free Delivery"
          className="h-[80px]"
        />
        <h6 className="text-xl font-bold mt-6 sm:mt-10">Fast & Free Delivery</h6>
        <p className="w-[150px] sm:w-[200px] text-black">
          Get Free Delivery for Tk. 1000+ within 2–3 Business Days
        </p>
      </article>

      {/* ✅ Easy Return Policy */}
      <article
        onMouseEnter={() => setImg3Hover(true)}
        onMouseLeave={() => setImg3Hover(false)}
        onClick={() => router.push("/refund")}
        onKeyDown={(e) => e.key === "Enter" && router.push("/refund")}
        className="flex flex-col items-center text-center cursor-pointer"
        tabIndex={0} // ✅ Keyboard accessible
        aria-label="Easy return policy, click to read more"
      >
        <img
          src={img3Hover ? gif2 : img2}
          alt="Easy Return Policy"
          className="h-[80px]"
        />
        <h3 className="text-xl font-bold mt-6 sm:mt-10">Easy Return Policy</h3>
        <p className="w-[150px] sm:w-[200px] text-black">
          Easily return your order within 3 Business Days
        </p>
      </article>

      {/* ✅ Secure Payment */}
      <article
        onMouseEnter={() => setImg4Hover(true)}
        onMouseLeave={() => setImg4Hover(false)}
        className="flex flex-col items-center text-center"
      >
        <img
          src={img4Hover ? gif3 : img3}
          alt="Secure Online Payment"
          className="h-[80px]"
        />
        <h3 className="text-xl font-bold mt-6 sm:mt-10">
          Secure Online Payment
        </h3>
        <p className="w-[150px] sm:w-[200px] text-black">
          Pay securely with multiple online & mobile payment options
        </p>
      </article>

      {/* ✅ Customer Helpline */}
      <article
        onMouseEnter={() => setImg2Hover(true)}
        onMouseLeave={() => setImg2Hover(false)}
        onClick={handleCall}
        onKeyDown={(e) =>
          e.key === "Enter" && handleCall()
        }
        className="flex flex-col items-center text-center cursor-pointer"
        tabIndex={0}
        aria-label="Customer helpline, click to call"
      >
        <img
          src={img2Hover ? gif4 : img4}
          alt="Customer Helpline"
          className="h-[80px]"
        />
        <h3 className="text-xl font-bold mt-6 sm:mt-10">Customer Helpline</h3>
        <p className="text-center text-black font-bold">
          +880 1404 403 965
        </p>
      </article>

      {/* ✅ Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Ebay Bangladesh",
          "url": "https://ebay-bd.com",
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+8801404403965",
              "contactType": "Customer Support",
              "areaServed": "BD",
              "availableLanguage": "en"
            }
          ],
          "makesOffer": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Free Delivery",
                "description": "Free delivery for orders above Tk. 1000 within 2–3 days."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Easy Returns",
                "description": "Easily return products within 3 business days."
              }
            }
          ]
        })}
      </script>
    </section>
  );
};

export default Policy;
