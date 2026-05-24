import OrderDetailsClient from "./OrderDetailsClient";

export const metadata = {
  title: "Order Details - Biborton ",
  description: "Order Details",
};

const OrderDetailsPage = ({ params }) => {
  return <OrderDetailsClient id={params.id} />;
};

export default OrderDetailsPage;
