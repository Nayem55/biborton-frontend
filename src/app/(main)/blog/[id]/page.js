import BlogClient from "./BlogClient";
import Head from "next/head";

// We can try to fetch individual blog data for metadata if an API endpoint exists
// Otherwise we might have to rely on a generic title or client side update (which next.js doesn't love for SEO)
// For now, let's just render the client component.
// Note: If we really want SEO for this dynamic page without server fetching,
// we would need to fetch the data here in `generateMetadata`.
// Assuming we can't easily fetch single blog by ID without Context (which is client side),
// we might lose specific SEO title in SSR unless we refactor to fetch here.
// Let's stick to migration first.

export async function generateMetadata({ params }) {
  return {
    title: "Blog Details - Biborton Fashion World",
    description: "Read our latest blog post.",
  };
}

const BlogPage = ({ params }) => {
  return <BlogClient params={params} />;
};

export default BlogPage;
