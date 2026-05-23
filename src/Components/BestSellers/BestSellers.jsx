import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

const BestSellers = () => {
  const products = [
    {
      name: "Mushfiqur Rahim Bold MR 15",
      type: "J. Junaid Jamshed Parfume",
      price: "BDT  5490",
      url: "product/mushfiqur-rahim-bold-mr-15",
      image:
        // "https://luvit.com.bd/wp-content/uploads/2026/02/61.webp",
        "https://luvit.com.bd/wp-content/uploads/2026/03/Armaf-product-phorography-secound-round-5.png",
    },
    {
      name: "Club De Nuit Woman 105ML",
      type: "ARMAF Parfum",
      price: "BDT 5490",
      url: "/product/club-de-nuit-woman-105ml",
      image:
        // "https://luvit.com.bd/wp-content/uploads/2026/02/69.jpg",
        "https://luvit.com.bd/wp-content/uploads/2026/03/Armaf-product-phorography-secound-round-4.png",
    },
    {
      name: "Club De Nuit Intense Man",
      type: "ARMAF Parfum",
      price: "BDT 7979",
      url: "/product/club-de-nuit-intense-m",
      image:
        // "https://luvit.com.bd/wp-content/uploads/2026/01/MR-15-Bold.jpeg",
        "https://luvit.com.bd/wp-content/uploads/2026/03/Armaf-product-phorography-secound-round-3.png",
    },
    {
      name: "Mushfiqur Rahim MR 15 100 ML",
      type: "J. Junaid Jamshed Parfum",
      price: "BDT  5490",
      url: "/product/mushfiqur-rahim-mr-15",
      image:
        // "https://luvit.com.bd/wp-content/uploads/2026/01/MR-15.jpeg",
        "https://luvit.com.bd/wp-content/uploads/2026/03/Armaf-product-phorography-secound-round-2.png",
    },
  ];
  // const products = [
  //   {
  //     name: "Zarar 100 ML",
  //     type: "J. Junaid Jamshed Parfum",
  //     price: "BDT 3990",
  //     image:
  //       "https://luvit.com.bd/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-17-at-12.58.59-PM-2.jpeg",
  //   },
  //   {
  //     name: "Janan Gold 100 ML",
  //     type: "J. Junaid Jamshed Parfum",
  //     price: "BDT 3990",
  //     image:
  //       "https://luvit.com.bd/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-17-at-12.39.35-PM.jpeg",
  //   },
  //   {
  //     name: "Zarar Gold 100 ML",
  //     type: "J. Junaid Jamshed Parfum",
  //     price: "BDT 3990",
  //     image:
  //       "https://luvit.com.bd/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-17-at-12.58.59-PM-3.jpeg",
  //   },
  //   {
  //     name: "Uroosa 50 ML",
  //     type: "J. Junaid Jamshed Parfum",
  //     price: "BDT 3990",
  //     image:
  //       "https://luvit.com.bd/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-17-at-12.58.59-PM.jpeg",
  //   },
  // ];

  const handleAddToBag = (productName) => {
    toast.success(`${productName} added to bag!`, {
      duration: 3000,
      position: "top-center",
      style: {
        background: "#181111",
        color: "#fff",
      },
    });
  };

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4">
            Best Sellers
          </span>
          <h2 className="serif-text text-2xl uppercase md:text-3xl">Most Popular</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group rounded-md"
            >
              <div className="aspect-[4/5] bg-ivory dark:bg-[#221a1b] overflow-hidden mb-6 relative">
                <Image
                  alt={product.name}
                  src={product.image}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                  quality={85}
                />
                <div className="absolute bottom-0  inset-x-0  pb-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full  border-black bg-black text-white py-3 uppercase tracking-[0.2em] text-[9px] font-bold shadow-xl hover:bg-black hover:text-white transition-colors">
                    <Link className=" " href={product.url}>
                      View Details
                    </Link>
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="serif-text text-lg">{product.name}</h3>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest">
                  {product.type}
                </p>
                <p className="font-bold text-sm tracking-tight ">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


      
      <div className="mt-40 flex justify-center relative ">
        <Image
          className="max-w-full h-auto"
          // src="https://luvit.com.bd/wp-content/uploads/2026/02/armaf_banner.webp"
          // src="https://luvit.com.bd/wp-content/uploads/2026/02/armaf-club-de-nuit-intense-edt-vs-pure-parfum-675901.webp"
          src="https://luvit.com.bd/wp-content/uploads/2026/02/SHK_4.webp"
          alt="Armaf Perfume"
          width={5120}
          height={400}
          loading="lazy"
          quality={85}
          sizes="100vw"
        />
        {/* Overlay Text */}
        <div className="absolute text-center sm:text-left left-5 top-6 sm:top-[30%] md:top-[40%] text-white px-4 ">
          {/* <h1 className="text-2xl md:text-4xl font-bold mb-4">CLUB DE NUIT</h1> */}
          <h1 className="text-2xl md:text-4xl font-bold mb-4">ARMAF SHK</h1>
          <p className="text-base mb-6 ">
            Discover a line defined by confidence and quiet mastery. Find
            your story.
          </p>
          <Link
            href={"/shop"}
            className=" text-white text-base border hidden md:block border-white hover:text-black px-6 py-2 md:py-4 font-light hover:bg-gray-200 transition"
          >
            EXPLORE COLLECTION
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;