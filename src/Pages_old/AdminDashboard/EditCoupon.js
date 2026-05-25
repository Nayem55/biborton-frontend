import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const EditCoupon = () => {
  const [amount, setAmount] = useState(null);
  const [status, setStatus] = useState("publish");
  const [expiryDate, setExpiryDate] = useState(null);
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("percent");
  const [code, setCode] = useState("");
  const [Coupon, setCoupon] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://biborton-server.vercel.app/getCoupon/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCoupon(data);
        setAmount(data.amount);
        setCode(data.code);
        setStatus(data.status);
        setExpiryDate(data.date_expires);
        setDescription(data.description);
        setDiscountType(data.discount_type);
      });
  }, [id]);

  const handleEditCoupon = () => {
    const data = {
      code: code,
      amount: amount,
      status: status,
      date_created: null,
      date_created_gmt: null,
      date_modified: null,
      date_modified_gmt: null,
      discount_type: discountType,
      description: description,
      date_expires: new Date(expiryDate).toISOString(),
      date_expires_gmt: null,
      usage_count: null,
      individual_use: false,
      product_ids: [],
      excluded_product_ids: [],
      usage_limit: null,
      usage_limit_per_user: null,
      limit_usage_to_x_items: null,
      free_shipping: false,
      product_categories: [],
      excluded_product_categories: [],
      exclude_sale_items: false,
      minimum_amount: "1.00",
      maximum_amount: "0.00",
      email_restrictions: [],
    };
    fetch(`https://biborton-server.vercel.app/editCoupon/${id}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    toast.success("Coupon edited successfully");
  };

  return (
    <div className="mx-12 flex mb-20 ">
      <div className="w-[70%]">
        <h1 className="mt-12 mr-12 text-2xl ">Edit Coupon</h1>
        <input
          type="text"
          placeholder="Coupon code"
          value={code}
          className="w-[100%] px-3 mt-10 border border-secondary py-1"
          onChange={(e) => setCode(e.target.value)}
        ></input>
        <p className="mt-10 text-xl mb-6">Coupon description</p>
        <textarea
          rows={5}
          className="w-[100%] px-3 border border-secondary py-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <p className="mt-10 text-xl mb-6">Discount type</p>
        <select
          type="text"
          className="w-[100%] px-3 border border-secondary py-2"
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value)}
        >
          <option>percent</option>
          <option>fixed_cart</option>
        </select>
        <p className="mt-10 text-xl mb-6">Coupon amount</p>
        <input
          type="text"
          className="w-[100%] px-3 border border-secondary py-1"
          value={amount}
          placeholder="Discount amount"
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <p className="mt-10 text-xl mb-6">Expiry date</p>
        <input
          type="date"
          className="w-[100%] px-3 border border-secondary py-1"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        ></input>
        <p className="mt-10 text-xl mb-6">Status</p>
        <select
          type="text"
          className="w-[100%] px-4  border border-secondary py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option></option>
          <option>draft</option>
          <option>publish</option>
        </select>
      </div>
      <div className="w-[30%] mt-12">
        <div className="flex gap-10 ml-10 mt-[70px]">
          <button
            onClick={handleEditCoupon}
            className="border border-accent text-accent flex justify-center items-center h-[35px] w-[160px] font-bold ease-in-out duration-300 hover:bg-accent hover:text-primary hover:border-none"
          >
            Edit Coupon
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCoupon;
