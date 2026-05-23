"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./CartPage.css";
import { ThemeContext } from "../../Components/Providers"; // Adjusted path
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CartProduct from "../../Components/CartProduct/CartProduct";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import CartModal from "../../Components/CartModal/CartModal";
import toast from "react-hot-toast";

const CartPage = () => {
  const { cart } = useContext(ThemeContext);
  const { orderList } = useContext(ThemeContext);
  const [user] = useAuthState(auth);
  const [newCustomer, setNewCustomer] = useState(false);
  const cartModalRef = useRef();
  const [disabled, setDisabled] = useState(false);
  const [couponText, setCouponText] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [couponTotal, setCouponTotal] = useState(0);
  const { appliedCoupon, setAppliedCoupon } = useContext(ThemeContext);
  const { freeProduct, setFreeProduct } = useContext(ThemeContext);

  const previousCustomer = orderList?.find(
    (list) => list?.email === user?.email,
  );
  useEffect(() => {
    if (freeProduct?.length > 0) {
      window.location.reload();
    }
  }, []);
  useEffect(() => {
    if (previousCustomer) {
      setNewCustomer(false);
    } else {
      setNewCustomer(true);
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCoupons`)
      .then((res) => res.json())
      .then((data) => setCoupons(data));
  }, [previousCustomer]);

  const handleModalOpen = () => {
    cartModalRef.current.showModal();
    document.documentElement.style.overflowY = "hidden";
  };

  const handleModalClose = () => {
    cartModalRef.current.close();
    setFreeProduct([]);
    document.documentElement.style.overflowY = "visible";
    setTimeout(() => window.location.reload(), 10);
  };

  let price = 0;
  let quantity = 0;

  cart?.forEach((product) => {
    quantity = quantity + product.quantity;
    price =
      price +
      (product?.on_sale > 0 ? product?.sale_price : product?.regular_price) *
        product.quantity;
  });

  const fullColorEnamel = cart.filter((item) =>
    item.name.toLowerCase().includes("full color"),
  );
  let fullColorEnamelQty = 0;
  fullColorEnamel?.forEach((product) => {
    fullColorEnamelQty = fullColorEnamelQty + product.quantity;
  });
  const maxiBrushEnamel = cart.filter((item) =>
    item.name.toLowerCase().includes("maxi brush"),
  );
  let maxiBrushEnamelQty = 0;
  maxiBrushEnamel?.forEach((product) => {
    maxiBrushEnamelQty = maxiBrushEnamelQty + product.quantity;
  });

  const handleCoupon = () => {
    setCouponTotal(0);
    const appliedCoupon = coupons.find(
      (coupon) => coupon.code.toLowerCase() === couponText.toLocaleLowerCase(),
    );
    const currentDate = new Date();
    const couponExpiryDate = new Date(appliedCoupon?.date_expires);
    if (appliedCoupon) {
      if (appliedCoupon.discount_type === "percent") {
        setAppliedCoupon(appliedCoupon);
        price = price - Math.floor(price * (appliedCoupon.amount / 100));
        cart.forEach((item) => {
          item.price = item.price - item.price * (appliedCoupon.amount / 100);
        });
        setCouponTotal(price);
        setCouponText("");
        toast.success("Coupon added successfully");
        setDisabled(true);
      } else {
        setAppliedCoupon(appliedCoupon);
        price = price - appliedCoupon.amount;
        setCouponTotal(price);
        setCouponText("");
        toast.success("Coupon added successfully");
        setDisabled(true);
      }
    } else {
      setCouponText("");
      setAppliedCoupon("");
      toast.error("Invalid coupon");
    }
  };

  return (
    <div className="2xl:w-[65%] lg:w-[75%] w-[90%] mx-auto mb-10">
      <div className="my-10">
        <p className="text-[12px] font-semibold">
          Home
          <FontAwesomeIcon
            className="mx-2"
            icon={faCaretRight}
          ></FontAwesomeIcon>
          Shopping Cart
        </p>
        <div className="flex flex-col lg:flex-row justify-between">
          <p className="text-xl my-4 font-bold">My Cart</p>
          <Link href="/shipping" className="flex items-center">
            <p className="mr-2">Continue Shopping</p>
          </Link>
        </div>
      </div>

      <div className="cart-container flex flex-col lg:flex-row gap-[40px]">
        <div className="w-[100%] lg:w-[70%]">
          <div className="flex mb-4 justify-between bg-secondary bg-opacity-10 px-10 py-4">
            <p className="w-[85%]">Products</p>
            <p className="w-[15%]">Quantity</p>
          </div>
          {cart?.map((product) => (
            <CartProduct
              key={product._id || product.id} // 👈 MUST
              product={product}
              appliedCoupon={appliedCoupon}
            />
          ))}
          <div className="mt-6 flex items-center ">
            <input
              onChange={(e) => setCouponText(e.target.value)}
              className="border border-secondary px-4 h-[40px] rounded mr-4"
              placeholder="Coupon Code"
              type="text"
            />
            <button
              disabled={disabled}
              onClick={handleCoupon}
              className={` border border-accent rounded px-4 h-[40px] ease-in-out duration-200 ${
                disabled
                  ? "bg-[#cccccc] text-accent"
                  : "bg-accent text-primary hover:border-secondary hover:bg-secondary"
              }`}
            >
              Apply
            </button>
          </div>
        </div>

        <div className="subtotal flex flex-col items-center w-[100%] lg:w-[30%]">
          <p className="block bg-secondary px-4 py-4 bg-opacity-10 w-full text-center">
            Subtotal
          </p>
          <div className="flex items-center gap-4">
            <p className="text-3xl my-6 text-accent font-bold">
              {/* TK. {newCustomer ? Math.floor(price - price * 0.1) : price} */}
              TK. {couponTotal > 0 ? couponTotal : price}
            </p>
          </div>
          <hr className="h-[2px] bg-secondary bg-opacity-20 w-full" />
          <label htmlFor="comments" className="text-left w-full my-3 text-xs">
            {" "}
            Additional Comments
          </label>
          <textarea
            name="comments"
            rows="4"
            cols="20"
            className="border border-secondary w-full border-opacity-30"
          />

          <Link
            href="/shipping"
            className="btn bg-secondary  w-full mt-[15px] text-white border-none rounded"
          >
            {" "}
            Proceed To Checkout{" "}
          </Link>
        </div>
        <CartModal
          handleModalClose={handleModalClose}
          cartModalRef={cartModalRef}
        ></CartModal>
      </div>
    </div>
  );
};

export default CartPage;
