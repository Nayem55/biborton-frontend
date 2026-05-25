import { motion } from "framer-motion";

const ComingSoonSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

        {/* Subtle Radial Gradient for Depth */}
        <div className="absolute inset-0 bg-gradient-radial from-gray-800/20 via-transparent to-black/50"></div>

        {/* Soft Lighting Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-gray-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-l from-yellow-600/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="inline-block mb-12"
        >
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-yellow-600/20 rounded-full blur-lg"></div>

            {/* Badge */}
            <div className="mt-8 relative bg-gradient-to-r from-gray-900 to-black border border-gray-700/50 rounded-full px-8 py-3 backdrop-blur-sm">
              <span className="text-gray-300 text-xs uppercase tracking-[0.4em] font-medium">
                Coming Soon
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="serif-text text-6xl md:text-8xl lg:text-9xl font-light text-white mb-8 leading-tight tracking-tight"
        >
          Launching
          <br />
          <span className="bg-gradient-to-r from-gray-300 via-yellow-600 to-gray-400 bg-clip-text text-transparent">
            Soon
          </span>
        </motion.h1>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            The <span className="text-gray-200 font-medium">Strike Series</span>{" "}
            and <span className="text-gray-200 font-medium">MR15 Series</span>{" "}
            fashions, <br className="hidden md:block" />
            crafted for a refined and lasting impression.
          </p>
        </motion.div>

        {/* Product Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 mb-16"
        >
          {/* Strike Series */}
          <div className="group relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-600/20 to-transparent rounded-2xl blur-xl group-hover:from-yellow-600/20 transition-all duration-700"></div>

            <div className="relative bg-gradient-to-b from-gray-900/50 to-black/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 group-hover:border-gray-700/70 transition-all duration-500">
              {/* Product Silhouette */}
              <div className="w-20 h-32 mx-auto mb-6 relative">
                {/* <div className="border absolute inset-0 bg-gradient-to-b from-gray-600/30 to-gray-800/50 rounded-lg"></div> */}
                <img
                  src="https://luvit.com.bd/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-15-at-10.38.27-AM-2.jpeg"
                  alt=""
                  className="border absolute inset-0 bg-gradient-to-b from-gray-600/30 to-gray-800/50 rounded-lg"
                ></img>
                <div className=" absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gradient-to-b from-gray-400/50 to-gray-600/30 rounded-sm"></div>
                <div className=" absolute bottom-3 left-1/2 transform -translate-x-1/2">
                  <div className="text-xs text-gray-400 font-medium tracking-wider">
                    STRIKE
                  </div>
                </div>
              </div>

              <h3 className="serif-text text-xl text-gray-200 mb-2 font-light">
                Strike Series
              </h3>
              <p className="text-gray-500 text-sm uppercase tracking-[0.2em]">
                Bold Intensity
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

          {/* MR15 Series */}
          <div className="group relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-600/20 to-transparent rounded-2xl blur-xl group-hover:from-yellow-600/20 transition-all duration-700"></div>

            <div className="relative bg-gradient-to-b from-gray-900/50 to-black/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 group-hover:border-gray-700/70 transition-all duration-500">
              {/* Product Silhouette */}
              <div className="w-20 h-32 mx-auto mb-6 relative">
                {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-600/30 to-gray-800/50 rounded-lg"></div> */}
                <img
                  src="https://luvit.com.bd/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-15-at-10.38.26-AM.jpeg"
                  alt=""
                  className="absolute inset-0 bg-gradient-to-b from-gray-600/30 to-gray-800/50 rounded-lg"
                ></img>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gradient-to-b from-gray-400/50 to-gray-600/30 rounded-sm"></div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                  <div className="text-xs text-gray-400 font-medium tracking-wider">
                    MR15
                  </div>
                </div>
              </div>

              <h3 className="serif-text text-xl text-gray-200 mb-2 font-light">
                MR15 Series
              </h3>
              <p className="text-gray-500 text-sm uppercase tracking-[0.2em]">
                Refined Elegance
              </p>
            </div>
          </div>
        </motion.div>

        {/* Subtle Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 text-gray-500 text-sm mb-5">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-600"></div>
            <span className="uppercase tracking-[0.3em] font-light">
              Exclusive Preview
            </span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-600"></div>
          </div>
        </motion.div>
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-600/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default ComingSoonSection;
