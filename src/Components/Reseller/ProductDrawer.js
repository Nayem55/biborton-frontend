import { FiCopy, FiX } from "react-icons/fi";
import Badge from "./Badge";
import { useState } from "react";

const ProductDrawer = ({
  open,
  onClose,
  product,
  affiliateLink,
  onCopyLink,
}) => {
  // All hooks must be at the top level — before any early returns
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Early return AFTER hooks
  if (!open || !product) return null;

  const images = product?.images || [];
  const mainImageSrc = images[selectedImageIndex]?.src || "";
  const displayPrice = product?.on_sale
    ? product?.sale_price
    : product?.regular_price;
  const inStock = Number(product?.stock_quantity || 0) > 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />

      {/* ────────────────────────────────────────────────
          MOBILE BOTTOM SHEET
      ──────────────────────────────────────────────── */}
      <div className="fixed inset-0 z-[70] flex items-end sm:hidden p-3">
        <div
          className="w-full max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Header */}
          <div className="p-4 border-b flex items-start justify-between gap-3 mt-10">
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Product Details</p>
              <h3 className="text-lg font-extrabold text-gray-900 truncate">
                {product.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge tone={inStock ? "green" : "red"}>
                  {inStock ? "In Stock" : "Out of Stock"}
                </Badge>
                {product.on_sale && <Badge tone="purple">On Sale</Badge>}
                {product.brand && (
                  <Badge tone="blue">
                    {String(product.brand).toUpperCase()}
                  </Badge>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 border bg-white hover:bg-gray-50"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Mobile Body */}
          <div className="p-4 overflow-y-auto max-h-[78vh] space-y-4">
            {/* Main selected image */}
            <div className="rounded-2xl overflow-hidden border bg-gray-50">
              <img
                src={mainImageSrc}
                alt={product.name}
                className="w-full h-[220px] object-contain"
                loading="lazy"
              />
            </div>

            {/* Thumbnail gallery – clickable */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
                {images
                  .filter(
                    (img) =>
                      img?.src &&
                      typeof img.src === "string" &&
                      img.src.trim() !== ""
                  )
                  .map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 snap-start transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? "border-black shadow-md"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain bg-white"
                        loading="lazy"
                        // Optional: graceful fallback for broken images
                        onError={(e) => {
                          e.currentTarget.src = "/fallback-product.svg"; // ← place a small placeholder in /public/
                          // or: e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  ))}
              </div>
            )}

            {/* Price & Commission + Affiliate Link */}
            <div className="rounded-2xl border p-4 bg-gradient-to-br from-gray-50 to-white">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="text-2xl font-extrabold text-gray-900">
                    ৳{displayPrice}
                  </p>
                  {product.on_sale && (
                    <p className="text-xs text-gray-500 line-through">
                      ৳{product.regular_price}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Commission (10%)</p>
                  <p className="text-base font-bold text-green-700">
                    ৳{Math.round(Number(displayPrice || 0) * 0.1)}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Your Affiliate Link
                </p>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={affiliateLink}
                    className="flex-1 px-3 py-2 border rounded-xl bg-white text-[11px]"
                  />
                  <button
                    onClick={() => onCopyLink(affiliateLink)}
                    className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 inline-flex items-center gap-2"
                  >
                    <FiCopy /> Copy
                  </button>
                </div>
              </div>
            </div>

            {product.short_description && (
              <div className="rounded-2xl border p-4">
                <p className="font-bold text-gray-900 mb-2 text-sm">
                  Short Description
                </p>
                <div
                  className="text-sm text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                />
              </div>
            )}

            <div className="rounded-2xl border p-4 pb-16">
              <p className="font-bold text-gray-900 mb-3 text-sm">
                Product Info
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-gray-50 p-3 border">
                  <p className="text-gray-500">SKU</p>
                  <p className="font-semibold">{product.sku || "—"}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 border">
                  <p className="text-gray-500">Stock Qty</p>
                  <p className="font-semibold">
                    {product.stock_quantity ?? "—"}
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 border col-span-2">
                  <p className="text-gray-500">Slug</p>
                  <p className="font-semibold break-all">
                    {product.slug || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="p-4 border-t bg-white flex gap-3">
            <button
              onClick={() => onCopyLink(affiliateLink)}
              className="flex-1 rounded-xl bg-black text-white py-3 font-semibold hover:bg-gray-800 inline-flex items-center justify-center gap-2"
            >
              <FiCopy /> Copy Link
            </button>
            <a
              href={affiliateLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-xl border py-3 font-semibold hover:bg-gray-50 text-center"
            >
              Open
            </a>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────
          DESKTOP RIGHT DRAWER
      ──────────────────────────────────────────────── */}
      <div className="hidden sm:block fixed inset-y-0 right-0 w-full sm:w-[520px] bg-white z-[70] shadow-2xl">
        <div className="h-full flex flex-col">
          {/* Desktop Header */}
          <div className="p-5 border-b flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Product Details</p>
              <h3 className="text-xl font-extrabold text-gray-900 mt-1">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-10">
                <Badge tone={inStock ? "green" : "red"}>
                  {inStock ? "In Stock" : "Out of Stock"}
                </Badge>
                {product.on_sale && <Badge tone="purple">On Sale</Badge>}
                {product.brand && (
                  <Badge tone="blue">
                    {String(product.brand).toUpperCase()}
                  </Badge>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 border bg-white hover:bg-gray-50"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Desktop Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Main selected image */}
            <div className="rounded-2xl overflow-hidden border bg-gray-50">
              <img
                src={mainImageSrc}
                alt={product.name}
                className="w-full h-[260px] object-contain"
                loading="lazy"
              />
            </div>

            {/* Thumbnail gallery – clickable */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images
                  .slice(0, 4)
                  .filter(
                    (img) =>
                      img?.src &&
                      typeof img.src === "string" &&
                      img.src.trim() !== ""
                  ) // strict check
                  .map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        selectedImageIndex === idx
                          ? "border-black shadow-md ring-1 ring-black/30"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="w-full h-[70px] object-contain bg-white" // added bg-white to avoid dark leaks
                        loading="lazy"
                        // Optional: hide or replace broken images
                        onError={(e) => {
                          e.target.src = "/placeholder-product.svg"; // ← add a fallback image in public/
                          // or: e.target.style.display = 'none'
                        }}
                      />
                    </div>
                  ))}
              </div>
            )}

            {/* Price, Commission, Affiliate Link */}
            <div className="rounded-2xl border p-4 bg-gradient-to-br from-gray-50 to-white">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-3xl font-extrabold text-gray-900">
                    ৳{displayPrice}
                  </p>
                  {product.on_sale && (
                    <p className="text-sm text-gray-500 line-through">
                      ৳{product.regular_price}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Commission (10%)</p>
                  <p className="text-lg font-bold text-green-700">
                    ৳{Math.round(Number(displayPrice || 0) * 0.1)}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Your Affiliate Link
                </p>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={affiliateLink}
                    className="flex-1 px-3 py-2 border rounded-xl bg-white text-xs"
                  />
                  <button
                    onClick={() => onCopyLink(affiliateLink)}
                    className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 inline-flex items-center gap-2"
                  >
                    <FiCopy /> Copy
                  </button>
                </div>
              </div>
            </div>

            {product.short_description && (
              <div className="rounded-2xl border p-4">
                <p className="font-bold text-gray-900 mb-2">
                  Short Description
                </p>
                <div
                  className="text-sm text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                />
              </div>
            )}

            <div className="rounded-2xl border p-4">
              <p className="font-bold text-gray-900 mb-10">Product Info</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-gray-50 p-3 border">
                  <p className="text-gray-500">SKU</p>
                  <p className="font-semibold">{product.sku || "—"}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 border">
                  <p className="text-gray-500">Stock Qty</p>
                  <p className="font-semibold">
                    {product.stock_quantity ?? "—"}
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 border">
                  <p className="text-gray-500">Slug</p>
                  <p className="font-semibold break-all">
                    {product.slug || "—"}
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 border">
                  <p className="text-gray-500">Category</p>
                  <p className="font-semibold">
                    {product.categories?.[0]?.name || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Footer */}
          <div className="p-5 border-t bg-white">
            <div className="flex gap-3">
              <button
                onClick={() => onCopyLink(affiliateLink)}
                className="flex-1 rounded-xl bg-black text-white py-3 font-semibold hover:bg-gray-800 inline-flex items-center justify-center gap-2"
              >
                <FiCopy /> Copy Link
              </button>
              <a
                href={affiliateLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-xl border py-3 font-semibold hover:bg-gray-50 text-center"
              >
                Open Product Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDrawer;
