import Image from "next/image";
import Link from "next/link";

const HomeAboutUpdated = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 pt-5 md:pt-24 ">
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-center">
        {/* Left Image on large, Bottom Image on mobile */}
        <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-[500px] flex justify-center ">
          <Image
            src="https://luvit.com.bd/wp-content/uploads/2026/02/Snapinsta.app_.webp"
            alt="Miss biborton Mystique"
            width={480}
            height={480}
            className="shadow-lg"
          />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center px-6 md:px-16">
          <h2 className="text-2xl md:text-2xl lg:text-3xl font-serif font-bold mb-6 uppercase">
            collection That Defines You
          </h2>

          <p className="text-gray-700 max-w-md mb-10 leading-relaxed">
            Our collections are thoughtfully crafted to symbolize confidence and
            individuality.
          </p>

          <Link
            href="/about"
            className="bg-gray-800 hover:bg-black text-white px-10 py-2 transition mb-10 md:mb-0"
          >
            See more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutUpdated;
