// app/shop/page.js
import Shop from "../../../Pages_old/Shop";

const API =
  process.env.NEXT_PUBLIC_API_URL || "https://biborton-server.vercel.app";

async function safeJSON(url) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function getShopProductCount() {
  const data = await safeJSON(`${API}/shopProductCount`);
  return data?.count || 0;
}

async function getShopProducts(page = 0) {
  const data = await safeJSON(`${API}/shop?page=${page}`);
  return Array.isArray(data) ? data : [];
}

export async function generateMetadata() {
  return {
    title: "Shop - Biborton Fashion World",
    description:
      "Shop Junaid Jamshed collections , attars, body sprays, and premium collections in Bangladesh. Explore best sellers, new arrivals, and exclusive collections.",
    alternates: { canonical: "https://biborton.shop/shop" },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      title: "Shop All collections | ",
      description:
        "Discover the complete collection of Junaid Jamshed collections and collections in Bangladesh.",
      url: "https://biborton.shop/shop",
    },
  };
}

export default async function ShopPage() {
  const [count, initialProducts] = await Promise.all([
    getShopProductCount(),
    getShopProducts(0),
  ]);

  const initialPageCount = Math.ceil(count / 50);

  return (
    <>
      <h1 className="sr-only">biborton fashions & collections</h1>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Junaid Jamshed collections Shop",
            description:
              "Shop all fashions and collections from Junaid Jamshed Bangladesh",
            itemListElement: (initialProducts || []).map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://biborton.shop/product/${product?.slug || ""}`,
            })),
          }),
        }}
      />

      <Shop
        initialProducts={initialProducts}
        initialPageCount={initialPageCount}
      />
    </>
  );
}
