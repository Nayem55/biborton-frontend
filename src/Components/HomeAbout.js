"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const HomeAbout = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About biborton collections",
    description:
      "biborton (Junaid Jamshed) collections blend tradition and modern elegance to create timeless, long-lasting fashions.",
    url: "https://biborton.shop/about",
    publisher: {
      "@type": "Organization",
      name: "biborton (Junaid Jamshed)",
      logo: "https://biborton.shop/images/logo.png",
    },
  };

  return (
    <section
      className="relative bg-gradient-to-b from-white via-gray-50 to-white sm:py-24"
      aria-labelledby="about-heading"
    >
      {/* SEO Structured Data */}
      <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <LazyLoadImage
              src="https://luvit.com.bd/wp-content/uploads/2026/01/29104039_2116081551955562_4356205025605713920_n-533x800.jpg"
              alt="biborton collections luxury fashion collection"
              effect="blur"
              className="rounded-2xl shadow-2xl max-w-full object-cover"
              width={isDesktop ? 460 : undefined}
              height={isDesktop ? 680 : undefined}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <span className="mb-4 text-xs uppercase tracking-[0.3em] text-secondary/60">
              About the Brand
            </span>

            <h4
              id="about-heading"
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight text-accent"
            >
              collection That <br className="hidden sm:block" /> Defines You
            </h4>

            <div className="mt-6 h-[2px] w-24 bg-accent opacity-70"></div>

            <p className="mt-8 text-lg sm:text-xl leading-relaxed text-secondary/80">
              biborton (Junaid Jamshed) collections are thoughtfully crafted to
              embody elegance, confidence, and individuality. Each creation
              blends premium ingredients with timeless Eastern traditions and
              modern sophistication.
            </p>

            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-secondary/80">
              From fresh citrus openings to deep woody and musky finishes, our
              fashions are designed to leave a lasting impression — refined,
              authentic, and unmistakably yours.
            </p>

            {/* CTA */}
            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-accent px-10 py-3 text-sm font-semibold tracking-widest text-accent transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-lg"
              >
                Discover Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
