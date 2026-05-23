import React, { Suspense, lazy, useEffect, useState, useMemo } from "react";
import "./App.css";
import { ThemeContext } from "./Contexts/ThemeContext";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./Routes/Routes";
import useProduct from "./Hooks/useProduct";
import useCart from "./Hooks/useCart";
import useOrder from "./Hooks/useOrder";
import useScroll from "./Hooks/useScroll";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";
import ReactGA from "react-ga4";
import "swiper/css";

// ReactGA.initialize("G-3G0Q3PYC1F");

// Lazy load Product component
const Product = lazy(() => import("./Components/Shared/Product"));

function App() {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [products, loadingProducts] = useProduct();
  const [cart, setCart] = useCart(products);
  const [orderList, setOrderList] = useOrder();
  const [scrollPosition] = useScroll();
  const [searchText, setSearchText] = useState("");
  const [Perfume, setPerfume] = useState([]);
  const [bodyspray, setBodyspray] = useState([]);
  // new
  const [ChosenForYou, setChosenForYou] = useState([]);
  const [MostFavorite, setMostFavorite] = useState([]);
  const [premium, setpremium] = useState([]);
  const [flormar, setflormar] = useState([]);

  const [nudeMakeup, setNudeMakeup] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [allOrder, setAllOrder] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);

  useEffect(() => {
    // Fetch admin status
    const fetchAdminStatus = async () => {
      setIsAdminLoading(true);
      try {
        let isAdminFromPhone = false;
        let isAdminFromEmail = false;

        if (user?.phoneNumber) {
          const response = await fetch(
            `http://localhost:3200/users/admin/${user.phoneNumber}`,
          );
          const data = await response.json();
          isAdminFromPhone = data.isAdmin;
        }

        if (user?.email) {
          const response = await fetch(
            `http://localhost:3200/users/admin1/${user.email}`,
          );
          const data = await response.json();
          isAdminFromEmail = data.isAdmin;
        }

        setIsAdmin(isAdminFromPhone || isAdminFromEmail);
      } catch (error) {
        console.error("Error fetching admin status:", error);
      } finally {
        setIsAdminLoading(false);
      }
    };

    fetchAdminStatus();
  }, [user]);

  useEffect(() => {
    // Fetch initial data
    const fetchInitialData = async () => {
      try {
        const [
          ChosenForYouRes,
          premiumRes,
          favProductsRes,
          flormarRes,
          PerfumeRes,
          bodySprayRes,
          ordersRes,
          blogsRes,
        ] = await Promise.all([
          fetch("http://localhost:3200/productsByCategories?name=shirt").then(
            (res) => res.json(),
          ),
          fetch("http://localhost:3200/productsByCategories?name=Tshirt").then(
            (res) => res.json(),
          ),
          fetch(
            "http://localhost:3200/productsByCategories?name=Two piece",
          ).then((res) => res.json()),
          fetch(
            "http://localhost:3200/productsByCategories?name=Three piece",
          ).then((res) => res.json()),
          fetch("http://localhost:3200/productsByCategories?name=Lehenga").then(
            (res) => res.json(),
          ),
          fetch(
            "http://localhost:3200/productsByCategories?name=Men watch",
          ).then((res) => res.json()),
          fetch("http://localhost:3200/orders").then((res) => res.json()),
          fetch("http://localhost:3200/getBlogs").then((res) => res.json()),
        ]);
        setChosenForYou(ChosenForYouRes);
        setpremium(premiumRes);
        setPerfume(PerfumeRes);
        setBodyspray(bodySprayRes);
        setMostFavorite(favProductsRes);
        setAllOrder(ordersRes);
        setBlogs(blogsRes);
        setflormar(flormarRes);
        setBlogLoading(false); // Assuming blogs are loaded after fetch
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setBlogLoading(false); // Handle loading state in case of error
      }
    };

    fetchInitialData();
  }, []);

  console.log(ChosenForYou)

  useEffect(() => {
    // Search functionality
    if (searchText.length > 2) {
      const result = products?.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setSearchedProducts(result);
    }
  }, [searchText, products]);

  const goToTop = () => {
    window.scrollTo(0, 0);
  };

  const contextValue = useMemo(
    () => ({
      ChosenForYou,
      products,
      blogs,
      blogLoading,
      allOrder,
      loading: loadingProducts,
      premium,
      flormar,
      Perfume,
      MostFavorite,
      bodyspray,
      nudeMakeup,
      searchedProducts,
      cart,
      setCart,
      orderList,
      setOrderList,
      searchText,
      setSearchText,
      appliedCoupon,
      setAppliedCoupon,
      user,
      isAdmin,
      isAdminLoading,
    }),
    [
      ChosenForYou,
      products,
      blogs,
      blogLoading,
      allOrder,
      loadingProducts,
      premium,
      flormar,
      Perfume,
      MostFavorite,
      bodyspray,
      nudeMakeup,
      searchedProducts,
      cart,
      setCart,
      orderList,
      setOrderList,
      searchText,
      appliedCoupon,
      user,
      isAdmin,
      isAdminLoading,
    ],
  );

  // console.log("skdjfsj", MostFavorite);

  return (
    <ThemeContext.Provider value={contextValue}>
      <RouterProvider router={router}></RouterProvider>

      <Toaster />
    </ThemeContext.Provider>
  );
}

export default App;

// https://jdot-server-rosy.vercel.app     =======Backup backend server
