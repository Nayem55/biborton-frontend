import { motion } from 'framer-motion';

const ArtisanPathSection = () => {
  return (
    <section className="py-32 grid grid-cols-1 lg:grid-cols-2 bg-ivory dark:bg-background-dark/30 gap-12 lg:gap-0 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 lg:px-24 order-2 lg:order-1"
      >
        <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-8 block">
          The Artisan's Path
        </span>
        <h2 className="serif-text text-5xl md:text-6xl mb-10 leading-tight">
          Mastery in <br />Every Drop
        </h2>
        <div className="space-y-6 text-gray-600  leading-loose text-lg font-light max-w-lg">
          <p>
            Born in the historic hills of Grasse and refined in modern laboratories, J. represents the intersection of ancestral wisdom and contemporary science.
          </p>
          <p>
            Each batch is aged for six months in temperature-controlled oak barrels to reach its peak olfactory expression. We believe in silence, patience, and the uncompromising pursuit of quality.
          </p>
        </div>
        <a
          className="inline-block mt-12 text-gold border-b  pb-2 font-bold uppercase tracking-widest  text-[11px] hover:text-red-600 hover:border-red-600 transition-all"
          href="/#"
        >
          Our Full Craftsmanship Story
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="h-[600px] lg:h-[800px] bg-gray-100 relative overflow-hidden order-1 lg:order-2"
      >
        <img
          alt="Laboratory equipment"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn0vjXxOQpbU99JyI1Xix0xn26hW-mtZSiUpiu_GArF31UuBu5JHUPFlJ2hlRIBPycvF_i1RjdMiNBUdVgrYd4B7Ui6bNTLcf2bf54z5RrNSMxSEFKA5ci7IJHKULD6cPt6NLeX_4xFMKF3xjYluYv2K5yzViLnsY6mzijGvlfShdt_TXaSc5AOmKqZrGk467DCZDil3TtUqThFRGr9KYQkwn32vFHPl2hHcNvOmmcY1qeYnZhsEvUKRu37HgPvV5nr9I0FD-QSKb6"
        />
      </motion.div>
    </section>
  );
};

export default ArtisanPathSection;
