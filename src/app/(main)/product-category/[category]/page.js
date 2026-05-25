import CategoryPageClient from "./CategoryPageClient";

export const revalidate = 1800;
export const dynamicParams = true;

const API = process.env.NEXT_PUBLIC_API_URL;
const SITE_URL = "https://biborton.shop";
const BRAND_NAME = "Biborton Fashion World";

function formatCategory(value = "") {
  return decodeURIComponent(String(value)).trim().replace(/-/g, " ");
}

async function getCategoryMeta(category) {
  try {
    const res = await fetch(
      `${API}/category-meta?name=${encodeURIComponent(category)}`,
      { next: { revalidate: 1800 } },
    );

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = formatCategory(resolvedParams?.category);

  const meta = await getCategoryMeta(category);

  const title = meta?.meta_title || `${category.toUpperCase()} | ${BRAND_NAME}`;

  const description =
    meta?.meta_description ||
    `Shop ${category} at ${BRAND_NAME}. Discover authentic beauty and collection products at the best price in Bangladesh.`;

  const canonical = `${SITE_URL}/product-category/${encodeURIComponent(
    category,
  )}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BRAND_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const category = formatCategory(resolvedParams?.category);

  return <CategoryPageClient initialCategory={category} />;
}

// Last updated
