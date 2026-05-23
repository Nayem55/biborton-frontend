"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Welcome to our Private Circle!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#181111",
          color: "#fff",
        },
      });
      setEmail("");
    }
  };

  return (
    <section className="py-32  ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 text-center max-w-3xl"
      >
        <h2 className="serif-text text-4xl md:text-4xl mb-8 leading-tight">
          BE THE CONNECT
        </h2>
        <p className="text-gray-700 mb-10  text-base font-light">
          Be the first to experience our limited reserves and private events.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
        >
          <input
            className="flex-1 border border-gray-700   px-10 py-3  focus:border-gray-500 shadow-sm"
            placeholder="Your Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="hover:bg-black hover:text-white border border-gray-700  px-12 py-3  uppercase tracking-widest text-xs font-bold hover:shadow-2xl transition-all"
            type="submit"
          >
            Notify Me
          </button>
        </form>
        <p className="mt-8 text-[9px] text-gray-400 uppercase tracking-[0.3em]">
          By joining, you agree to our terms of exclusivity.
        </p>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
