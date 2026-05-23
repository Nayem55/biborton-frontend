"use client";
import Image from "next/image";

export default function SingleProduct() {
  return (
    <section className="bg-black ">
      <div className="max-w-7xl mx-auto text-white/80  py-20 px-5 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/*  Left Image Section */}
        <div className="md:w-1/2 relative flex justify-center items-center">
          {/* Main Perfume + Model */}
          <div className="relative w-full max-w-md md:max-w-lg">
            <Image
              src="https://luvit.com.bd/wp-content/uploads/2026/02/clube-de-night.png"
              alt="Miss Armaf Mystique"
              width={380}
              height={380}
              className="opacity-90"
            />
          </div>
        </div>
        {/* Right Text Section */}
        <div className="md:w-1/2 text-center md:text-left space-y-5">
          <p className="text-sm md:text-base font-medium text-">
            Warmth-enabling, Precieux embodies finesse and verve that transcends the conventional. This chypre amber fragrance is intelligently created with attention to detail. Honor the magic of uniquely clubbed zingy, spicy, and woody tones.  
          </p>
          {/* <button className="mt-4 px-6 py-2 border border-white   hover:bg-gray-200 hover:text-black transition">
            See more
          </button> */}
        </div>
      </div>
    </section>
  );
}
