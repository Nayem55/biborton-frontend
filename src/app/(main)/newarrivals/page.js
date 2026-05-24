import NewArrivalsClient from "./NewArrivalsClient";

export const metadata = {
  title: "New Arrivals | Natual Beauty Products Shop Now!",
  description:
    "Discover the newest beauty products and trends at Biborton Fashion World. Update your skincare routine with our latest arrivals.",
  alternates: {
    canonical: "https://biborton.shop/newarrivals",
  },
};

const NewArrivalsPage = () => {
  return <NewArrivalsClient />;
};

export default NewArrivalsPage;
