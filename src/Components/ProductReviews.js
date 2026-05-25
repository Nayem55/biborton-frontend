import React from "react";

// TypeScript types
export type Review = {
  product: string;
  body: string;
  name: string;
  city: string;
  rating: 1 | 2 | 3 | 4 | 5;
  img?: string;
};

const reviews: Review[] = [
  {
    product: "Apple Cider + Salicylic Acid Anti‑Dandruff Shampoo",
    body:
      "My scalp used to feel itchy by mid‑day. After two washes with this shampoo, flakes reduced and my hair feels cleaner for longer. Love the mild collection too!",
    name: "Sadia Islam",
    city: "Dhaka",
    rating: 5,
    img: "https://i.ibb.co.com/vvh9Qy0W/download-2.jpg",
  },
  {
    product: "Keratin & Biotin Damage‑Repair Conditioner",
    body:
      "Split ends looked smoother within a week and blow‑dry time feels shorter. Hair looks glossy without feeling heavy—so good!",
    name: "Tasnim Ahmed",
    city: "Chattogram",
    rating: 5,
    img: "https://i.ibb.co.com/Ps2xpkqF/download.jpg",
  },
  {
    product: "Vitamin C Brightening Face Wash",
    body:
      "Gentle on my sensitive skin and gives a fresh glow. No dryness at all—even when I use it twice a day.",
    name: "Farzana Rahman",
    city: "Sylhet",
    rating: 5,
    img: "https://i.ibb.co.com/7NzHx75g/download-1.jpg",
  },
];

const StarRow: React.FC<{ rating: Review["rating"] }> = ({ rating }) => (
  <div className="flex items-center gap-1 text-amber-500" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 20 20"
        className={`h-5 w-5 ${i < rating ? "fill-current" : "fill-gray-200"}`}
        aria-hidden="true"
      >
        <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
      </svg>
    ))}
  </div>
);

const Avatar: React.FC<{ name: string; img?: string }> = ({ name, img }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
  if (img && img.trim().length > 0) {
    return (
      <img
        src={img}
        alt={`${name} – reviewer profile`}
        className="h-20 w-20 rounded-2xl object-cover ring-4 ring-sky-200"
        loading="lazy"
      />
    );
  }
  return (
    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 grid place-items-center ring-4 ring-sky-200">
      <span className="text-white font-semibold text-xl">{initials}</span>
    </div>
  );
};

const ReviewCard: React.FC<Review> = ({ product, body, name, city, rating, img }) => (
  <article className="bg-white/90 backdrop-blur border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-3xl p-6 flex flex-col gap-4">
    <div className="flex items-center gap-4">
      <Avatar name={name} img={img} />
      <StarRow rating={rating} />
    </div>

    <h3 className="text-xl font-semibold text-gray-900">{product}</h3>

    <p className="text-gray-600 leading-relaxed">{body}</p>

    <div className="mt-2 text-right">
      <p className="text-sky-600 font-semibold">— {name}</p>
      <p className="text-gray-500 text-sm">{city}</p>
    </div>
  </article>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <header className="text-center max-w-2xl mx-auto mb-10">
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{title}</h2>
    {subtitle && <p className="mt-3 text-gray-600">{subtitle}</p>}
  </header>
);

const ProductReviews: React.FC = () => {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-white to-sky-50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="What Our Customers Say"
          subtitle=""
        />

        <div className="grid gap-6 md:gap-8 md:grid-cols-1 lg:grid-cols-3">
          {reviews.map((r, idx) => (
            <ReviewCard key={idx} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
