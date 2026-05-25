import React, { useContext, useEffect, useState } from "react";
// import "./ProductDetails.css";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { addToDb } from "../../utilities/CartDb";
import StarRating from "../../Components/Ratings";
import { FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import VariationSlider from "../../Components/VariationSlider/VariationSlider";
import ImageSlider from "../../Components/ImageSlider";
import { Helmet } from "react-helmet-async";
import { ThreeDots } from "react-loader-spinner";

const ProductsByTag = () => {
  // const { products } = useContext(ThemeContext);
  const { sku } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useContext(ThemeContext);
  const [selectedTab, setSelectedTab] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [reviews, setReviews] = useState([]);
  const [image, setImage] = useState("");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [reviewImage, setReviewImage] = useState("");
  const [fade, setFade] = useState(false);

  // const product = products?.find((product) => product?.slug === slug);

  useEffect(() => {
    fetch(`https://biborton-server.vercel.app/getProductsByTags?name=${sku}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data[0]);
        setLoading(false);
      });
  }, [sku]);

  useEffect(() => {
    fetch(
      `https://biborton-server.vercel.app/reviews?productId=${product?._id}`,
    )
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [product?._id]);

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
      .then((data) => {
        setReviewImage(data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
    toast.success("Image added successfully");
  };

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

  const handlePurchase = (item) => {
    let newCart = [];
    item.quantity = quantity;
    newCart = [item];
    let shoppingCart = {};
    shoppingCart[product?._id] = quantity;

    setCart(newCart);
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  };
  const handleAddReviews = () => {
    const data = {
      date_created: new Date().toISOString(),
      date_created_gmt: "",
      product_id: product?._id,
      product_name: product?.name,
      status: "unapproved",
      reviewer: name,
      reviewer_email: email,
      review: reviewText,
      reviewImage: reviewImage,
      rating: selectedRating,
      verified: false,
      reviewer_avatar_urls: {
        24: "",
        48: "",
        96: "",
      },
    };
    fetch("https://biborton-server.vercel.app/reviews", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    toast.success("Review added successfully");
    setName("");
    setEmail("");
    setReviewText("");
    setSelectedRating(0);
  };

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const avgRating = (totalRating / reviews.length).toFixed(1);

  const renderStar = (starNumber) => {
    const starIcon =
      starNumber <= selectedRating ? (
        <FaStar size={18} color="#FFD700" />
      ) : (
        <AiOutlineStar size={18} color="#FFD700" />
      );

    return (
      <button
        onClick={() => setSelectedRating(starNumber)}
        key={starNumber}
        style={{ marginTop: 6 }}
      >
        {starIcon}
      </button>
    );
  };

  function stripHTMLTags(html) {
    const tmpElement = document.createElement("div");
    tmpElement.innerHTML = html;
    return tmpElement.textContent || tmpElement.innerText || "";
  }

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <ThreeDots
            height="100"
            width="100"
            radius="10"
            color="#7dc569"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <div className="2xl:w-[65%] lg:w-[90%] mx-auto mt-10">
          <Helmet>
            <title>{`${product?.name} - Junaid Jamshed collections`}</title>
            <meta
              name="description"
              content={
                product?.meta_description
                  ? product?.meta_description
                  : stripHTMLTags(product?.short_description).slice(0, 150) +
                    "...."
              }
            />
            <meta name="keywords" content={tags?.join(", ")} />
            {/* Open Graph tags */}
            <meta
              property="og:title"
              content={`${product?.name} - Junaid Jamshed collections`}
            />
            <meta
              property="og:description"
              content={
                product?.meta_description
                  ? product?.meta_description
                  : stripHTMLTags(product?.short_description).slice(0, 150) +
                    "...."
              }
            />
            <meta
              property="og:image"
              content={product?.images && product?.images[0].src}
            />
            <meta
              property="og:url"
              content={`https://biborton.shop/sku/${sku}`}
            />
            <meta property="og:type" content="website" />
            <link rel="canonical" href={`https://biborton.shop/sku/${sku}`} />
            <script type="application/ld+json">
              {`
                {
                  "@context": "http://schema.org",
                  "@type": "Product",
                  "name": "${product?.name} - Junaid Jamshed collections",
                  "description": "${
                    product?.meta_description
                      ? product?.meta_description
                      : stripHTMLTags(product?.short_description).slice(
                          0,
                          150,
                        ) + "...."
                  }",
                  "brand": {
                    "@type": "Brand",
                    "name": "Junaid Jamshed collections"
                  },
                  "gtin13": "${sku}",
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "BDT",
                    "price": "${
                      JSON.stringify(product?.on_sale) === "true"
                        ? product?.sale_price
                        : product?.regular_price
                    }",
                    "availability": "${
                      product?.stock_quantity > 0
                        ? "http://schema.org/InStock"
                        : "http://schema.org/OutOfStock"
                    }"
                  },
                  "image": "${product?.images && product?.images[0].src}",
                  "url": "https://biborton.shop/sku/${sku}"
                }
              `}
            </script>
          </Helmet>
          <div className="flex flex-col lg:flex-row ">
            <div className="flex flex-col lg:flex-row-reverse w-[100%] lg:w-[70%] lg:m-10 gap-4">
              <div className="w-[100%] lg:w-[85%]">
                <img
                  className={`w-[100%] ease-in-out duration-500 ${
                    fade ? "opacity-0" : "opacity-1"
                  }`}
                  src={image || product?.images[0]?.src}
                  alt=""
                />
              </div>
              <div className="flex mx-auto lg:flex-col gap-6 my-0 w-[100%] lg:w-[18%] w-[90vw] overflow-x-scroll lg:overflow-x-visible">
                {product?.images.map((img, index) => (
                  <img
                    key={index}
                    onClick={() => {
                      setFade(true);
                      setTimeout(() => setFade(false), 500);
                      setTimeout(() => setImage(img.src), 500);
                    }}
                    className={`w-[20%] lg:w-[100%] border border-2 p-1 cursor-pointer border-secondary ${
                      img.src ? "" : "hidden"
                    }`}
                    src={img.src}
                    alt=""
                    height={200}
                    width={200}
                  />
                ))}
              </div>
            </div>

            <div className="w-[100%] lg:w-[50%] mx-auto px-6 lg:px-0 py-10">
              <p className="text-3xl my-3">{product?.name}</p>
              <div className="flex items-center">
                {/* <StarRating rating={avgRating} size={18}></StarRating> */}
                <FaStar size={18} color="#FAB73B" />
                <p className="mx-2" style={{ color: "#000" }}>
                  ({avgRating > 0 ? avgRating : 0}) | {reviews.length} Customer
                  Reviews
                </p>
              </div>
              <p className="text-sm text-black text-opacity-70 mt-6">
                {product?.brand?.toUpperCase()}
              </p>
              <br />
              <div className={`flex gap-2 mb-4`}>
                <p className="text-accent font-bold text-3xl">
                  BDT{" "}
                  {JSON.stringify(product?.on_sale) === "true"
                    ? product?.sale_price
                    : product?.regular_price}{" "}
                </p>
                {JSON.stringify(product?.on_sale) === "true" && (
                  <p
                    style={{
                      textDecorationLine: "line-through",
                      textDecorationStyle: "solid",
                      color: "#000",
                      opacity: 0.5,
                      fontSize: "20px",
                    }}
                  >
                    {`${product?.regular_price} BDT`}
                  </p>
                )}
              </div>
              <div
                className="text-black text-opacity-70 mb-4"
                dangerouslySetInnerHTML={{ __html: product?.short_description }}
              />
              {/* ......................attributes............................ */}
              <div style={{ flex: 1, marginBottom: 20 }}>
                {product?.attributes?.map((attribute) => (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ fontSize: 16 }}>{attribute?.name}</p>
                      <p style={{ color: "#000", opacity: 0.5 }}>
                        {attribute?.options}
                      </p>
                    </div>
                    <div
                      style={{
                        borderBottomColor: "black",
                        borderBottomWidth: 1,
                        borderStyle: "dotted",
                        marginTop: 6,
                        opacity: 0.2,
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              {/* ...................stock status .......................*/}
              {/* <div>
            <p className="text-primary bg-[#a0b951] w-[100px] flex justify-center py-1 font-bold my-2">
              {product?.stock_quantity > 0 ? "In Stock" : "Out Stock"}
            </p>
          </div> */}
              <p>Quantity : </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 ">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="text-black hover:text-primary hover:bg-accent cursor-pointer text-xs p-[10px] h-[18px] border border-secondary rounded"
                    icon={faMinus}
                  ></FontAwesomeIcon>
                  <input
                    type="text"
                    Value={quantity}
                    disabled
                    className="border-secondary border w-[60px] my-[10px] text-center h-[40px] border-x-0"
                  />
                  <FontAwesomeIcon
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-black bg-primary hover:text-primary hover:bg-accent cursor-pointer text-xs p-[10px] h-[18px] border border-secondary rounded"
                    icon={faPlus}
                  ></FontAwesomeIcon>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`btn hover:bg-secondary text-primary w-[45%] sm:w-[60%] border-none font-bold rounded ${
                      product?.stock_quantity < 1
                        ? "bg-[#cccccc] pointer-events-none"
                        : "bg-accent"
                    }`}
                  >
                    Add to cart
                  </button>
                  <Link
                    // to={quantity < 2 ? "/shipping" : "/cart"}
                    to="/shipping"
                    onClick={() => handlePurchase(product)}
                    className={`btn hover:bg-accent text-primary w-[45%] sm:w-[60%] border-none font-bold rounded ${
                      product?.stock_quantity < 1
                        ? "bg-[#cccccc] pointer-events-none"
                        : "bg-secondary"
                    }`}
                  >
                    Buy it now
                  </Link>
                </div>
              </div>
              <p className="my-2 font-bold">
                Subtotal:{" "}
                {(JSON.stringify(product?.on_sale) === "true"
                  ? product?.sale_price
                  : product?.regular_price) * quantity}{" "}
                BDT
              </p>
              {/* ...........variations............... */}
              {product?.variations?.length > 1 && (
                <div className="flex gap-4 mb-3 h-[40px]">
                  <VariationSlider
                    variations={product?.variations}
                    id={product._id}
                  ></VariationSlider>
                </div>
              )}
            </div>
          </div>
          <div>
            <hr className="mt-6"></hr>
            <div className="flex gap-10 justify-center my-10 px-6">
              <button
                onClick={() => setSelectedTab(1)}
                className={`font-bold text-[14px] sm:text-[16px] ${
                  selectedTab === 1 && "text-accent"
                }`}
              >
                DESCRIPTION
              </button>
              <button
                onClick={() => setSelectedTab(2)}
                className={`font-bold text-[14px] sm:text-[16px] ${
                  selectedTab === 2 && "text-accent"
                }`}
              >
                REVIEWS
              </button>
              <button
                onClick={() => setSelectedTab(3)}
                className={`font-bold text-[14px] sm:text-[16px] ${
                  selectedTab === 3 && "text-accent"
                }`}
              >
                SHIPPING & DELIVERY
              </button>
            </div>

            {selectedTab === 2 ? (
              <div className="px-10">
                <p>Reviews For {product.name}</p>
                {reviews.length < 1 && (
                  <div style={{ flex: 1 }}>
                    <p style={{ opacity: 0.5 }}>There are no reviews yet.</p>
                  </div>
                )}
                {reviews.map((review) => (
                  <div>
                    <div
                      style={{
                        borderBottomColor: "black",
                        borderBottomWidth: 1,
                        borderStyle: "dotted",
                        marginTop: 6,
                        opacity: 0.2,
                      }}
                    ></div>
                    <div
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{
                          width: 48,
                          height: 48,
                          marginTop: 20,
                          borderRadius: 50,
                        }}
                        src="https://secure.gravatar.com/avatar/8d889825c6601354445cd63f684ad82f?s=48&d=mm&r=g"
                        alt=""
                      />
                      <div style={{ marginTop: 10 }}>
                        <p>{review.reviewer}</p>
                        <StarRating
                          rating={review.rating}
                          size={18}
                        ></StarRating>
                      </div>
                    </div>
                    <div
                      className="text-black text-opacity-70 w-[96%]"
                      dangerouslySetInnerHTML={{ __html: review?.review }}
                    />
                    {review.reviewImage && (
                      <img
                        alt=""
                        className="w-[200px] border mb-10"
                        src={review.reviewImage}
                      />
                    )}
                  </div>
                ))}
                <div
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    borderStyle: "dotted",
                    marginTop: 6,
                    opacity: 0.2,
                  }}
                ></div>
                {/* .......................Add reviews ........................*/}
                <div>
                  <p style={{ fontSize: 16, marginTop: 20 }}>ADD A REVIEW</p>
                  <p style={{ opacity: 0.5, marginTop: 10 }}>
                    Your email address will not be published.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <p>Your rating : </p>
                    <div style={{ flexDirection: "row" }}>
                      {[1, 2, 3, 4, 5].map((starNumber) =>
                        renderStar(starNumber),
                      )}
                    </div>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <p>Your review</p>
                    <textarea
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="border border-secondary px-2 py-1 w-[100%]"
                    />
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <p>Your name</p>
                    <input
                      type="text"
                      value={name}
                      className="border border-secondary px-2 py-1 w-[100%]"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <p>Your email</p>
                    <input
                      type="email"
                      value={email}
                      className="border border-secondary px-2 py-1 w-[100%]"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <input
                    className="mt-4"
                    type="file"
                    onChange={(e) => setPreviewImage(e.target.files[0])}
                  />
                  <button
                    className="block bg-secondary text-primary p-4 hover:bg-accent ease-in-out duration-200 mt-4"
                    onClick={submitImage}
                  >
                    Upload Image
                  </button>
                  <button
                    onClick={handleAddReviews}
                    className="bg-secondary h-[40px] flex items-center justify-center rounded w-[100%] mt-[20px] mb-[60px] hover:bg-accent ease-in-out duration-200"
                  >
                    <p style={{ color: "#fff" }}>Submit</p>
                  </button>
                </div>
              </div>
            ) : selectedTab === 3 ? (
              <div className="mb-[60px] px-10">
                <p>
                  1. Packaging materials: This may include boxes, envelopes,
                  packaging peanuts, bubble wrap, and other materials used to
                  protect the goods during transportation.<br></br>
                  <br></br>2. Shipping label: This is a label that is affixed to
                  the outside of the package and contains important information
                  such as the recipient's address, the sender's address, the
                  shipping method, and the tracking number.<br></br>
                  <br></br>3. Invoices and packing slips: These are documents
                  that accompany the shipment and provide details on the
                  contents of the package, including the type and quantity of
                  items, the price, and any applicable taxes.<br></br>
                  <br></br>4. Delivery instructions: These are special
                  instructions for the delivery person, such as where to leave
                  the package or any special requirements for delivery.<br></br>
                  <br></br>5. Insurance documents: If the shipment is insured,
                  this may include documentation that provides details on the
                  insurance coverage, such as the value of the goods and the
                  conditions under which the insurance applies.<br></br>
                  <br></br>6. Documentation required for customs clearance: If
                  the shipment is being transported internationally, it may
                  require customs clearance. This may include documents such as
                  commercial invoices, packing lists, and bills of lading.
                  <br></br>
                  <br></br>Having complete and accurate shipping and delivery
                  content is important to ensure a smooth and efficient delivery
                  process. It also helps to prevent errors and delays, and
                  ensures that the recipient receives the correct goods in good
                  condition.
                </p>
              </div>
            ) : (
              <div
                className="text-black text-opacity-70 mb-10 px-6"
                dangerouslySetInnerHTML={{ __html: product?.description }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsByTag;
