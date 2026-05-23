import "./PopCart.css";
import Link from "next/link";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { useContext, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import useScroll from "../../Hooks/useScroll";
import { removeFromDb } from "../../utilities/CartDb";

const PopCart = ({ popCart, handlePopCart }) => {
  const { cart, setCart } = useContext(ThemeContext);
  const [scrollPosition] = useScroll();

  const { price, quantity } = useMemo(() => {
    let total = 0;
    let qty = 0;

    cart?.forEach((product) => {
      const isOnSale = JSON.stringify(product?.on_sale) === "true";
      const unit = isOnSale
        ? Number(product?.sale_price)
        : Number(product?.regular_price);
      const q = Number(product?.quantity || 0);

      qty += q;
      total += unit * q;
    });

    return { price: total, quantity: qty };
  }, [cart]);

  const handleDelete = (id) => {
    const rest = cart.filter((product) => product._id !== id);
    setCart(rest);
    removeFromDb(id);
  };

  return (
    <div
      className={`
        pop-cart-container
        lg:w-[30%] 2xl:w-[22%]
        ${popCart ? "right-20" : "right-1000 top-900"}
        ${scrollPosition > 80 ? "lg:top-[150px]" : "lg:top-[150px]"}
        rounded-2xl
        bg-white/95 backdrop-blur-xl
        border border-gray-200
        shadow-[0_18px_60px_rgba(0,0,0,0.12)]
        overflow-hidden
      `}
      role="dialog"
      aria-label="Mini cart"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <p className="text-[11px] tracking-[0.28em] uppercase text-gray-500">
            Shopping Bag
          </p>
          <p className="text-sm font-semibold text-gray-900">
            {quantity > 0
              ? `${quantity} item${quantity > 1 ? "s" : ""}`
              : "Empty"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => handlePopCart(false)}
          className="
            inline-flex items-center justify-center
            h-9 w-9 rounded-full
            border border-gray-200
            text-gray-700
            hover:bg-black hover:text-white hover:border-black
            transition-all duration-300
            focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30
          "
          aria-label="Close mini cart"
        >
          <FontAwesomeIcon icon={faXmark} className="text-[16px]" />
        </button>
      </div>


      {/*  */}
      {/* Content */}
      <div className="px-5 pt-4">
        {cart?.length ? (
          <div className="pop-cart-products pr-2 max-h-[520px] overflow-y-auto">
            {cart?.map((product) => {
              const isOnSale = JSON.stringify(product?.on_sale) === "true";
              const unit = isOnSale
                ? product?.sale_price
                : product?.regular_price;

              return (
                <div
                  key={product._id}
                  className="
                    mb-4 flex items-center gap-4
                    rounded-xl
                    border border-gray-100
                    bg-white
                    px-3 py-3
                    hover:border-gray-200
                    transition-colors
                  "
                >
                  {/* Image */}
                  <div className="w-[64px] h-[64px] rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                    <img
                      src={product?.images?.[0]?.src}
                      className="w-full h-full object-cover"
                      alt={product?.name || "Product"}
                      loading="lazy" 
                    />
                  </div> 

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[12px] font-semibold text-gray-900 truncate tracking-wide">
                      {product?.name} {product?.size && `${product.size} ML`}
                    </h3>

                    <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-600">
                      <span className="tracking-wider uppercase">
                        Tk. {unit}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="tracking-wider uppercase">
                        Qty {product?.quantity}
                      </span>

                      {isOnSale && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="text-[10px] tracking-[0.2em] uppercase bg-black text-white px-2 py-[2px] rounded-full">
                            Sale
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => handleDelete(product._id)}
                    className="
                      h-9 w-9 rounded-full
                      border border-gray-200
                      text-gray-700
                      hover:bg-black hover:text-white hover:border-black
                      transition-all duration-300
                      flex items-center justify-center
                    "
                    aria-label="Remove item"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-[14px]" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="text-[11px] tracking-[0.28em] uppercase text-gray-500">
              Your bag is empty
            </p>
            <p className="mt-2 text-sm text-gray-800">
              Explore the collection and add something you love.
            </p>
            <Link
              href="/shop"
              onClick={() => handlePopCart(false)}
              className="
                mt-5 inline-flex items-center justify-center
                h-11 px-6
                rounded-full
                border border-gray-300
                text-[11px] font-semibold tracking-[0.25em] uppercase
                text-gray-900
                hover:bg-black hover:text-white hover:border-black
                transition-all duration-300
              "
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-2 border-t border-gray-100 px-5 py-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] tracking-[0.25em] uppercase text-gray-500">
            Total
          </p>
          <p className="text-sm font-semibold text-gray-900">Tk. {price}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            href="/cart"
            onClick={() => handlePopCart(false)}
            className="
              h-11 rounded-full
              inline-flex items-center justify-center
              border border-gray-300
              text-[11px] font-semibold tracking-[0.22em] uppercase
              text-gray-900
              hover:bg-black hover:text-white hover:border-black
              transition-all duration-300
            "
          >
            View Bag
          </Link>

          <Link
            href="/shipping"
            onClick={() => handlePopCart(false)}
            className="
              h-11 rounded-full
              inline-flex items-center justify-center
              bg-black text-white
              text-[11px] font-semibold tracking-[0.22em] uppercase
              hover:bg-gray-900
              transition-all duration-300
            "
          >
            Checkout
          </Link>
        </div>

        {/* Subtext */}
        <p className="mt-3 text-[10px] tracking-[0.18em] uppercase text-gray-400">
          Secure checkout • Fast delivery
        </p>
      </div>
    </div>
  );
};

export default PopCart;
