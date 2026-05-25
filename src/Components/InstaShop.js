import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import instaImg from "../Images/argon-oil-products.jpg";
import instaImg1 from "../Images/onion-oil-ebay.jpg";
import instaImg2 from "../Images/Coconut Oil.jpg";

const InstaShop = () => {
  const instagramPosts = [
    {
      url: "https://www.instagram.com/p/CzQ4LEFShLH/",
      img: instaImg2,
      alt: "Coconut Oil - Junaid Jamshed collections",
      caption: "Coconut Oil",
    },
    {
      url: "https://www.instagram.com/p/CzELm7rSiy9/",
      img: instaImg1,
      alt: "Onion Oil - Junaid Jamshed collections",
      caption: "Onion Oil",
    },
    {
      url: "https://www.instagram.com/p/CzTnh5rS_tV/",
      img: instaImg,
      alt: "Argan Oil - Junaid Jamshed collections",
      caption: "Argan Oil",
    },
  ];

  return (
    <section
      className="overflow-hidden"
      aria-label="Junaid Jamshed collections Instagram Shop section"
    >
      <div className="my-10 flex flex-col items-center">
        {/* ✅ SEO-friendly Heading */}
        <h6 className="text-2xl text-center font-bold">
          Junaid Jamshed collections Instashop
        </h6>

        {/* ✅ Instagram Posts Grid */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-10 my-10 sm:mx-10">
          {instagramPosts.map((post, index) => (
            <figure key={index} className="overflow-hidden w-[300px]">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${post.caption} on Instagram`}
              >
                <LazyLoadImage
                  className="w-full rounded"
                  src={post.img}
                  alt={post.alt}
                  effect="blur"
                />
              </a>
              <figcaption className="text-center mt-2 text-secondary font-medium">
                {post.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* ✅ Instagram CTA */}
        <p className="text-center text-secondary font-bold">
          Click a post you like & discover the products.
        </p>

        <a
          href="https://www.instagram.com/earthbeautyandyou/"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-secondary px-6 py-2 flex justify-center items-center gap-3 my-6 hover:bg-secondary hover:text-primary ease-in-out duration-200"
        >
          {/* Instagram Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.8em"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
            />
          </svg>
          <span className="font-bold">Follow us on Instagram</span>
        </a>

        {/* ✅ Structured Data for Instagram Profile */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Junaid Jamshed collections",
            url: "https://biborton.shop",
            sameAs: ["https://www.instagram.com/earthbeautyandyou/"],
          })}
        </script>
      </div>
    </section>
  );
};

export default InstaShop;
