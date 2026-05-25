import React from "react";

export const metadata = {
  title: "Biborton| Multi Brand fashion Shop in Bangladesh",
  description:
    "Biborton Fashion World is a trusted multi-brand fashion store in Bangladesh offering authentic collections from brands like JDot, biborton and more.",
};

const AboutUs = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6 text-center">
        About Biborton Fashion World
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        <strong>Biborton Fashion World</strong> is a trusted multi-brand fashion
        shop in Bangladesh where fashion lovers can discover authentic and
        premium collections from top international and local brands. Our goal is
        to make high-quality collections easily accessible to everyone who loves
        smelling great and expressing their personality through scent.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        At Biborton Fashion World, we carefully select collections from renowned
        brands such and popular fashion houses. Every product available on our
        website or shop is chosen for its quality, uniqueness, and long-lasting
        scent.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Our mission is to become one of the most reliable online fashion stores
        in Bangladesh by providing genuine products, competitive prices, and a
        smooth shopping experience. We believe that the right collection can
        boost confidence and leave a lasting impression.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Why Choose Biborton Fashion World?
      </h2>

      <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
        <li>Authentic and premium fashion collections</li>
        <li>Popular international and local brands</li>
        <li>Affordable prices for fashion lovers</li>
        <li>Carefully curated fashion collection</li>
        <li>Easy and secure online shopping in Bangladesh</li>
      </ul>

      <p className="text-lg text-gray-700 leading-relaxed mt-8">
        Whether you are looking for everyday wear, a signature style, or a
        special outfit for an occasion, <strong>Biborton Fashion World</strong>{" "}
        is here to help you find the perfect fashion that matches your style and
        personality.
      </p>
    </section>
  );
};

export default AboutUs;
