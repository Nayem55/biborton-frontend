import React, { useState } from "react";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const SkinTips = () => {
  const [translate, setTranslate] = useState(true);

  // Blog posts list (easier to maintain)
  const blogPosts = [
    {
      id: "653644b0cfa28b8acca14f05",
      img: "https://luvit.com.bd/wp-content/uploads/2024/01/07.-Blog-Image.jpg",
      alt: "Why pimples occur and solutions",
      title_en:
        "Why do pimples occur, and what should be done if pimples occur?",
      title_bn: "ব্রণ কেন হয় এবং ব্রণ হলে কি ব্যাবহার করবো?",
    },
    {
      id: "653644b0cfa28b8acca14f06",
      img: "https://luvit.com.bd/wp-content/uploads/2024/01/09.-Blog-Image.jpg",
      alt: "Vitamin C Face Wash benefits",
      title_en: "Vitamin C Face Wash and Junaid Jamshed collections.",
      title_bn: "ভিটামিন সি ফেসওয়াশ এবং আর্থ বিউটি অ্যান্ড ইউ",
    },
    {
      id: "653644b0cfa28b8acca14f07",
      img: "https://luvit.com.bd/wp-content/uploads/2024/01/WhatsApp-Image-2023-03-01-at-5.15.23-PM.jpeg",
      alt: "Brightening skincare solution",
      title_en:
        "Solution for Brightening: Junaid Jamshed collections Milk Face Wash.",
      title_bn: "ব্রাইটেনিং এর সলিউশনে আর্থ বিউটি অ্যান্ড ইউ মিল্ক ফেসওয়াশ",
    },
  ];

  return (
    <section
      className="flex flex-col items-center px-[10px] pt-10 2xl:px-[18%] xl:px-[15%] mx-auto relative"
      aria-label="Natural skincare tips and blog section"
    >
      {/* ✅ Main Section Heading */}
      <h5 className="text-center text-accent font-bold text-3xl mt-10">
        Want Natural Skincare Tips?
      </h5>
      <div className="w-[130px] mx-auto h-1 bg-accent my-6 mb-10"></div>

      {/* ✅ Language Toggle */}
      {/* <button
        onClick={() => setTranslate(!translate)}
        className="mb-6 px-4 py-2 text-white bg-accent rounded hover:bg-secondary transition"
      >
        {translate ? "বাংলা দেখুন" : "See English"}
      </button> */}

      {/* ✅ Blog Post Grid */}
      <div className="flex flex-col sm:flex-row justify-center gap-10 flex-wrap">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="w-[350px] shadow-2xl shadow-[#d1edec] border-4 border-accent p-6 rounded flex flex-col items-center bg-white"
          >
            <Link href={`/blog/${post.id}`}>
              <LazyLoadImage
                src={post.img}
                alt={post.alt}
                className="w-full rounded"
                effect="blur"
              />
            </Link>
            <h4 className="font-bold my-4 text-accent text-center text-lg">
              {translate ? post.title_en : post.title_bn}
            </h4>
          </article>
        ))}
      </div>

      {/* ✅ View All Blogs Button */}
      <Link
        href="/blogs"
        className="flex rounded justify-center my-16 bg-accent text-white hover:text-primary w-[200px] mx-auto py-2 hover:bg-secondary ease-in-out duration-200"
      >
        See All
      </Link>

      {/* ✅ JSON-LD Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Skincare Tips",
          itemListElement: blogPosts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://biborton.shop/blog/${post.id}`,
            name: post.title_en,
            image: post.img,
          })),
        })}
      </script>
    </section>
  );
};

export default SkinTips;
