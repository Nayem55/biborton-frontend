import OrdersClient from "./OrdersClient";

export const metadata = {
  title: "Orders - Admin Dashboard",
  description: "Manage orders",
  robots: {
    index: false,
    follow: false,
  },
};

// Don't cache admin pages
export const dynamic = 'force-dynamic';

const OrdersPage = () => {
  return <OrdersClient />;
};

export default OrdersPage;
