import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import img1 from "../../Images/Website-icon-1.png";
import img3 from "../../Images/Website-icon-3.png";
import alovera from "../../Images/aloevera-copy1-ezgif.com-webp-to-jpg-converter.jpg";
import "./Featured.css";

const Featured = () => {
  const [selectedTab, setSelectedTab] = useState("skin");

  return (
    <section className="flex flex-col items-center px-[0px] pt-10 mx-auto">
      {/* ✅ Section Heading with semantic tags */}
      <header className="text-center">
        <h4 className="text-4xl font-bold">
          <span className="text-accent">CHOOSE</span>{" "}
          <span className="text-secondary ms-2">KINDNESS</span>
        </h4>
        <p className="text-center text-accent font-bold text-2xl mt-4">
          Unleash Your Inner Confidence with <strong>Natural Goodness</strong>
        </p>
      </header>

      {/* ✅ Tabs for Kind to Skin / Animals */}
      <nav
        aria-label="Kindness categories"
        className="2xl:w-[1200px] lg:w-[85%] mx-auto flex gap-4 sm:gap-16 justify-center p-6 sm:py-10"
      >
        {/* ✅ Kind to Skin */}
        <button
          className="flex flex-col items-center relative"
          onClick={() => setSelectedTab("skin")}
          aria-pressed={selectedTab === "skin"}
          aria-label="Kind to Skin"
          title="Learn how we are kind to skin"
        >
          <LazyLoadImage
            src={img1}
            alt="Kind to Skin Icon"
            effect="blur"
            loading="lazy"
          />
          <p className="mt-4 text-accent font-bold hidden sm:block">
            KIND TO SKIN
          </p>
          {selectedTab === "skin" && (
            <svg
              className="absolute bottom-[-85px] left-[30px] z-10 hidden sm:block"
              xmlns="http://www.w3.org/2000/svg"
              height="5em"
              viewBox="0 0 320 512"
              aria-hidden="true"
            >
              <path
                fill="#ffffff"
                d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
              />
            </svg>
          )}
        </button>

        {/* ✅ Kind to Animals */}
        <button
          className="flex flex-col items-center relative"
          onClick={() => setSelectedTab("animals")}
          aria-pressed={selectedTab === "animals"}
          aria-label="Kind to Animals"
          title="Learn how we are kind to animals"
        >
          <LazyLoadImage
            src={img3}
            alt="Kind to Animals Icon"
            effect="blur"
            loading="lazy"
          />
          <p className="mt-4 text-accent font-bold hidden sm:block">
            KIND TO ANIMALS
          </p>
          {selectedTab === "animals" && (
            <svg
              className="absolute bottom-[-85px] left-[40px] z-10 hidden sm:block"
              xmlns="http://www.w3.org/2000/svg"
              height="5em"
              viewBox="0 0 320 512"
              aria-hidden="true"
            >
              <path
                fill="#ffffff"
                d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* ✅ KIND TO SKIN Content */}
      <div
        className={`flex flex-col lg:flex-row mx-auto w-[95%] 2xl:w-[1200px] ${
          selectedTab === "skin" ? "" : "hidden"
        }`}
      >
        <article className="flex flex-col items-center justify-center lg:w-[60%] mx-auto bg-[#b7dd90] p-10">
          <h4 className="text-xl 2xl:text-3xl text-[#006938] font-bold mb-6 text-center">
            Be Kind to Skin
          </h4>
          <p className="text-center text-sm 2xl:text-xl mb-4 text-[#006938] font-bold">
            At <strong>Junaid Jamshed collections</strong>, we believe
            simplicity isn’t just a trend—it’s a promise. We craft our skincare
            with the belief that clean beauty should be accessible to everyone
            without compromising on quality or sustainability.
          </p>
          <p className="text-center text-sm 2xl:text-xl mb-4 text-[#006938] font-bold">
            Embrace your natural beauty inside and out. Join us on a journey of
            simplicity, sustainability, and radiant skin. Explore Earth Beauty &
            You, where nature’s best unlocks your most beautiful self.
          </p>
        </article>
        <figure className="w-[100%] lg:w-[40%] mx-auto bg-secondary">
          <LazyLoadImage
            src={alovera}
            alt="Aloe Vera - Natural Skincare Ingredient"
            effect="blur"
            loading="lazy"
            className="w-[100%] mb-[-8px]"
          />
        </figure>
      </div>

      {/* ✅ KIND TO ANIMALS Content */}
      <div
        className={`flex flex-col sm:flex-row mx-auto w-[95%] 2xl:w-[1200px] ${
          selectedTab === "animals" ? "" : "hidden"
        }`}
      >
        <figure className="w-[100%] lg:w-[40%] mx-auto">
          <LazyLoadImage
            src="https://www.simpleskincare.com/sk-eu/content/dam/brands/simple/global_use/2080744-peta-cruelty-free.jpg.rendition.1700.650.jpg"
            alt="Cruelty-Free Skincare Products"
            effect="blur"
            loading="lazy"
            className="w-[100%]"
          />
        </figure>
        <article className="flex flex-col items-center justify-center lg:w-[60%] mx-auto bg-[#b7dd90] p-10">
          <h3 className="text-xl 2xl:text-3xl text-[#006938] font-bold mb-6 text-center">
            Kind to Animals!
          </h3>
          <p className="text-center text-sm 2xl:text-xl mb-4 text-[#006938] font-bold">
            At Junaid Jamshed collections, kindness isn’t just about healthy
            skin—it’s about blooming with an open heart toward all living
            beings. We believe true beauty radiates from compassion.
          </p>
          <p className="text-center text-sm 2xl:text-xl mb-4 text-[#006938] font-bold">
            Our commitment to <strong>cruelty-free practices</strong> is
            unwavering. We never test on animals anywhere in the world and
            proudly comply with PETA’s strict regulations. Our ingredients are
            sourced ethically to ensure no harm is done.
          </p>
          <p className="text-center text-sm 2xl:text-xl mb-4 text-[#006938] font-bold">
            When you choose Junaid Jamshed collections, you choose more than
            skincare; you choose kindness that ripples outward. Join us in
            celebrating a world where beauty shines brightest when it embraces
            all living beings.
          </p>
        </article>
      </div>
    </section>
  );
};

export default Featured;
