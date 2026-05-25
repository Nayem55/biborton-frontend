import SearchPageClient from "./SearchPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const searchTextRaw = resolvedParams?.searchText ?? "";
  const searchText = decodeURIComponent(String(searchTextRaw));

  return {
    title: `Search Results for "${searchText}" - collections`,
    description: `Search results for ${searchText}`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage({ params }) {
  const resolvedParams = await params;

  const searchTextRaw = resolvedParams?.searchText ?? "";
  const searchText = decodeURIComponent(String(searchTextRaw));

  return <SearchPageClient searchText={searchText} />;
}
