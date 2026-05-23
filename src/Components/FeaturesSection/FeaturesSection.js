import { Leaf, Building2, BookOpen, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    { icon: Leaf, text: "Sustainably Sourced" },
    { icon: Building2, text: "Crafted in Grasse" },
    { icon: BookOpen, text: "Heritage Formulas" },
    { icon: CheckCircle, text: "Certified" },
  ];

  return (
    <section className="py-16 bg-white dark:bg-background-dark border-b border-black/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <feature.icon
                className="text-3xl  mb-3 font-light"
                size={32}
                strokeWidth={1}
              />
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
