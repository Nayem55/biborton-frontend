import Link from "next/link";
import React from "react";

const VideoBanner = () => {
  return (
    <section className="w-full flex justify-center">
      <div className="relative w-full h-[95vh] md:h-[80vh]  lg:h-[115vh] overflow-hidden shadow-lg sm:shadow-xl ">
        
        <video
          className="absolute inset-0 w-full h-full object-cover "
          src="https://cdn.shopify.com/videos/c/o/v/6005e9d48996431eacfbfbe0156875da.mp4"
          autoPlay
          muted
          loop
          playsInline
        />


        {/* Overlay Content */}
       
        <div className=" lg:-mt-20   absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-10 px-6 sm:px-12 text-white">
          <h3 className="text-3xl  font-semibold sm:text-[28px] md:text-[34px] uppercase  text-center tracking-wider  sm:block">
            Black Musk BLING
          </h3>
          <p className="mt-4 text-center font-normal  max-w-2xl text-base sm:text-lg opacity-90  sm:block ">
            Discover premium scents crafted to define your personality.
          </p>
          <Link
            href={"/shop"}
            className="mt-8 px-5 lg:px-8 py-1 md:py-2 text-[15px]  text-white border border-white font-semibold  hover:scale-105 transition  sm:block"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VideoBanner;