"use client";

import Image from "next/image";

const GallerySection = () => {
  const items = [
    {
      id: 1,
      title: "Premium Japani Silk Saree",
      desc: "Elegant Japanese silk saree with a soft texture and luxurious traditional look for any occasion.",
      img: "https://api.confidenceresellerbd.com/media/product_thumbnails/17784857799746.jpg",
    },

    {
      id: 3,
      title: "Dhupiyan Silk Tangail Saree",
      desc: "Classic Tangail saree crafted with premium Dhupiyan silk for a graceful and timeless appearance.",
      img: "https://api.confidenceresellerbd.com/media/product_thumbnails/17717412412663.jpg",
    },

    {
      id: 4,
      title: "Digital Printed Three Pieces",
      desc: "Stylish three-piece dress set featuring modern digital prints and comfortable everyday fabric.",
      img: "https://api.confidenceresellerbd.com/media/product_thumbnails/17778748984019.jpg",
    },

    {
      id: 2,
      title: "Premium Party Wear Lehenga",
      desc: "Beautiful party wear lehenga designed with elegant detailing for weddings and festive celebrations.",
      img: "https://api.confidenceresellerbd.com/media/product_thumbnails/17680270402433.jpg",
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
            <div className="relative w-full h-[250px] rounded-md overflow-visible">
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