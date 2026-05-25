"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { toast } from "react-hot-toast";
import { addToDb } from "../../utilities/CartDb";
import Link from "next/link";
import Image from "next/image";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://biborton-server.vercel.app";

const Product = ({ product }) => {
  const { cart, setCart } = useContext(ThemeContext);

  const [reviewSummary, setReviewSummary] = useState({
    average_rating: Number(product?.average_rating || 0),
    rating_count: Number(product?.rating_count || 0),
  });

  const handleAddToCart = (item) => {
    if (!item?._id) return;

    const exists = cart?.find((p) => p._id === item._id);

    const newCart = exists
      ? cart.map((p) =>
          p._id === item._id ? { ...p, quantity: (p.quantity ?? 1) + 1 } : p,
        )
      : [...(cart ?? []), { ...item, quantity: 1 }];

    setCart(newCart);
    addToDb(item._id);
    toast.success("Added to cart");

    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "AddToCart", {
        content_ids: [String(item?._id)],
        content_name: item?.name || "",
        content_type: "product",
        value: Number(
          (item?.on_sale ? item?.sale_price : item?.regular_price) || 0,
        ),
        currency: "BDT",
      });
    }
  };

  const {
    name,
    slug,
    images,
    brand,
    size,
    regular_price,
    sale_price,
    on_sale,
    stock_quantity,
    stock_status,
  } = product || {};

  useEffect(() => {
    let ignore = false;

    const fetchReviewSummary = async () => {
      if (!name) return;

      try {
        const res = await fetch(
          `${API_BASE_URL}/product-review-summary?productName=${encodeURIComponent(
            name,
          )}`,
          {
            cache: "no-store",
          },
        );

        if (!res.ok) return;

        const data = await res.json();

        if (!ignore) {
          setReviewSummary({
            average_rating: Number(data?.average_rating || 0),
            rating_count: Number(data?.rating_count || 0),
          });
        }
      } catch (error) {
        console.error("Failed to fetch product review summary:", error);
      }
    };

    fetchReviewSummary();

    return () => {
      ignore = true;
    };
  }, [name]);

  const isInStock =
    (stock_quantity ?? 0) > 0 ||
    stock_status === "instock" ||
    stock_status === 1 ||
    stock_status === "1" ||
    stock_status === true;

  const isOnSale = on_sale === true || String(on_sale) === "true";

  const discountPercentage =
    isOnSale && Number(regular_price) > 0
      ? Math.round(
          ((Number(regular_price) - Number(sale_price)) /
            Number(regular_price)) *
            100,
        )
      : 0;

  const displayPrice = isOnSale ? sale_price : regular_price;
  const showStrike = isOnSale && Number(sale_price) < Number(regular_price);

  const rating = Number(reviewSummary.average_rating || 0);
  const ratingCount = Number(reviewSummary.rating_count || 0);
  const hasRating = rating > 0 && ratingCount > 0;

  const renderStars = (value) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const starValue = index + 1;
      const roundedRating = Math.round(value);

      return (
        <span
          key={index}
          className={
            starValue <= roundedRating ? "text-black" : "text-gray-300"
          }
        >
          ★
        </span>
      );
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden transition-all duration-500 bg-white border border-gray-200 h-full">
      {/* IMAGE */}
      <Link href={`/product/${slug}`}>
        <div className="relative aspect-square overflow-hidden flex items-center justify-center cursor-pointer">
          <Image
            src={images?.[0]?.src || "/placeholder.jpg"}
            alt={name || "Product image"}
            title={name || "Product"}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* BADGES */}
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-20">
            {stock_status === "outofstock" && (
              <span className="bg-black/90 text-white text-[10px] font-medium px-2.5 py-0.5 uppercase">
                Out of Stock
              </span>
            )}

            {isInStock && isOnSale && discountPercentage > 0 && (
              <span className="bg-black/90 text-white text-[10px] font-semibold px-2.5 py-0.5">
                -{discountPercentage}%
              </span>
            )}
          </div>

          {/* ADD TO CART */}
          {isInStock && (
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="w-full bg-black text-white py-2.5 text-xs font-semibold uppercase hover:bg-gray-900"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* DETAILS */}
      <div className="flex flex-col flex-grow p-4 text-start">
        <p className="pb-1 text-[10px] text-gray-800 uppercase">{brand}</p>

        <Link href={`/product/${slug}`}>
          <h3 className="cursor-pointer font-serif text-base font-medium text-gray-950 mb-1 line-clamp-2 min-h-[2.5rem]">
            {name}
          </h3>
          {/* <h3 className="cursor-pointer font-serif text-base font-medium text-gray-950 mb-1 line-clamp-2 min-h-[2.5rem]">
            {size &&  `Size: ${size}`}
          </h3> */}
        </Link>

        {/* RATING UI */}
        {hasRating && (
          <div className="flex items-center gap-1 mt-1 mb-1">
            <div className="flex items-center text-[13px] leading-none">
              {renderStars(rating)}
            </div>

            <span className="text-[11px] font-medium text-gray-700">
              {rating.toFixed(1)}
            </span>

            {/* <span className="text-[10px] text-gray-500">({ratingCount})</span> */}
          </div>
        )}

        <div className="flex items-center mt-2 gap-2.5">
          <span className="text-sm font-semibold text-black">
            {displayPrice} BDT
          </span>

          {showStrike && (
            <span className="text-xs text-gray-500 line-through">
              {regular_price} BDT
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
