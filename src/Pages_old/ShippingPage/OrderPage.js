"use client";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { ThemeContext } from "../../Components/Providers"; // Adjusted path
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const Shipping = () => {
  const [user] = useAuthState(auth);
  const { cart, setCart } = useContext(ThemeContext);
  const { setFreeProduct } = useContext(ThemeContext);
  const { customerList } = useContext(ThemeContext);
  const { loading } = useContext(ThemeContext);
  const { shippingInDhaka, shippingOutDhaka } = useContext(ThemeContext);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [freeProducts, setFreeProducts] = useState([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("freeProducts");
      if (stored) setFreeProducts(JSON.parse(stored));
    }
  }, []);
  const [district, setDistrict] = useState("select");
  const router = useRouter();
  const { appliedCoupon, setAppliedCoupon } = useContext(ThemeContext);
  const [orderTime, setOrderTime] = useState(new Date().getTime());

  useEffect(() => {
    if (district === "Dhaka") {
      // setShippingCharge(parseInt(shippingInDhaka?.settings.cost.value))
      setShippingCharge(60);
    } else if (district === "select") {
      // setShippingCharge(parseInt(shippingOutDhaka?.settings.cost.value))
      setShippingCharge(0);
    } else {
      setShippingCharge(120);
    }
  }, [district]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${
    months[new Date().getMonth()]
  } ${new Date().getDate()}, ${new Date().getFullYear()}`;

  let shippingCart = [];
  if (freeProducts?.length > 0) {
    shippingCart = [...cart, ...freeProducts];
  } else {
    shippingCart = cart;
  }

  const customerInfo = customerList?.find(
    (customer) => customer?.email === user?.email
  );
  let shippingProductPrice = 0;

  shippingCart?.forEach((product) => {
    shippingProductPrice =
      shippingProductPrice +
      (JSON.stringify(product?.on_sale) === "true"
        ? product?.sale_price -
          (appliedCoupon?.discount_type === "percent"
            ? product?.sale_price * ((appliedCoupon?.amount || 0) / 100)
            : appliedCoupon?.amount || 0)
        : product?.regular_price -
          (appliedCoupon?.discount_type === "percent"
            ? product?.regular_price * ((appliedCoupon.amount || 0) / 100)
            : appliedCoupon?.amount || 0)) *
        product.quantity;
  });

  const handleShipping = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const address = e.target.address.value;
    const appartment = e.target.appartment.value;
    const phone = e.target.phone.value;
    // const phoneNumber = "+88" + phone;

    const data = {
      id: Math.floor(Math.random() * 100000000),
      payment_method: "Cash On Delivery",
      order_time: orderTime,
      payment_method_title: "Cash On Delivery",
      set_paid: false,
      customer_id: customerInfo?.id || 0,
      order_date: new Date().toISOString(),
      billing: {
        first_name: firstName,
        last_name: lastName,
        address_1: appartment,
        address_2: "",
        city: district,
        state: address,
        postcode: "",
        country: "Bangladesh",
        email: email,
        phone: phone,
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        address_1: appartment,
        address_2: "",
        city: district,
        state: address,
        postcode: "",
        country: "Bangladesh",
      },
      items: shippingCart.map((product) => {
        const data = {
          stock_quantity: JSON.stringify(
            product.stock_quantity - product.quantity
          ),
        };
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/editProduct/${product._id}`, {
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

        return {
          product_id: product._id,
          quantity: product.quantity,
          total: JSON.stringify(
            (JSON.stringify(product?.on_sale) === "true"
              ? appliedCoupon && appliedCoupon.discount_type === "percent"
                ? product?.sale_price -
                  product?.sale_price * (appliedCoupon.amount / 100)
                : product?.sale_price
              : appliedCoupon && appliedCoupon.discount_type === "percent"
              ? product?.regular_price -
                product?.regular_price * (appliedCoupon.amount / 100)
              : product?.regular_price) * product.quantity
          ),
        };
      }),
      shipping_title: "Flat Rate",
      shipping_total: JSON.stringify(
        shippingProductPrice > 999 ? 0 : shippingCharge
      ),
      coupon_title: "",
      order_status: "Processing",
      subtotal: JSON.stringify(shippingProductPrice),
      total: JSON.stringify(
        shippingProductPrice + (shippingProductPrice > 999 ? 0 : shippingCharge)
      ),
      coupon_used: appliedCoupon || null,
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("orderTime", JSON.stringify(orderTime));
      });

    setCart([]);
    setFreeProduct([]);
    localStorage.removeItem("shopping-cart");
    localStorage.removeItem("freeProducts");
    e.target.reset();
    setShippingCharge(0);
    toast.success("ORDER CONFIRMED");
    router.push("/shipping/confirmOrder");
  };
  return (
    <div className="2xl:w-[85%] lg:w-[90%] w-[90%] mx-auto ">
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
      {shippingProductPrice > 999 ? (
        <p className="font-bold text-primary text-center bg-accent px-10 py-2">
          Congratulations! You got FREE DELIVERY!
        </p>
      ) : (
        <p className="font-bold text-accent mt-[-20px] mb-10">
          Add TK. {1000 - shippingProductPrice} to cart and get FREE DELIVERY!
        </p>
      )}
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between lg:gap-20">
        <form
          onSubmit={handleShipping}
          className="flex flex-col w-[90vw] lg:w-[50%]"
        >
          <p className="font-bold my-3">Email</p>
          <input
            className="p-2 mb-4 border border-secondary border-opacity-40 text-black"
            type="email"
            name="email"
            value={user?.email}
          />
          <p className="font-bold my-3">Shipping address</p>
          <div className="flex justify-between gap-4">
            <input
              className="p-2 mb-4 border border-secondary w-[50%] border-opacity-40 text-black"
              type="text"
              name="firstName"
              required
              placeholder="First name"
            />
            <input
              className="p-2 mb-4 border border-secondary w-[50%] border-opacity-40 text-black"
              type="text"
              name="lastName"
              required
              placeholder="Last name"
            />
          </div>

          <select
            onChange={(e) => setDistrict(e.target.value)}
            name="district"
            className="px-2 py-3 border border-secondary border-opacity-40 mb-4 text-black"
            required
          >
            <option value="">Select district</option>
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
            <option value="Dhaka">Dhaka</option>
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

          <input
            className="p-2 border border-secondary border-opacity-40 mb-4 text-black"
            type="text"
            name="address"
            required
            placeholder="Address"
          />

          <input
            className="p-2 border border-secondary border-opacity-40 mb-4 text-black"
            type="text"
            name="appartment"
            placeholder="Appartment, suite, etc."
          />
          <input
            className="p-2 border border-secondary border-opacity-40 mb-8 text-black"
            name="phone"
            required
            placeholder="Phone number"
            value={user?.phoneNumber}
          />
          {shippingCart.length > 0 ? (
            <input
              type="submit"
              className="btn mb-8 btn-secondary border-none text-white hover:bg-accent"
              value="Check out"
            />
          ) : (
            <Link
              to="/"
              className="btn mb-8 btn-secondary border-none text-white hover:bg-accent"
            >
              Empty cart (Go to shopping)
            </Link>
          )}
        </form>

        <div className="w-[100%] lg:w-[50%] mb-10 shipping-cart-products bg-secondary bg-opacity-5">
          {/* <p className="text-center text-2xl p-4 font-bold ">Your Order</p> */}
          <div className="bg-primary p-4">
            <div className="flex justify-between">
              <p className="font-bold">PRODUCT</p>
              <p className="font-bold">SUBTOTAL</p>
            </div>
            <hr className="my-4" />
            <div className="flex">
              <div className="w-full">
                {shippingCart.map((product) => (
                  <div>
                    <div className="flex items-center">
                      <img
                        src={product?.images[0].src}
                        className="w-[15%]"
                        alt=""
                      />
                      <div className="w-[60%]">
                        <span className="text-secondary font-bold font-sans sm:ms-6">
                          {product?.name}
                        </span>
                        &nbsp;&nbsp;
                        <span className="text-accent font-bold">
                          x{product?.quantity}
                        </span>
                      </div>
                      <div className="w-[40%]">
                        <p className="text-accent font-bold text-right">
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
              <p className="font-bold text-accent">
                {shippingProductPrice} TK.
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="font-bold">Shipping</p>
              <p className="font-bold text-accent">
                {district === "Dhaka"
                  ? "Regular (2-3 Days)"
                  : district === "select"
                  ? ""
                  : "Courier (5-7 Days)"}{" "}
                {shippingProductPrice > 999 ? 0 : shippingCharge} TK.
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="font-bold text-xl">Total</p>
              <p className="font-bold text-accent text-xl">
                {shippingProductPrice +
                  (shippingProductPrice > 999 ? 0 : shippingCharge)}{" "}
                TK.
              </p>
            </div>
          </div>
          <p className="my-6 mx-2">Cash On Delivery</p>
          <div className="bg-white">
            <p className="p-4 text-secondary font-bold">
              Pay with cash upon delivery.
            </p>
          </div>
          <hr className="my-4" />
          <p className="text-secondary font-bold">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our{" "}
            <span className="text-secondary font-bold">privacy policy.</span>{" "}
          </p>
          <hr className="my-4" />
        </div>
      </div>
    </div>
  );
};

export default Shipping;
