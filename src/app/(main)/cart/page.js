import CartPage from './../../../Pages_old/CartPage/CartPage';

export const metadata = {
  title: 'Shopping Cart | MYNT ',
  description: 'Review your shopping cart and proceed to checkout.',
  robots: {
    index: false, // Don't index cart pages
    follow: true,
  },
};

export default function Cart() {
  return <CartPage />;
}
