import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LimitedEdition = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 14,
    minutes: 52,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#0d0d0d] overflow-hidden py-32">
      <div className="absolute inset-0 z-0">
        <img
          alt="Perfume Silhouette"
          className="w-full h-full object-cover opacity-40 brightness-50"
          // src="https://luvit.com.bd/wp-content/uploads/2026/01/WhatsApp_Image_2026-01-15_at_10.38.27_AM__1_-removebg-preview.png"
          src="https://luvit.com.bd/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-17-at-12.41.26-PM-2.jpeg"
          //   src="https://luvit.com.bd/wp-content/uploads/2026/01/WhatsApp_Image_2026-01-15_at_10.38.27_AM-removebg-preview.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        <span className="  text-[#D4AF34] uppercase tracking-[0.6em] text-[10px] font-bold mb-6 block">
          Upcommitg 2026
        </span>
        {/* <h2 className="serif-text text-white text-5xl md:text-7xl mb-12 italic">
          L'Obscurité
        </h2> */}
        <h2 className="serif-text text-white text-5xl md:text-7xl mb-12 italic">
          Strike series
        </h2>

        <div className="flex justify-center gap-8 md:gap-16 mb-16">
          <div className="text-center">
            <div className="serif-text text-4xl md:text-5xl text-white font-light">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-2">
              Days
            </div>
          </div>
          <div className="text-center">
            <div className="serif-text text-4xl md:text-5xl text-white font-light">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-2">
              Hours
            </div>
          </div>
          <div className="text-center">
            <div className="serif-text text-4xl md:text-5xl text-white font-light">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-2">
              Mins
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <p className="text-gray-400 mb-8 text-sm tracking-wide leading-relaxed italic">
            Launching soon: the Strike Series and MR15 Series perfumes, crafted
            for a refined and lasting impression.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button className="border border-white/30 hover:border-white text-white px-12 py-4 rounded-full uppercase tracking-[0.2em] text-[10px] font-bold transition-all w-full sm:w-auto">
              Notify Me
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LimitedEdition;
