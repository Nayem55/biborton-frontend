import AddProductClient from "./AddProductClient";

export const metadata = {
  title: "Add Product - Admin Dashboard",
  description: "Add new product",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';

const AddProductPage = () => {
  return <AddProductClient />;
};

export default AddProductPage;
