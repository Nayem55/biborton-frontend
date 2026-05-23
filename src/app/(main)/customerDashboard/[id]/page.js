import OrderDetailsClient from "./OrderDetailsClient";

export const metadata = {
  title: "Order Details - JMYNT Beauty and Fragrance",
  description: "View order details",
};

const OrderDetailsPage = ({ params }) => {
  return <OrderDetailsClient params={params} />;
};

export default OrderDetailsPage;
