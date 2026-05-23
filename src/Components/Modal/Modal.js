import React, { useContext, useState } from "react";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faStar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { addToDb } from "../../utilities/CartDb";
import { toast } from "react-hot-toast";
import StarRating from "../Ratings";

const Modal = ({ product, dialogueRef, handleBlurClose }) => {
  const { cart, setCart } = useContext(ThemeContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (item) => {
    let newCart = [];
    const exists = cart.find((product) => product?._id == item._id);
    if (!exists) {
      item.quantity = quantity;
      newCart = [...cart, item];
    } else {
      item.quantity = exists.quantity + quantity;
      const rest = cart.filter((product) => product?._id !== item._id);
      newCart = [...rest, item];
    }
    setCart(newCart);
    addToDb(item._id, quantity);

    toast.success("ADDED TO CART");
  };

  return (
    <dialog ref={dialogueRef} className={"dialogue"} >
      <div className="flex gap-6  relative items-center" >
        <FontAwesomeIcon
          className="absolute cursor-pointer top-[0px] right-[0px] text-4xl"
          icon={faXmark} onClick={handleBlurClose}
        ></FontAwesomeIcon>
        <div className="w-[50%]">
          <img className=" modal-img" src={product?.images[0].src} alt="" />
        </div>

        <div className="w-[50%] py-10 text-left">
          {/* <p className="text-3xl my-3">{product?.name}</p> */}
           <p className="text-3xl my-3">{product?.name} {product?.size && `${product.size} ML`}</p>
          <StarRating rating={product?.average_rating} size={18}></StarRating>
          <p className="text-sm text-secondary text-opacity-70">
            {product?.brand?.toUpperCase()}
          </p>
          <p>Availablity : In Stock</p>
          <br/>
          <div className="my-10 text-secondary text-opacity-70 limit-details-lines" dangerouslySetInnerHTML={{ __html: product?.description }} />
          <p className="text-accent text-3xl font-bold my-8">
            {" "}
            TK. {(JSON.stringify(product?.on_sale)==="true") && product?.stock_quantity > 0
                ? Math.floor(product?.sale_price)
                : Math.floor(product?.regular_price)}{" "}
          </p>
          <p>Quantity</p>
          <div className="flex items-center">
            <FontAwesomeIcon
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="text-secondary text-xs p-[6px] border border-secondary"
              icon={faMinus}
            ></FontAwesomeIcon>
            <input
              type="text"
              disabled
              Value={quantity}
              className="border-secondary border w-[90px] my-2 text-center"
            />
            <FontAwesomeIcon
              onClick={() => setQuantity(quantity + 1)}
              className="text-secondary bg-primary text-xs p-[6px] border border-secondary"
              icon={faPlus}
            ></FontAwesomeIcon>
          </div>
          <p className="my-2 font-bold">
            Subtotal: TK. {((JSON.stringify(product?.on_sale)==="true") > 0
                ? product?.sale_price
                : product?.regular_price) * quantity}
          </p>
          <button
            onClick={() => handleAddToCart(product)}
            className="btn bg-secondary hover:bg-accent border-none text-primary w-[60%] font-bold mb-2 rounded"
          >
            Add to cart
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
