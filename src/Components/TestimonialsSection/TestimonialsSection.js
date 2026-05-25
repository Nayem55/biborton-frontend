import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "Nuit Rouge has become my signature. A collection that doesn't just trail—it commands the room with absolute silence.",
      name: "Julian V.",
      role: "Architect",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBtC67KHhaiMVRP82aNvkqFmr-Yj78TPS_cl87p5RqBc36N_Fd8QQOVLq1T57BfB3oWT63V0I_vV99nEI2d9ctMhfxxFegSddzYysO3yIHnDY7FeU9IwuzXqnoZ4-mFjbztEhPz83ys7ZgX3ztdss2Y-8TxLpwh1fyG3FsjTugAwyXqtSkxpKVHMxITTaDl5NbDSkoG8eLzuXmzGyFUjoACXvEA3DWGD-h8-xSgUx3EH4Q_ZpA383l082DEm53uwZJOvDnAzIvM1QTv",
    },
    {
      quote:
        "The unboxing experience is art. But the scent—Ethereal Gold—is a spiritual experience. Subtle yet commanding.",
      name: "Elena R.",
      role: "Creative Director",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBneifQdER6xWzDyPksIDXibiSFJtZ_qB4iG5n1cUqhEOiU2Y9Vf564pBqRCEfLotck46_QBMvIO-PmfQRCmcLD6dKRgaMBclgNlzdEAY67uLKvb94y8M4iSMxYDHiA9h57VTTmM9wOE-dR13WJ9bdQipnvF4qS2WontEaSKwhX9yvTinRDNE_ZJwvO566KzlMEA3evv7frSodeajIDRn0583_UZ68sOX1Efu0V_8GnslzlCn4ayDUN0AFcJ4r8eTSDzaLQeuhT4_hR",
    },
    {
      quote:
        "biborton has redefined what luxury means to me. The complexity of the base notes is unlike any other house in Paris.",
      name: "Marcus L.",
      role: "Sommelier",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCjq_Qk3a9z493-R-_nwm6wGsVLikyowBJiKpzovGbURyLLiATPGThtGYubZ-mRQdVGg64meVfxo-pqJg0ZNmEPYx6hlawTO6_d3hemgDmthLjL8NPw4WPBCd80v6fXn75rKQV8ZhprkEHhXaC-5XzQlQpFQYBoKKgkhep3hQM99o73g0MEsxjv9jNu5-0v80qCmjyRP0p0Jp0h4v8rbZMKrVH_gg1POxDLoFgKOu80BSa0mwlbUVMh3nLVtvbJdBofSVX_pMhXbKYy",
    },
  ];

  return (
    <section className="py-32 bg-white dark:bg-background-dark">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="serif-text text-4xl md:text-5xl text-center mb-24 italic font-light tracking-tight"
        >
          Voices of the Private Circle
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center px-4"
            >
              <div className="flex justify-center gap-1 text-gold mb-8 opacity-60">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className=" serif-text text-2xl italic text-gray-800  mb-10 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex flex-col items-center">
                <div className="w-14  rounded-full bg-gray-200 overflow-hidden mb-4 border border-black/5">
                  <img
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    src={testimonial.image}
                  />
                </div>
                <p className="font-bold text-xs tracking-widest uppercase">
                  {testimonial.name}
                </p>
                <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
