import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";

import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../Contexts/ThemeContext";
import auth from "../firebase.init";

const ComboCheckout = () => {
  const [user] = useAuthState(auth);
  const { cart, setCart, otpUser } = useContext(ThemeContext);
  const { setFreeProduct } = useContext(ThemeContext);
  const { customerList } = useContext(ThemeContext);
  const [shippingCharge, setShippingCharge] = useState(0);
  const freeProducts = JSON.parse(localStorage.getItem("freeProducts"));
  const [district, setDistrict] = useState("select");
  const navigate = useNavigate();
  const { appliedCoupon, setAppliedCoupon } = useContext(ThemeContext);
  const [orderTime, setOrderTime] = useState(new Date().getTime());
  const [email, setEmail] = useState(user?.email);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [post, setPost] = useState("Select Area");
  const [appartment, setAppartment] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [previewImage, setPreviewImage] = useState("");
  const [orderId, setOrderId] = useState(0);
  // const [studentId, setStudentId] = useState("");
  const { studentId, setStudentId } = useContext(ThemeContext);
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
      // setShippingCharge(parseInt(shippingInDhaka?.settings.cost.value))
      setShippingCharge(60);
    } else if (district === "select") {
      // setShippingCharge(parseInt(shippingOutDhaka?.settings.cost.value))
      setShippingCharge(0);
    } else {
      setShippingCharge(120);
    }
  }, [district]);

  // useEffect(() => {
  //   const viewItemListData = [];

  //   cart.forEach((product) => {
  //     const color = product?.variations?.find(
  //       (v) => v?.product_slug === product?.slug
  //     )?.color;
  //     viewItemListData.push({
  //       item_id: product._id,
  //       item_name: product.name,
  //       item_category: product.categories[0]?.name || "",
  //       item_category2: product.categories[1]?.name || "",
  //       item_category3: product.categories[2]?.name || "",
  //       price: product.regular_price,
  //       quantity: product.quantity,
  //       item_variant: color ? color : "",
  //     });
  //   });

  //   // Push the view_item_list event data to the DataLayer
  //   window.dataLayer.push({
  //     event: "begin_checkout",
  //     ecommerce: {
  //       currency: "BDT",
  //       value: shippingProductPrice,
  //       items: viewItemListData,
  //     },
  //   });
  // }, []);
  useEffect(() => {
    fetch("http://localhost:3200/last-order-id")
      .then((res) => res.json())
      .then((data) => setOrderId(data[0].id + 1));
  }, []);

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
    (customer) => customer?.email === user?.email,
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
    // ReactPixel.track("Purchase", {
    //   products: shippingCart.map((product) => {
    //     return {
    //       product_name: product?.name,
    //       quantity: product?.quantity,
    //       total: JSON.stringify(
    //         (JSON.stringify(product?.on_sale) === "true"
    //           ? appliedCoupon && appliedCoupon.discount_type === "percent"
    //             ? product?.sale_price -
    //               product?.sale_price * (appliedCoupon.amount / 100)
    //             : product?.sale_price
    //           : appliedCoupon && appliedCoupon.discount_type === "percent"
    //           ? product?.regular_price -
    //             product?.regular_price * (appliedCoupon.amount / 100)
    //           : product?.regular_price) * product.quantity
    //       ),
    //     };
    //   }),
    //   content_type: "product",
    //   value: JSON.stringify(
    //     shippingProductPrice + (shippingProductPrice > 999 ? 0 : shippingCharge)
    //   ),
    //   currency: "TAKA",
    // });

    if (phone.length !== 11 || phone.substring(0, 2) !== "01") {
      console.log(phone.substring(0, 2));
      toast.error("Please provide a valid mobile number");
      return;
    }
    if (post === "Select Area" && district === "Dhaka") {
      toast.error("Please select your Area");
      return;
    }

    const data = {
      id: orderId,
      platform: "web",
      transactionId: "",
      payment_method: paymentMethod,
      order_time: orderTime,
      payment_method_title: paymentMethod,
      set_paid: paymentMethod === "Cash On Delivery" ? false : true,
      customer_id: customerInfo?.id || 0,
      order_date: new Date().toISOString(),
      billing: {
        first_name: firstName,
        last_name: lastName,
        address_1: appartment,
        address_2: "",
        city: district,
        state: address,
        postcode: post,
        country: "Bangladesh",
        email: email,
        phone: phone,
      },
      items: shippingCart.map((product) => {
        const data = {
          stock_quantity: JSON.stringify(
            parseInt(product.stock_quantity) - parseInt(product.quantity),
          ),
          stock_status:
            parseInt(product.stock_quantity) - parseInt(product.quantity) > 0
              ? "instock"
              : "outofstock",
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
          product_name: product.name,
          product_img: product.images[0].src,
          sku: product.sku,
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
                : product?.regular_price) * product.quantity,
          ),
        };
      }),
      shipping_title: "Flat Rate",
      shipping_total: JSON.stringify(
        // shippingProductPrice > 999 ? 0 : shippingCharge
        shippingCharge,
      ),
      coupon_title: "",
      order_status: "Processing",
      subtotal: JSON.stringify(Math.floor(shippingProductPrice)),
      // total: JSON.stringify(
      //   shippingProductPrice + (shippingProductPrice > 999 ? 0 : shippingCharge)
      //   // shippingProductPrice + shippingCharge
      // ),
      total: JSON.stringify(
        // shippingProductPrice + (shippingProductPrice > 999 ? 0 : shippingCharge)
        Math.floor(shippingProductPrice + shippingCharge),
      ),
      coupon_used: appliedCoupon?.code || null,
    };

    if (paymentMethod === "Cash On Delivery") {
      if (district !== "select") {
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
        setCart([]);
        e.target.reset();
        toast.success("ORDER CONFIRMED");
        navigate("/shipping/confirmOrder");
        localStorage.removeItem("shopping-cart");
        localStorage.removeItem("combo");
        setShippingCharge(0);
        setAppliedCoupon("");
      } else {
        toast.error("Please Select Your District");
      }
    }
  };

  return (
    <div className="2xl:w-[85%] lg:w-[90%] w-[90%] mx-auto ">
      <Helmet>
        <title>Check Out - Junaid Jamshed collections</title>
        <meta name="description" content="" />
      </Helmet>
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
          {/* {shippingProductPrice > 999 ? (
            <div>
              <p className="font-bold text-primary text-center bg-accent px-10 py-2 mb-2">
                Congratulations! You Got FREE DELIVERY!
              </p>
            </div>
          ) : (
            <div>
              <p className="font-bold text-accent mt-[-20px] mb-10 mb-4">
                Add TK. {1000 - shippingProductPrice} to cart and get FREE
                DELIVERY!
              </p>
            </div>
          )} */}
          {/* <p className="font-bold text-accent">JUST SHARE YOUR VALID STUDENT ID AND GET 30% OFF.</p>
          <input type="file" className="my-4" onChange={(e) => submitImage(e.target.files[0])}/> */}
          <p className="font-bold my-3">Email</p>
          <input
            className="p-2 mb-4 border border-secondary border-opacity-40 text-black"
            type="email"
            name="email"
            value={user?.email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="h-[45px] px-2 text-sm border border-secondary border-opacity-40 mb-4 text-black text-sm"
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
            onChange={(e) => setPhone("+88" + e.target.value)}
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
                        <span className="text-black text-opacity-70 font-sans">
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
                    : "Courier (3-5 Days)"}{" "}
                {/* {shippingProductPrice > 999 ? 0 : shippingCharge} TK. */}
                {shippingCharge} TK.
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="font-bold text-xl">Total</p>
              <p className="font-bold text-accent text-xl">
                {/* {shippingProductPrice +
                  (shippingProductPrice > 999 ? 0 : shippingCharge)} */}
                {shippingProductPrice + shippingCharge} TK.
              </p>
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

export default ComboCheckout;
