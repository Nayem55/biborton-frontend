import Header from "../../Components/Header/Header";
import Footer from './../../Pages_old/Shared/Footer/Footer';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
