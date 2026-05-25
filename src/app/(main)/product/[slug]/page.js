import ProductDetails from "./../../../../Pages_old/ProductDetails/ProductDetails";

const API = process.env.NEXT_PUBLIC_API_URL;

// ✅ Better caching (SEO + performance)
async function getProduct(slug) {
  const res = await fetch(`${API}/getSingleProduct/${slug}`, {
    next: { revalidate: 60 }, // 🔥 instead of no-store
  });
  if (!res.ok) return null;
  return res.json();
}

async function getFaqs() {
  const res = await fetch(`${API}/getFaqs`, {
    next: { revalidate: 300 },
  });
  return res.ok ? res.json() : [];
}

async function getReviews(productName) {
  if (!productName) return [];

  const res = await fetch(
    `${API}/reviews?productName=${encodeURIComponent(productName)}`,
    {
      next: { revalidate: 120 },
    },
  );

  return res.ok ? res.json() : [];
}

// ✅ SEO Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | Biborton Fashion World",
      description: "Product not found.",
      robots: { index: false, follow: false },
    };
  }

  const stripHTML = (html = "") => html.replace(/<[^>]*>/g, "").trim();

  // ✅ Dynamic Meta Title (priority based)
  const title =
    product?.meta_title ||
    `${product?.name} Price in Bangladesh | Buy Original ${product?.brand || ""} fashion | Biborton`;

  // ✅ Dynamic Meta Description (priority based)
  const description =
    product?.meta_description ||
    stripHTML(product?.short_description || "").slice(0, 160) ||
    `${product?.name} by ${product?.brand || "top brand"} at best price in Bangladesh. Buy original fashion from Biborton Fashion World.`;

  return {
    title,
    description,

    keywords: [
      product?.name,
      `${product?.name} price in Bangladesh`,
      `${product?.brand} product`,
      "buy fashion Bangladesh",
      "original fashion BD",
      "best fashion in bd",
      "best collections in bd",
      "Biborton shop",
      "Biborton bd",
      "Biborton fashion",
      "Biborton beauty products",
    ],

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: `https://biborton.shop/product/${slug}`,
    },

    openGraph: {
      type: "website",
      title: title, // ✅ synced with meta title
      description: description, // ✅ synced
      url: `https://biborton.shop/product/${slug}`,
      siteName: "Biborton Fashion World",
      images: product?.images?.[0]?.src
        ? [
            {
              url: product.images[0].src,
              width: 800,
              height: 800,
              alt: product?.name,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: title, // ✅ synced
      description: description, // ✅ synced
      images: product?.images?.[0]?.src ? [product.images[0].src] : [],
    },
  };
}

// ✅ Page Component
export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  const product = await getProduct(slug);
  if (!product) return <div className="p-10">Product not found.</div>;

  const [faqs, initialReviews] = await Promise.all([
    getFaqs(),
    getReviews(product?.name),
  ]);

  // ✅ Structured Data (VERY IMPORTANT 🔥)
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product?.name,
    image: product?.images?.map((img) => img.src),
    description: product?.meta_description || product?.short_description,
    brand: {
      "@type": "Brand",
      name: product?.brand || "Biborton",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: Number(
        product?.on_sale ? product?.sale_price : product?.regular_price,
      ),
      availability:
        product?.stock_status === "outofstock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: `https://biborton.shop/product/${slug}`,
    },
    aggregateRating:
      initialReviews?.length > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: "4.5",
            reviewCount: initialReviews.length,
          }
        : undefined,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://biborton.shop",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Product",
        item: "https://biborton.shop/product",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product?.name,
        item: `https://biborton.shop/product/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd),
        }}
      />

      <ProductDetails
        slug={slug}
        product={product}
        faqs={faqs}
        initialReviews={initialReviews}
      />
    </>
  );
}
