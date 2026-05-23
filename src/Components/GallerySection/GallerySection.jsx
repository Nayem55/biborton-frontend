"use client";

import Image from "next/image";

const GallerySection = () => {
  const items = [
    {
      id: 1,
      title: "Matte Red Lips",
      desc: "Bold matte color that stays smooth and lasts all day.",
      img: "https://luvit.com.bd/wp-content/uploads/2026/04/flormar-lips-1.png",
      // img: "https://luvit.com.bd/wp-content/uploads/2026/05/flormar-lips-1.png", orginal image, but may be too large for web use. Consider resizing or optimizing.
    },

    {
      id: 3,
      title: "Jdot Perfume",
      desc: "Most popular scent. A blend of fresh citrus, floral notes.",
      // img: "https://luvit.com.bd/wp-content/uploads/2026/04/flormar-lips-1.jpg", original image, but may be too large for web use. Consider resizing or optimizing.
      // img: "https://luvit.com.bd/wp-content/uploads/2026/05/flormar-lips-1.jpg",
      img: "https://i.ibb.co.com/4b72Qrk/jdot-perfume.webp",
    },
    {
      id: 4,
      title: "Armaf Club De Nuit ",
      desc: "A luxurious fragrance with a rich, long-lasting scent.",
      // img: "https://luvit.com.bd/wp-content/uploads/2026/04/flormar-lips-2.jpg", original image, but may be too large for web use. Consider resizing or optimizing.
      // img: "https://luvit.com.bd/wp-content/uploads/2026/05/flormar-lips-2.jpg",
      img: "https://i.ibb.co.com/Ps82014s/armaf-perfume.webp",
    },
        {
      id: 2,
      title: "Glossy Shine",
      desc: "Lightweight gloss that adds shine and keeps lips hydrated.",
      // img: "https://luvit.com.bd/wp-content/uploads/2026/04/flormar-lips-3.jpg", original image, but may be too large for web use. Consider resizing or optimizing.
      img: "https://luvit.com.bd/wp-content/uploads/2026/05/flormar-lips-3.jpg",
    },
  ];

  return (
    <div className="w-full bg-[#f7efe6] py-16">
      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-12 mx-10 md:mx-0">
        The beauty everyone wants, only here
      </h2>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-3 md:px-1">
        {items.map((item) => (
          <div key={item.id} className="cursor-pointer">
            
            {/* Image */}
            <div className="relative w-full h-[210px] rounded-md overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                title={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                quality={60}
                className="object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* Text */}
            <h3 className="text-[17px] font-bold mt-4">{item.title}</h3>

            <p className="text-sm text-gray-700 mt-1 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;