import BlogsClient from "./BlogsClient";

export const metadata = {
  title: "MYNT| Fragrances |",
  description: "Explore beauty tips, wellness trends, and natural enhancement insights. Stay updated with Earth Beauty and You.",
  alternates: {
      canonical: "https://themynt.shop/blogs",
  }
};

const BlogsPage = () => {
  return <BlogsClient />;
};

export default BlogsPage;
