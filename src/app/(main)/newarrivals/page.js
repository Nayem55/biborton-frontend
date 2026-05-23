import NewArrivalsClient from "./NewArrivalsClient";

export const metadata = {
  title: "New Arrivals | Natual Beauty Products Shop Now!",
  description: "Discover the newest beauty products and trends at MYNT Beauty and Fragrance. Update your skincare routine with our latest arrivals.",
  alternates: {
      canonical: "https://themynt.shop/newarrivals",
  }
};

const NewArrivalsPage = () => {
  return <NewArrivalsClient />;
};

export default NewArrivalsPage;
