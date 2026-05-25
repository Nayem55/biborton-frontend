"use client";

import Image from "next/image";

const MssArmaf = () => {
  const items = [
    {
      id: 1,
      title: "Home Decor Set 1",
      desc: "Thoughtful gifts for the ones who make it all happen.",
      img: "https://api.confidenceresellerbd.com/media/product_thumbnails/17558619276483.jpg",
    },
    {
      id: 2,
      title: "Home Decor Set 2",
      desc: "Classic lighting set for your room",
      img: "https://api.confidenceresellerbd.com/media/product_thumbnails/17349550584759.webp",
    },
    {
      id: 3,
      title: "Makeup Brush Set 1",
      desc: "All Women’s must-haves, all in one place.",
      img: "https://api.confidenceresellerbd.com/media/product_thumbnails/17384078343743.jpg",
    },
    {
      id: 4,
      title: "Makeup Brush Set 2",
      desc: "Gifts Women will love. (Your wallet will too!).",
      img: "https://api.confidenceresellerbd.com/media/product_thumbnails/17384078765885.jpg",
    },
  ];

  return (
    <div className="w-full bg-[#fdf1f2] py-14">
      <h2 className="text-center text-gray-950 text-3xl font-bold mb-12">
        Value Sets You'll Love
      </h2>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-1">
        {items.map((item) => (
          <div key={item.id} className="cursor-pointer">
            {/* Image */}
            <div className="relative w-full h-[220px] rounded-md overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                title={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                quality={60}
                className="object-cover"
              />
            </div>

            {/* Text */}
            <h3 className="text-lg font-bold mt-4">{item.title}</h3>
            <p className="text-sm text-gray-700 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MssArmaf;
