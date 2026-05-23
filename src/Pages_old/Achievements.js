import React from "react";

const Achievements = () => {
  return (
    <section className="bg-gradient-to-r from-red-50 to-gray-100 py-10 sm:py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8 sm:mb-10">
          Awards & Achievements
        </h2>

        {/* Award Card */}
        <article className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-2xl transition duration-300">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            {/* Award Image */}
            <div className="w-full md:w-1/2">
              <div className="relative w-full overflow-hidden rounded-xl">
                <img
                  src="https://luvit.com.bd/wp-content/uploads/2025/08/8e9c20b4-d575-46f9-bcc2-e644849a4936-800x800.jpg"
                  alt="South Asian Business Excellence Awards 2025 trophy and Junaid Jamshed Fragrances branding"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Award Text */}
            <div className="w-full md:w-1/2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3">
                South Asian Business Excellence Awards 2025
              </h3>

              <p className="text-gray-700 leading-relaxed mb-2">
                <span className="inline-block text-xs sm:text-sm font-semibold tracking-wide text-yellow-700 bg-yellow-100 px-2 py-1 rounded-md mr-2">
                  Category
                </span>
                <span className="align-middle">
                  Outstanding Achievement of Rising Star in Personal Care
                  Industry
                </span>
              </p>

              <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4">
                Awarded to <span className="font-semibold">Imtiaz Ahmed</span>,
                Director of{" "}
                <span className="font-semibold">Body &amp; Soul, USA</span>, for
                excellence in driving innovation and growth in the{" "}
                <span className="italic">Earth Beauty &amp; You</span> brand.
              </p>

              <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-5">
                Organized by <span className="font-semibold">Mirror World</span>{" "}
                and powered by{" "}
                <span className="font-semibold">
                  Sandy Homes &amp; Resort Ltd.
                </span>
              </p>

              {/* Extra Professional Text */}
              <div className="space-y-3 sm:space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  This recognition highlights our unwavering commitment to
                  delivering high-quality, sustainable, and innovative personal
                  care solutions that resonate with modern consumers. It
                  reflects the trust and support we’ve received from our
                  customers, partners, and the global business community.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  At <span className="italic">Earth Beauty &amp; You</span>, we
                  combine nature’s best ingredients with science-driven
                  formulations to empower individuals with confidence and care.
                  This award inspires us to keep pushing boundaries and set new
                  standards in beauty and wellness.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Achievements;
