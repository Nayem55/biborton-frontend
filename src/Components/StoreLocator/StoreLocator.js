import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, MapPinned } from "lucide-react";
import Link from "next/link";

const StoreLocator = () => {
  const stores = [
    {
      city: "Bashundhara City",
      address: "SHOP# 46 , LEVEL 03 , BLOCK - B , PANTHAPATH",
    },
    { city: "Banani", address: "HOUSE 70/D , BLOCK - D , ROAD# 11 , BANANI" },
    {
      city: "Mirpur",
      address: "NUR ISLAM MOLLAH AVENUE, SHOP# 05, GROUND FLOOR, MIRPUR-12",
    },
  ];

  const stores2 = [
    {
      city: "CHATTOGRAM",
      address: "SHOP 204, LEVEL 02, 2 NO GATE, 5 CDA AVENUE, FINLAY SQUARE",
    },
    {
      city: "UTTARA",
      address: "SHOP G-12, SECTOR 3, ROAD 2, NIGAR PLAZA, UTTARA",
    },
    {
      city: "JAMUNA FUTURE PARK",
      address: "SHOP GA-045B, GROUND FLOOR, NEAR WEST COURT",
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-6 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-2">
            Store Locator
          </h2>

          <h2 className="text-xl md:text-3xl lg:text-4xl uppercase tracking-wider">
            Visit Our Shop
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 md:gap-20 max-w-5xl mx-auto">
          {/* Column 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6  md:space-y-12">
              {stores.map((store, index) => (
                <div
                  key={index}
                  className="flex justify-between items-end border-b border-black/10 pb-4 md:pb-6 group cursor-pointer"
                >
                  <div className="pr-2">
                    <h3 className=" text-sm md:text-lg mb-1 uppercase">
                      {store.city}
                    </h3>

                    <p className="text-[9px] md:text-xs uppercase tracking-widest text-gray-500 leading-relaxed">
                      {store.address}
                    </p>
                  </div>

                  <Link href="/malls">
                    <ArrowUpRight
                      className="text-black hidden md:block  transition-transform group-hover:translate-x-1"
                      size={18}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6 md:space-y-12">
              {stores2.map((store, index) => (
                <div
                  key={index}
                  className="flex justify-between items-end border-b border-black/10 pb-4 md:pb-6 group cursor-pointer"
                >
                  <div className="pr-2">
                    <h3 className=" text-sm md:text-lg mb-1 uppercase">
                      {store.city}
                    </h3>

                    <p className="text-[9px] md:text-xs uppercase tracking-widest text-gray-500 leading-relaxed">
                      {store.address}
                    </p>
                  </div>

                  <Link href="/malls">
                    <ArrowUpRight
                      className="text-black hidden md:block transition-transform group-hover:translate-x-1 "
                      size={18}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/malls"
            className="px-8 md:px-12 py-3 flex items-center gap-4 uppercase tracking-[0.2em] text-[10px] md:text-[15px]  hover:scale-105 underline transition-all"
          >
            <MapPin></MapPin>
            Find Biborton store
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StoreLocator;
