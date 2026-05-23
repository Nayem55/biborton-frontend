import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import auth from "../../firebase.init";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { toast } from "react-hot-toast";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import ComboProduct from "./../../Components/ComboProduct/ComboProduct";

const ComboShipping = () => {
  const [user] = useAuthState(auth);
  // const { cart, setCart } = useContext(ThemeContext);
  const { comboProducts, bigComboProducts, bogoProducts } =
    useContext(ThemeContext);
  // const { setFreeProduct } = useContext(ThemeContext);
  const { customerList } = useContext(ThemeContext);
  const { loading } = useContext(ThemeContext);
  // const { shippingInDhaka, shippingOutDhaka } = useContext(ThemeContext);
  const [shippingCharge, setShippingCharge] = useState(0);
  // const freeProducts = JSON.parse(localStorage.getItem("freeProducts"));
  const [district, setDistrict] = useState("select");
  const navigate = useNavigate();
  const { appliedCoupon, setAppliedCoupon, comboDiscount } =
    useContext(ThemeContext);
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

  let shippingCart =
    Object.keys(bigComboProducts[4]).length > 0
      ? bigComboProducts
      : Object.keys(bigComboProducts[2]).length > 0
        ? comboProducts
        : bogoProducts;

  const customerInfo = customerList?.find(
    (customer) => customer?.email === user?.email,
  );
  let shippingProductPrice = 0;

  shippingCart?.forEach((product) => {
    shippingProductPrice =
      parseInt(shippingProductPrice) + parseInt(product.regular_price);
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
            product.stock_quantity - product.quantity,
          ),
        };
        fetch(`http://localhost:3200/editProduct/${product._id}`, {
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
          quantity: 1,
          total: product?.regular_price,
        };
      }),
      shipping_title: "Flat Rate",
      shipping_total: JSON.stringify(
        shippingProductPrice > 999 ? 0 : shippingCharge,
      ),
      coupon_title: "",
      order_status: "New Order",
      subtotal: JSON.stringify(
        Math.round(
          shippingProductPrice - shippingProductPrice * (comboDiscount / 100),
        ),
      ),
      total: JSON.stringify(
        Math.round(
          shippingProductPrice -
            shippingProductPrice * (comboDiscount / 100) +
            (shippingProductPrice > 999 ? 0 : shippingCharge),
        ),
      ),
      coupon_used: "Combo discount",
    };

    await fetch("http://localhost:3200/order", {
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

    e.target.reset();
    setShippingCharge(0);
    toast.success("ORDER CONFIRMED");
    navigate("/shipping/confirmOrder");
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
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between lg:gap-20">
        <form
          onSubmit={handleShipping}
          className="flex flex-col w-[80vw] lg:w-[50%] lg:my-auto"
        >
          {shippingProductPrice > 999 ? (
            <p className="font-bold text-primary text-center bg-accent px-10 py-2">
              Congratulations! You got FREE DELIVERY!
            </p>
          ) : (
            <p className="font-bold text-accent mt-[-20px] mb-10">
              Add TK. {1000 - shippingProductPrice} to cart and get FREE
              DELIVERY!
            </p>
          )}
          <p className="font-bold my-3">Email</p>
          <input
            className="p-2 mb-4 border border-secondary border-opacity-40 text-black"
            type="email"
            name="email"
            required
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
            required
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

        <div className="w-[100%] lg:w-[50%] mb-10 p-4 shipping-cart-products bg-secondary bg-opacity-5">
          <p className="text-center text-2xl pb-4 font-bold ">Your Order</p>
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
                    <div className="flex">
                      <div className="w-[60%]">
                        <span className="text-secondary text-opacity-70 font-sans">
                          {product?.name}
                        </span>
                        &nbsp;&nbsp;
                        <span className="text-accent font-bold">x1</span>
                      </div>
                      <div className="w-[40%]">
                        <p className="text-accent font-bold text-right">
                          {product?.regular_price}
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
              <p className="font-bold">Combo Discount</p>
              <p className="font-bold text-accent">{comboDiscount}%</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="font-bold text-xl">Total</p>
              <p className="font-bold text-accent text-xl">
                {Math.round(
                  shippingProductPrice -
                    shippingProductPrice * (comboDiscount / 100) +
                    (shippingProductPrice > 999 ? 0 : shippingCharge),
                )}{" "}
                TK.
              </p>
            </div>
          </div>
          <p className="my-6 mx-2">Cash On Delivery</p>
          <div className="bg-white">
            <p className="p-4 text-secondary text-opacity-70">
              Pay with cash upon delivery.
            </p>
          </div>
          <hr className="my-4" />
          <p className="text-secondary text-opacity-70">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our{" "}
            <span className="text-secondary font-bold">
              privacy policy.
            </span>{" "}
          </p>
          <hr className="my-4" />
        </div>
      </div>
    </div>
  );
};

export default ComboShipping;
