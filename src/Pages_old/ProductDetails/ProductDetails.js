"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faTruckFast,
  faArrowRotateLeft,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { addToDb } from "../../utilities/CartDb";
import StarRating from "../../Components/Ratings";
import { FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import VariationSlider from "../../Components/VariationSlider/VariationSlider";
import { ThreeDots } from "react-loader-spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

const ProductDetails = ({
  slug: slugProp,
  product: ssrProduct,
  faqs: ssrFaqs,
  initialReviews,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const router = useRouter();

  const params = useParams();
  const { slug: slugFromParams } = params || {};
  const slug = slugProp || slugFromParams;

  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useContext(ThemeContext);
  const [selectedTab, setSelectedTab] = useState(1);
  const [selectedRating, setSelectedRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [reviews, setReviews] = useState(initialReviews || []);
  const [image, setImage] = useState(ssrProduct?.images?.[0]?.src || "");
  const [product, setProduct] = useState(ssrProduct || {});
  const [loading, setLoading] = useState(!ssrProduct);
  const [sizeVariants, setSizeVariants] = useState([]);

  // console.log(sizeVariants, "total size");

  const [tags, setTags] = useState(() => {
    const uniqueTags = [];
    ssrProduct?.tags?.forEach((tag) => {
      if (tag?.name && !uniqueTags.includes(tag.name)) {
        uniqueTags.push(tag.name);
      }
    });
    return uniqueTags;
  });

  const [previewImage, setPreviewImage] = useState("");
  const [reviewImage, setReviewImage] = useState("");
  const [fade, setFade] = useState(false);
  const [faqs, setFaqs] = useState(ssrFaqs || []);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const searchParams = useSearchParams();

  const handleFaqClick = (index) => {
    setIsFaqOpen(index === isFaqOpen ? false : index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    // If SSR data is available, use it and skip client fetch
    if (
      ssrProduct &&
      Object.keys(ssrProduct).length &&
      slug === ssrProduct?.slug
    ) {
      setProduct(ssrProduct);
      setFaqs(ssrFaqs || []);
      setReviews(initialReviews || []);
      setImage(ssrProduct?.images?.[0]?.src || "");
      setLoading(false);

      const uniqueTags = [];
      ssrProduct?.tags?.forEach((tag) => {
        if (tag?.name && !uniqueTags.includes(tag.name)) {
          uniqueTags.push(tag.name);
        }
      });
      setTags(uniqueTags);

      return;
    }

    // Client navigation fallback
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getSingleProduct/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data || {});
        setLoading(false);
        setImage(data?.images?.[0]?.src || "");

        const uniqueTags = [];
        data?.tags?.forEach((tag) => {
          if (tag?.name && !uniqueTags.includes(tag.name)) {
            uniqueTags.push(tag.name);
          }
        });
        setTags(uniqueTags);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getFaqs`)
      .then((res) => res.json())
      .then((data) => setFaqs(data || []))
      .catch((error) => console.error("Error fetching FAQs:", error));
  }, [slug, ssrProduct, ssrFaqs, initialReviews]);

  useEffect(() => {
    if (!product?.name) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/productVariants?name=${encodeURIComponent(
        product.name,
      )}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setSizeVariants(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching size variants:", error);
        setSizeVariants([]);
      });
  }, [product?.name]);

  useEffect(() => {
    if (initialReviews?.length) return;
    if (!product?.name) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reviews?productName=${encodeURIComponent(
        product.name,
      )}`,
    )
      .then((res) => res.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      });
  }, [product?.name, initialReviews]);

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref && !localStorage.getItem("affiliate_ref")) {
      localStorage.setItem("affiliate_ref", ref);
      localStorage.setItem("affiliate_ref_time", Date.now().toString());
    }
  }, [searchParams]);

  const avgRating = useMemo(() => {
    const totalRating = reviews.reduce(
      (sum, review) => sum + (Number(review?.rating) || 0),
      0,
    );
    return reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;
  }, [reviews]);

  const renderStar = (num) => (
    <button
      onClick={() => setSelectedRating(num)}
      key={num}
      className="mt-1 mr-1"
      type="button"
    >
      {num <= selectedRating ? (
        <FaStar size={18} className="text-yellow-500" />
      ) : (
        <AiOutlineStar size={18} className="text-gray-700" />
      )}
    </button>
  );

  const handleAddToCart = (item) => {
    let newCart = [];
    const exists = cart.find((p) => p?._id === item._id);

    if (!exists) {
      newCart = [...cart, { ...item, quantity }];
    } else {
      const rest = cart.filter((p) => p?._id !== item._id);
      newCart = [...rest, { ...item, quantity: exists.quantity + quantity }];
    }

    setCart(newCart);
    addToDb(item._id, quantity);
    toast.success("ADDED TO CART");
  };

  const handlePurchase = (item) => {
    const newCart = [{ ...item, quantity }];
    let shoppingCart = {};
    shoppingCart[item?._id] = quantity;
    setCart(newCart);
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  };

  const handleVariantClick = (variantSlug) => {
    if (!variantSlug || variantSlug === product?.slug) return;
    router.push(`/product/${variantSlug}`);
  };

  const submitImage = () => {
    const data = new FormData();
    data.append("file", previewImage);
    data.append("upload_preset", "ebayReview");
    data.append("cloud_name", "dlnvuofmt");

    fetch("https://api.cloudinary.com/v1_1/dlnvuofmt/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((d) => setReviewImage(d.secure_url))
      .catch((err) => console.log(err));

    toast.success("Image added successfully");
  };

  const handleAddReviews = () => {
    const data = {
      date_created: new Date().toISOString(),
      product_id: product?._id,
      product_name: product?.name,
      status: "unapproved",
      reviewer: name,
      reviewer_email: email,
      review: reviewText,
      reviewImage: reviewImage,
      rating: selectedRating,
      verified: false,
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    toast.success("Review submitted for approval");
    setName("");
    setEmail("");
    setReviewText("");
    setSelectedRating(5);
  };

  return (
    <div className="bg-white font-sans text-gray-900 container mx-auto ">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ThreeDots height="80" width="80" color="#111111" visible={true} />
        </div>
      ) : (
        <div className="Container mx-auto px-4 md:px-10 lg:px-0 py-10">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-xs tracking-widest uppercase text-gray-400">
            <Link href="/" className="hover:text-black">
              Home
            </Link>{" "}
            /<span className="mx-2">product</span> /
            <span className="text-black font-semibold">
              {product?.name} {product?.size && `${product.size} ML`}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Image Section */}
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails Swiper */}
              <div className="w-full md:w-20 lg:w-24">
                <Swiper
                  key={product?.images?.length}
                  slidesPerView="auto"
                  spaceBetween={8}
                  className="h-24 md:h-[500px]"
                  breakpoints={{
                    0: {
                      direction: "horizontal",
                      spaceBetween: 8,
                    },
                    768: {
                      direction: "vertical",
                      spaceBetween: 12,
                    },
                  }}
                >
                  {product?.images
                    ?.filter((img) => img?.src)
                    .map((img, idx) => (
                      <SwiperSlide
                        key={idx}
                        className="!w-20 !h-20 md:!w-auto md:!h-[110px]"
                      >
                        <img
                          src={img.src || "/placeholder.jpg"}
                          alt="thumbnail"
                          // width={110}
                          // height={110}
                          // sizes="100px"
                          className={`w-full h-full object-cover border cursor-pointer transition-all duration-300 ${
                            image === img.src
                              ? "border-black p-1"
                              : "border-gray-200"
                          }`}
                          onClick={() => {
                            setFade(true);
                            setTimeout(() => {
                              setImage(img.src);
                              setFade(false);
                            }, 300);
                          }}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>

              {/* Main Image */}
              <div className="flex-1 overflow-hidden bg-gray-50 flex items-center justify-center relative group">
                <img
                  src={image || product?.images?.[0]?.src || "/placeholder.jpg"}
                  alt={product?.name}
                  // width={700}
                  // height={700}
                  // priority
                  className={`max-h-[600px] object-contain transition-opacity duration-300 ${
                    fade ? "opacity-0" : "opacity-100"
                  }`}
                />

                {product?.on_sale && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] tracking-widest uppercase font-bold">
                    Sale
                  </div>
                )}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-2">
                {product?.brand || "Biborton"}
              </span>
              <h1 className="text-3xl md:text-4xl font-light mb-4 tracking-tight leading-tight">
                {product?.name} {product?.size && `${product.size} ML`}
              </h1>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <StarRating rating={avgRating} size={14} />
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  {reviews.length} Reviews
                </span>
              </div>

              <div>
                <p className="uppercase text-md text-gray-600 mb-1 tracking-wider">
                  <span className="font-bold">Type:</span> {product?.type}
                </p>
                <p className="uppercase text-md text-gray-600 mb-5 tracking-wider">
                  <span className="font-bold">Use For:</span> {product?.gender}
                </p>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-2xl font-semibold tracking-tighter text-black">
                  BDT{" "}
                  {product?.on_sale
                    ? product?.sale_price
                    : product?.regular_price}
                </span>
                {product?.on_sale && (
                  <span className="text-lg text-gray-300 line-through font-light">
                    BDT {product?.regular_price}
                  </span>
                )}
              </div>

              <div
                className="text-gray-500 text-sm leading-relaxed mb-8 prose prose-stone"
                dangerouslySetInnerHTML={{ __html: product?.short_description }}
              />

              {/* Dynamic Size Buttons */}
              {sizeVariants?.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500 mb-3">
                    Size:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {sizeVariants.map((item) => {
                      const isActive = item?.slug === product?.slug;

                      return (
                        <button
                          key={item?._id || item?.slug}
                          type="button"
                          onClick={() => handleVariantClick(item?.slug)}
                          disabled={isActive}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                            isActive
                              ? "bg-black text-white border-black cursor-default"
                              : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {product?.size && `${product.size} ML`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Attributes */}
              <div className="space-y-3 mb-8">
                {product?.attributes?.map((attr, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-xs border-b border-gray-50 pb-2"
                  >
                    <span className="uppercase tracking-widest text-gray-400 font-medium">
                      {attr?.name}
                    </span>
                    <span className="text-black font-semibold">
                      {attr?.options}
                    </span>
                  </div>
                ))}
              </div>

              {/* Add to Cart Actions */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 h-14 px-4 rounded-full">
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="hover:text-red-500 transition-colors"
                      type="button"
                    >
                      <FontAwesomeIcon icon={faMinus} className="text-[10px]" />
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-12 text-center font-bold bg-transparent text-sm"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="hover:text-red-500 transition-colors"
                      type="button"
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 h-14 bg-black text-white text-[10px] tracking-[0.2em] uppercase font-bold rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
                    type="button"
                  >
                    Add to Bag
                  </button>
                </div>

                <Link
                  href={product.stock_status === "outofstock" ? "#" : "/cart"}
                  onClick={(e) => {
                    if (product.stock_status === "outofstock") {
                      e.preventDefault();
                      return;
                    }
                    handlePurchase(product);
                  }}
                  className={`w-full flex justify-center items-center h-14 text-[10px] tracking-[0.2em] uppercase font-bold rounded-full transition-all ${
                    product.stock_status === "outofstock"
                      ? "border-2 border-gray-400 text-gray-400 cursor-not-allowed opacity-60"
                      : "border-2 border-black text-black hover:bg-black hover:text-white active:scale-95"
                  }`}
                >
                  {product.stock_status === "outofstock"
                    ? "Out of Stock"
                    : "Buy It Now"}
                </Link>
              </div>

              {/* Subtotal & Variations */}
              <div className="mt-6 flex justify-between items-center">
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                  Total: BDT{" "}
                  {(product?.on_sale
                    ? product?.sale_price
                    : product?.regular_price) * quantity}
                </p>
                {product?.variations?.length > 1 && (
                  <VariationSlider
                    variations={product?.variations}
                    id={product._id}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-b border-gray-100 mb-20">
            <div className="flex flex-col items-center text-center group">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="text-2xl text-gray-300 mb-3 group-hover:text-black transition-colors"
              />
              <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1">
                100% Original
              </h4>
              <p className="text-xs text-gray-400">Authenticity Guaranteed</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <FontAwesomeIcon
                icon={faArrowRotateLeft}
                className="text-2xl text-gray-300 mb-3 group-hover:text-black transition-colors"
              />
              <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1">
                Easy Returns
              </h4>
              <p className="text-xs text-gray-400">Hassle Free Exchanges</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <FontAwesomeIcon
                icon={faTruckFast}
                className="text-2xl text-gray-300 mb-3 group-hover:text-black transition-colors"
              />
              <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1">
                Secure Shipping
              </h4>
              <p className="text-xs text-gray-400">Fast & Safe Delivery</p>
            </div>
          </div>

          {/* Tabs Section */}
          <div>
            <div className="flex justify-center gap-10 md:gap-20 border-b border-gray-100 mb-12">
              {["Description", "FAQs", "Reviews"].map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTab(i + 1)}
                  className={`pb-4 text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold transition-all relative ${
                    selectedTab === i + 1
                      ? "text-black"
                      : "text-gray-900 hover:text-black"
                  }`}
                  type="button"
                >
                  {tab}
                  {selectedTab === i + 1 && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="max-w-4xl mx-auto px-4">
              {selectedTab === 1 && (
                <div
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500 prose prose-stone max-w-none text-gray-600 leading-loose"
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                />
              )}

              {selectedTab === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {faqs
                    ?.filter((f) => f?.productID === product?.sku)
                    .map((item, i) => (
                      <div
                        key={i}
                        className="border border-gray-100 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => handleFaqClick(i)}
                          className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                          type="button"
                        >
                          <span className="text-sm font-semibold tracking-tight">
                            {item?.question}
                          </span>
                          <span className="text-xl font-light">
                            {isFaqOpen === i ? "−" : "+"}
                          </span>
                        </button>
                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            isFaqOpen === i
                              ? "max-h-[500px] border-t border-gray-100"
                              : "max-h-0"
                          }`}
                        >
                          <p className="p-5 text-sm text-gray-500 leading-relaxed">
                            {item?.answer}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {selectedTab === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-10">
                    <div className="md:w-1/3">
                      <h3 className="text-2xl font-light mb-2">
                        Customer Feedback
                      </h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-4xl font-bold">{avgRating}</span>
                        <div>
                          <StarRating rating={avgRating} size={14} />
                          <p className="text-[10px] uppercase text-gray-400 mt-1">
                            Based on {reviews.length} reviews
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3 w-full bg-gray-50 p-8 rounded-2xl">
                      <h4 className="text-xs tracking-[0.2em] font-bold uppercase mb-6">
                        Write a review
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-700">
                          Your Rating:{" "}
                          <div className="flex text-gray-800">
                            {[1, 2, 3, 4, 5].map(renderStar)}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full h-12 px-4 text-sm bg-white border border-gray-200 outline-none focus:border-black rounded-lg"
                          />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="w-full h-12 px-4 text-sm bg-white border border-gray-200 outline-none focus:border-black rounded-lg"
                          />
                        </div>
                        <textarea
                          rows={4}
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Share your experience..."
                          className="w-full p-4 text-sm bg-white border border-gray-200 outline-none focus:border-black rounded-lg"
                        />
                        <div className="flex flex-col md:flex-row gap-4">
                          <input
                            type="file"
                            onChange={(e) => setPreviewImage(e.target.files[0])}
                            className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-gray-200 hover:file:bg-gray-300 cursor-pointer"
                          />
                          <button
                            onClick={submitImage}
                            className="text-[10px] uppercase font-bold tracking-widest bg-gray-200 px-6 h-10 rounded-full"
                            type="button"
                          >
                            Upload Image
                          </button>
                        </div>
                        <button
                          onClick={handleAddReviews}
                          className="w-full h-14 bg-black text-white text-[10px] uppercase font-bold tracking-[0.2em] rounded-full hover:bg-gray-800 transition-all"
                          type="button"
                        >
                          Submit Review
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5 divide-y divide-gray-100">
                    {reviews.length > 0 ? (
                      reviews.map((rev, i) => (
                        <div key={rev?._id || i} className="pt-8 flex gap-6">
                          <Image
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              rev?.reviewer || "Customer",
                            )}&background=random`}
                            alt={rev?.reviewer || "Customer avatar"}
                            width={100}
                            height={48}
                            className="rounded-full bg-gray-100 w-[35px] h-[35px]"
                          />

                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h5 className="text-sm font-bold uppercase tracking-widest mb-1">
                                  {rev?.reviewer || "Customer"}
                                </h5>
                                <StarRating
                                  rating={Number(rev?.rating) || 0}
                                  size={12}
                                />
                              </div>

                              {rev?.date_created && (
                                <span className="text-[10px] text-gray-300 uppercase">
                                  {new Date(
                                    rev.date_created,
                                  ).toLocaleDateString()}
                                </span>
                              )}
                            </div>

                            <div
                              className="text-sm text-gray-500 leading-relaxed mb-4 prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: rev?.review || "",
                              }}
                            />

                            {rev?.reviewImage && (
                              <Image
                                src={rev.reviewImage}
                                alt="review"
                                width={200}
                                height={200}
                                className="rounded-lg border border-gray-100"
                              />
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="pt-8 text-center">
                        <p className="text-sm text-gray-400">
                          No reviews yet for this product.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
