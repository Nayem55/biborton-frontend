import React, { useContext, useRef } from "react";
import "./CartProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { getStoredCart, removeFromDb } from "../../utilities/CartDb";
import toast from "react-hot-toast";

const CartProduct = ({ product ,appliedCoupon }) => {
  const { cart, setCart } = useContext(ThemeContext);
  const quantityRef = useRef();

  const handleUpdate = (id) => {
    const storedCart = getStoredCart();
    const quantity = parseInt(quantityRef.current.innerText);

    if (storedCart[id]) {
      storedCart[id] = quantity;
    }

    //!setting Cart Data to UI
    setCart(
      cart.map((pd) => {
        if (pd._id === product._id) {
          pd.quantity = quantity;
          return pd;
        } else return pd;
      })
    );

    //?Setting Cart Data to Local Storage
    localStorage.setItem("shopping-cart", JSON.stringify(storedCart));
    toast.success("Updated cart successfully")
  };

  const handleDelete = (id) => {
    const rest = cart.filter((product) => product._id !== id);
    setCart(rest);
    removeFromDb(id);
    // console.log(id);
  };

  return (
    <div className="flex items-center h-[200px]">
      <div className="flex w-[70%] lg:w-[80%]">
        <div className="cart-product-container">
          <div className="cart-img-container ">
            <img className="" src={product?.images[0].src} alt="" />
          </div>
          <div className="cart-product-details]">
            {/* <p className="opacity-70 cart-product-name text-black">{product?.name}</p> */}
             <p className="opacity-70 cart-product-name text-black">{product?.name} {product?.size && `${product.size} ML`}</p>
            <p className="text-accent font-bold">
              TK.{" "}
                  {(JSON.stringify(product?.on_sale)==="true")
                  ? (appliedCoupon&&appliedCoupon.discount_type==="percent") ? (product?.sale_price - (product?.sale_price*(appliedCoupon.amount/100))):(product?.sale_price)
                  : (appliedCoupon&&appliedCoupon.discount_type==="percent")  ? (product?.regular_price - (product?.regular_price*(appliedCoupon.amount/100))): (product?.regular_price)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col  w-[30%] lg:w-[20%] gap-0 ">
        {/*--------------- Input Group  --------------*/}
        <div className="flex gap-6 items-center">
          <div className="w-[70%] relative">
            <span
              onClick={() =>
                (quantityRef.current.innerText =
                  parseInt(quantityRef.current.innerText) + 1)
              }
              className="cursor-pointer"
            >
              <FontAwesomeIcon
                className="upArrow text-secondary text-sm text-opacity-50"
                icon={faCaretUp}
              ></FontAwesomeIcon>
            </span>
            <div
              name="quantity"
              ref={quantityRef}
              className="px-2 pt-1 border w-full border-secondary quantity-input "
            >
              {product.quantity}
            </div>
            <span
              onClick={() => {
                if (parseInt(quantityRef.current.innerText) > 1) {
                  quantityRef.current.innerText =
                    parseInt(quantityRef.current.innerText) - 1;
                }
              }}
              className="cursor-pointer"
            >
              <FontAwesomeIcon
                className="downArrow text-sm text-secondary text-opacity-50"
                icon={faCaretDown}
              ></FontAwesomeIcon>
            </span>
          </div>

          <button
            onClick={() => {
              handleDelete(product._id);
              quantityRef.current.innerText = product.quantity;
            }}
          >
            <FontAwesomeIcon
              className="hover:text-accent"
              icon={faTrash}
            ></FontAwesomeIcon>
          </button>
        </div>
        <button
          onClick={() => {
            handleUpdate(product._id);
          }}
          className="text-xs flex justify-start hover:text-accent  font-bold mt-4"
        >
          Update Cart
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
