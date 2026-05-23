"use client";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { ThemeContext } from "../../Components/Providers"; // Adjusted path
import { toast } from "react-hot-toast";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const Shipping = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const { cart, setCart } = useContext(ThemeContext);
  const { appliedCoupon, setAppliedCoupon } = useContext(ThemeContext);
  const { customerList } = useContext(ThemeContext);

  const [shippingCharge, setShippingCharge] = useState(0);
  const [freeProducts, setFreeProducts] = useState([]);
  const [district, setDistrict] = useState("select");
  const [orderTime, setOrderTime] = useState(new Date().getTime());

  const [email, setEmail] = useState(user?.email || "");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [post, setPost] = useState("Select Area");
  const [appartment, setAppartment] = useState("");
  const [phone, setPhone] = useState(""); // ✅ keep 11 digits only (01xxxxxxxxx)
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  const [orderId, setOrderId] = useState(0);

  const [affiliateRef, setAffiliateRef] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("freeProducts");
      if (stored && stored !== "undefined") {
        try {
          setFreeProducts(JSON.parse(stored));
        } catch (err) {
          setFreeProducts([]);
        }
      } else {
        setFreeProducts([]);
      } 

      const ref = localStorage.getItem("affiliate_ref");
      if (ref) setAffiliateRef(ref);
    }
  }, []);

  const city = [
    "Select Area",
    "Paltan",
    "Motijheel",
    "Jatrabari",
    "Kotwali",
    "Sutrapur",
    "Bangsal",
    "Wari",
    "Ramna",
    "Gendaria",
    "Chowkbazar",
    "Lalbagh",
    "Hazaribagh",
    "Dhanmondi",
    "Shahbagh",
    "New Market",
    "Khilgaon",
    "Kamrangirchar",
    "Mirpur",
    "Mohammadpur",
    "Sher-e-Bangla Nagar",
    "Pallabi",
    "Adabor",
    "Kafrul",
    "Dhaka Cantonment",
    "Tejgaon",
    "Gulshan",
    "Rampura",
    "Banani",
    "Bimanbandar",
    "Khilkhet",
    "Vatara",
    "Badda",
    "Uttara",
  ];

  useEffect(() => {
    if (district === "Dhaka") {
      setShippingCharge(60);
    } else if (district === "select") {
      setShippingCharge(0);
    } else {
      setShippingCharge(120);
    }
  }, [district]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/last-order-id`)
      .then((res) => res.json())
      .then((data) => {
        // ✅ safe
        const last = Array.isArray(data) ? data?.[0]?.id : data?.id;
        setOrderId((Number(last) || 0) + 1);
      })
      .catch(() => setOrderId(1));
  }, []);

  let shippingCart = [];
  if (freeProducts?.length > 0) {
    shippingCart = [...cart, ...freeProducts];
  } else {
    shippingCart = cart;
  }

  const customerInfo = customerList?.find(
    (customer) => customer?.email === user?.email,
  );

  let shippingProductPrice = 0;

  shippingCart?.forEach((product) => {
    const price =
      JSON.stringify(product?.on_sale) === "true"
        ? product?.sale_price
        : product?.regular_price;

    const discounted =
      appliedCoupon?.discount_type === "percent"
        ? price - price * ((appliedCoupon?.amount || 0) / 100)
        : price - (appliedCoupon?.amount || 0);

    shippingProductPrice =
      shippingProductPrice +
      Number(discounted || 0) * Number(product.quantity || 0);
  });

  const isDhaka = district.includes("Dhaka");

const finalShippingCharge =
  isDhaka && shippingProductPrice >= 999
    ? 0
    : shippingProductPrice >= 1499
    ? 0
    : shippingCharge;

  const totalAmount = shippingProductPrice + finalShippingCharge;

  const handleShipping = async (e) => {
    e.preventDefault();

    const emailValue = e.target.email.value;
    const firstNameValue = e.target.firstName.value;
    const lastNameValue = e.target.lastName.value;
    const addressValue = e.target.address.value;
    const appartmentValue = e.target.appartment.value;
    const phoneValue = e.target.phone.value; // ✅ raw 11 digit

    if (phoneValue.length !== 11 || phoneValue.substring(0, 2) !== "01") {
      toast.error("Please provide a valid mobile number");
      return;
    }

    if (post === "Select Area" && district === "Dhaka") {
      toast.error("Please select your Area");
      return;
    }

    if (district === "select") {
      toast.error("Please Select Your District");
      return;
    }

    const data = {
      id: orderId,
      platform: "web",
      affiliate_ref: affiliateRef || null,
      transactionId: "",
      payment_method: paymentMethod,
      order_time: orderTime,
      payment_method_title: paymentMethod,
      set_paid: paymentMethod === "Cash On Delivery" ? false : true,
      customer_id: customerInfo?.id || 0,
      order_date: new Date().toISOString(),
      billing: {
        first_name: firstNameValue,
        last_name: lastNameValue,
        address_1: appartmentValue,
        address_2: "",
        city: district,
        state: addressValue,
        postcode: post,
        country: "Bangladesh",
        email: emailValue,
        phone: "+88" + phoneValue, // ✅ store with country code
      },
      items: shippingCart.map((product) => {
        const stockData = {
          stock_quantity: JSON.stringify(
            parseInt(product.stock_quantity) - parseInt(product.quantity),
          ),
          stock_status:
            parseInt(product.stock_quantity) - parseInt(product.quantity) > 0
              ? "instock"
              : "outofstock",
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/editProduct/${product._id}`, {
          method: "put",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(stockData),
        }).catch(() => {});

        const basePrice =
          JSON.stringify(product?.on_sale) === "true"
            ? product?.sale_price
            : product?.regular_price;

        const discounted =
          appliedCoupon?.discount_type === "percent"
            ? basePrice - basePrice * ((appliedCoupon?.amount || 0) / 100)
            : basePrice - (appliedCoupon?.amount || 0);

        return {
          product_id: product._id,
          product_name: product.name,
          product_img: product.images?.[0]?.src,
          sku: product.sku,
          quantity: product.quantity,
          total: JSON.stringify(
            Number(discounted || 0) * Number(product.quantity || 0),
          ),
        };
      }),
      shipping_title: "Flat Rate",
      shipping_total: JSON.stringify(finalShippingCharge),
      coupon_title: "",
      order_status: "Processing",
      subtotal: JSON.stringify(Math.floor(shippingProductPrice)),
      total: JSON.stringify(totalAmount),
      coupon_used: appliedCoupon?.code || null,
    };

    if (paymentMethod === "Cash On Delivery") {
      try {
        const eventId = uuidv4(); // ✅ required by your backend for CAPI
        const eventSourceUrl =
          typeof window !== "undefined" ? window.location.href : "";

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            order: data, // ✅ IMPORTANT: backend expects "order"
            eventId, // ✅ IMPORTANT: backend expects "eventId"
            eventSourceUrl, // ✅ for CAPI
          }),
        });

        const result = await res.json().catch(() => null);

        if (!res.ok) {
          toast.error(result?.error || "Order failed");
          return;
        }

        // ✅ only success => clear + redirect
        if (typeof window !== "undefined") {
          localStorage.setItem("orderTime", JSON.stringify(orderTime));
          localStorage.removeItem("affiliate_ref");
          localStorage.removeItem("shopping-cart");
          localStorage.removeItem("combo");
        }

        setCart([]);
        e.target.reset();
        setShippingCharge(0);
        setAppliedCoupon("");

        toast.success("ORDER CONFIRMED");
        router.push("/shipping/confirmOrder");
      } catch (err) {
        toast.error("Order failed (network/server)");
      }
    }
  };

  return (
    <div className="2xl:w-[85%] lg:w-[90%] w-[90%] mx-auto">
      <div className="my-10 lg:my-10">
        <p className="text-[12px] font-semibold">
          Cart
          <FontAwesomeIcon
            className="mx-2"
            icon={faCaretRight}
          ></FontAwesomeIcon>
          Information
          <FontAwesomeIcon
            className="mx-2"
            icon={faCaretRight}
          ></FontAwesomeIcon>
          Shiping
        </p>
      </div>

      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between lg:gap-20">
        <form
          onSubmit={handleShipping}
          className="flex flex-col w-[90vw] lg:w-[50%] lg:my-auto"
        >
          <p className="font-bold my-3">Email</p>
          <input
            className="p-2 mb-4 border border-secondary border-opacity-40 text-black"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <p className="font-bold my-3">Shipping address</p>
          <div className="flex justify-between gap-4">
            <input
              className="h-[45px] px-2 text-sm mb-4 border border-secondary w-[50%] border-opacity-40 text-black"
              type="text"
              name="firstName"
              required
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="h-[45px] px-2 text-sm mb-4 border border-secondary w-[50%] border-opacity-40 text-black"
              type="text"
              name="lastName"
              required
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <select
            onChange={(e) => setDistrict(e.target.value)}
            name="district"
            className="px-2 py-3 border border-secondary border-opacity-40 mb-4 text-black"
            required
          >
            <option value="select">Select district</option>
            <option value="Bagerhat">Bagerhat</option>
            <option value="Bandarban">Bandarban</option>
            <option value="Barguna">Barguna</option>
            <option value="Barisal">Barisal</option>
            <option value="Bhola">Bhola</option>
            <option value="Bogra">Bogra</option>
            <option value="Brahmanbaria">Brahmanbaria</option>
            <option value="Chandpur">Chandpur</option>
            <option value="Chittagong">Chittagong</option>
            <option value="Chuadanga">Chuadanga</option>
            <option value="Comilla">Comilla</option>
            <option value="Cox'sBazar">Cox'sBazar</option>
            <optgroup label="Dhaka">
              <option value="Dhaka">Dhaka (Inside Dhaka City)</option>
              <option value="Keraniganj-Dhaka">Keraniganj-Dhaka</option>
              <option value="Nababganj-Dhaka">Nababganj-Dhaka</option>
              <option value="Dohar-Dhaka">Dohar-Dhaka</option>
              <option value="Savar-Dhaka">Savar-Dhaka</option>
              <option value="Dhamrai-Dhaka">Dhamrai-Dhaka</option>
            </optgroup>
            <option value="Dinajpur">Dinajpur</option>
            <option value="Faridpur">Faridpur</option>
            <option value="Feni">Feni</option>
            <option value="Gaibandha">Gaibandha</option>
            <option value="Gazipur">Gazipur</option>
            <option value="Gopalganj">Gopalganj</option>
            <option value="Habiganj">Habiganj</option>
            <option value="Jaipurhat">Jaipurhat</option>
            <option value="Jamalpur">Jamalpur</option>
            <option value="Jessore">Jessore</option>
            <option value="Jhalokati">Jhalokati</option>
            <option value="Jhenaidah">Jhenaidah</option>
            <option value="Khagrachari">Khagrachari</option>
            <option value="Khulna">Khulna</option>
            <option value="Kishoreganj">Kishoreganj</option>
            <option value="Kurigram">Kurigram</option>
            <option value="Kushtia">Kushtia</option>
            <option value="Lakshmipur">Lakshmipur</option>
            <option value="Lalmonirhat">Lalmonirhat</option>
            <option value="Madaripur">Madaripur</option>
            <option value="Magura">Magura</option>
            <option value="Manikganj">Manikganj</option>
            <option value="Maulvibazar">Maulvibazar</option>
            <option value="Meherpur">Meherpur</option>
            <option value="Munshiganj">Munshiganj</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Naogaon">Naogaon</option>
            <option value="Narail">Narail</option>
            <option value="Narayanganj">Narayanganj</option>
            <option value="Narsingdi">Narsingdi</option>
            <option value="Natore">Natore</option>
            <option value="Nawabganj">Nawabganj</option>
            <option value="Netrokona">Netrokona</option>
            <option value="Nilphamari">Nilphamari</option>
            <option value="Noakhali">Noakhali</option>
            <option value="Pabna">Pabna</option>
            <option value="Panchagarh">Panchagarh</option>
            <option value="Patuakhali">Patuakhali</option>
            <option value="Pirojpur">Pirojpur</option>
            <option value="Rajbari">Rajbari</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Rangamati">Rangamati</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Satkhira">Satkhira</option>
            <option value="Shariatpur">Shariatpur</option>
            <option value="Sherpur">Sherpur</option>
            <option value="Sirajganj">Sirajganj</option>
            <option value="Sunamganj">Sunamganj</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Tangail">Tangail</option>
            <option value="Thakurgaon">Thakurgaon</option>
          </select>

          {district === "Dhaka" && (
            <select
              onChange={(e) => setPost(e.target.value)}
              name="city"
              className="px-2 py-3 border border-secondary border-opacity-40 mb-4 text-black"
              required
            >
              {city.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          )}

          <input
            className="h-[45px] px-2  border border-secondary border-opacity-40 mb-4 text-black text-sm"
            type="text"
            name="address"
            required
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            className="h-[45px] px-2 text-sm border border-secondary border-opacity-40 mb-4 text-black"
            type="text"
            name="appartment"
            placeholder="Appartment, suite, etc."
            onChange={(e) => setAppartment(e.target.value)}
          />

          <input
            className="h-[45px] px-2 text-sm border border-secondary border-opacity-40 mb-8 text-black"
            type="number"
            name="phone"
            required
            placeholder="01xxxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {shippingCart.length > 0 ? (
            <input
              type="submit"
              className="btn mb-8 btn-secondary border-none text-white hover:bg-gray-400"
              value="Check out"
            />
          ) : (
            <Link
              href="/"
              className="btn mb-8 btn-secondary border-none text-white hover:bg-gray-400"
            >
              Empty cart (Go to shopping)
            </Link>
          )}
        </form>

        <div className="w-[100%] lg:w-[50%] mb-10 p-4 shipping-cart-products border">
          <p className="text-center text-2xl pb-4 font-bold ">Your Order</p>
          <div className=" p-4">
            <div className="flex justify-between">
              <p className="font-bold">PRODUCT</p>
              <p className="font-bold">SUBTOTAL</p>
            </div>
            <hr className="my-4" />
            <div className="flex">
              <div className="w-full">
                {shippingCart.map((product) => (
                  <div key={product?._id}>
                    <div className="flex">
                      <div className="w-[60%]">
                        <span className="text-black text-opacity-70 font-sans">
                          {product?.name}
                        </span>
                        &nbsp;&nbsp;
                        <span className=" font-bold">x{product?.quantity}</span>
                      </div>
                      <div className="w-[40%]">
                        <p className=" font-bold text-right">
                          {(JSON.stringify(product?.on_sale) === "true"
                            ? appliedCoupon &&
                              appliedCoupon.discount_type === "percent"
                              ? product?.sale_price -
                                product?.sale_price *
                                  (appliedCoupon.amount / 100)
                              : product?.sale_price
                            : appliedCoupon &&
                                appliedCoupon.discount_type === "percent"
                              ? product?.regular_price -
                                product?.regular_price *
                                  (appliedCoupon.amount / 100)
                              : product?.regular_price) * product.quantity}
                          TK.
                        </p>
                      </div>
                    </div>
                    <hr className="my-4" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Subtotal</p>
              <p className="font-bold ">{shippingProductPrice} TK.</p>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between">
              <p className="font-bold">Shipping</p>
              <p className="font-bold ">
                {district === "Dhaka"
                  ? "Regular (2-3 Days)"
                  : district === "select"
                    ? ""
                    : "Courier (3-5 Days)"}{" "}
                {finalShippingCharge} TK.
              </p>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between">
              <p className="font-bold text-xl">Total</p>
              <p className="font-bold  text-xl">{totalAmount} TK.</p>
            </div>
          </div>

          <p className="p-2 font-bold mt-6">Select Payment Method</p>
          <select
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-[50%] p-2 mx-2"
          >
            <option className="">Cash On Delivery</option>
          </select>

          <hr className="my-4" />

          <p className="text-secondary text-opacity-70">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our{" "}
            <span className="text-secondary font-bold">
              privacy policy as well as delivery and shipping policy.
            </span>{" "}
          </p>

          <hr className="my-4" />
        </div>
      </div>
    </div>
  );
};

export default Shipping;
