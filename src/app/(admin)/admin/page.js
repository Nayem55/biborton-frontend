import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "Products - Admin Dashboard",
  description: "Manage products",
  robots: {
    index: false,
    follow: false,
  },
};

// Don't cache admin pages
export const dynamic = 'force-dynamic';

const ProductsPage = () => {
  return <ProductsClient />;
};

export default ProductsPage;
