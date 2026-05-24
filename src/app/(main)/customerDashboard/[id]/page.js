import OrderDetailsClient from "./OrderDetailsClient";

export const metadata = {
  title: "Order Details - JBiborton Fashion World",
  description: "View order details",
};

const OrderDetailsPage = ({ params }) => {
  return <OrderDetailsClient params={params} />;
};

export default OrderDetailsPage;
