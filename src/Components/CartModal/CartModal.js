import React, { useContext } from "react";
import "./CartModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../Contexts/ThemeContext";
import CartModalProduct from "../CartModalProduct";
import Link from "next/link";

const CartModal = ({ handleModalClose, cartModalRef }) => {
  const { cart, setCart } = useContext(ThemeContext);
  const { products } = useContext(ThemeContext);
  const { freeProduct, setFreeProduct } = useContext(ThemeContext);

  // let minPrice = cart[0]?.price;

  // cart?.forEach((product) => {
  //   if (parseInt(minPrice) >= parseInt(product?.price)) {
  //     minPrice = parseInt(product?.price);
  //   }
  // });

  // const freeProductList = products?.filter(
  //   (product) => product.price <= minPrice
  // );
  const fullColorEnamel = cart.filter((item) =>
    item.name.toLowerCase().includes("full color")
  );
  // const maxiBrushEnamel = cart.filter((item) =>
  //   item.name.toLowerCase().includes("maxi brush")
  // );
  // let maxiBrushEnamelQty = 0;
  // maxiBrushEnamel?.forEach((product) => {
  //   maxiBrushEnamelQty = maxiBrushEnamelQty + product.quantity;
  // });

  const freeProductList = products?.filter(
    (product) =>
      product?.name.toLowerCase().includes("full color") &&
      product?._id !== fullColorEnamel[0]?._id &&
      product?._id !== fullColorEnamel[1]?._id &&
      product?._id !== fullColorEnamel[2]?._id &&
      product?._id !== fullColorEnamel[3]?._id &&
      product?._id !== fullColorEnamel[4]?._id
  );

  let fullColorEnamelQty = 0;
  fullColorEnamel?.forEach((product) => {
    fullColorEnamelQty = fullColorEnamelQty + product.quantity;
  });

  let quantity = 0;

  cart?.forEach((product) => {
    quantity = quantity + product.quantity;
  });

  return (
    <dialog
      ref={cartModalRef}
      className="cart-dialogue relative lg:w-[50%] 2xl:w-[40%]"
    >
      <div className="sticky top-0 py-4 w-full flex justify-between bg-primary z-[90000]">
        <p className="text-center font-bold my-2 ">
          {/* Choose Free Products ({freeProduct.length}/{quantity === 2 ? 1 : 2}) */}
          Choose Free Products ({freeProduct?.length}/{fullColorEnamelQty})
        </p>
        <FontAwesomeIcon
          className=" cursor-pointer text-4xl"
          icon={faXmark}
          onClick={handleModalClose}
        ></FontAwesomeIcon>
      </div>

      <div className="pt-10 w-full">
        {freeProductList?.map((product, i) => (
          <CartModalProduct
            key={i}
            index={i}
            product={product}
            quantity={quantity}
            fullColorEnamelQty={fullColorEnamelQty}
          ></CartModalProduct>
        ))}
      </div>

      <div className={`sticky bottom-0 bg-primary py-3`}>
        <Link
          href="/shipping"
          onClick={()=>{
            handleModalClose();
            }}
          className={`btn  w-[80%] lg:w-[30%]  mx-auto flex justify-center mt-[15px] text-white hover:bg-secondary border-none rounded ${
            freeProduct?.length !== fullColorEnamelQty
              ? "pointer-events-none bg-[#cccccc]"
              : "bg-secondary "
          }`}
        >
          Proceed Checkout
        </Link>
      </div>
    </dialog>
  );
};

export default CartModal;
