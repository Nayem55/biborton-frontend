"use client";

import React, { useEffect, useState, useMemo } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import useProduct from "../Hooks/useProduct";
import useCart from "../Hooks/useCart";
import useOrder from "../Hooks/useOrder";
import useScroll from "../Hooks/useScroll";
import dynamic from "next/dynamic";

// Lazy load Firebase auth - only loads when needed
const useAuthState = dynamic(
  () => import("react-firebase-hooks/auth").then((mod) => mod.useAuthState),
  { ssr: false },
);

const getAuth = dynamic(
  () => import("../firebase.init").then((mod) => mod.default),
  { ssr: false },
);

export { ThemeContext };

export default function Providers({ children, initialData }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);

  // Load Firebase auth dynamically
  useEffect(() => {
    let unsubscribe;

    const loadAuth = async () => {
      try {
        const { getAuth } = await import("firebase/auth");
        const { default: auth } = await import("../firebase.init");
        const { useAuthState } = await import("react-firebase-hooks/auth");

        // This is a workaround - we'll use onAuthStateChanged instead
        const { onAuthStateChanged } = await import("firebase/auth");

        unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error loading auth:", error);
        setLoading(false);
      }
    };

    loadAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // ✅ If SSR provided products, use them. Otherwise your existing hook will fetch.
  const [productsFromHook, loadingProductsFromHook] = useProduct();

  const products = initialData?.products?.length
    ? initialData.products
    : productsFromHook;

  const loadingProducts = initialData?.products?.length
    ? false
    : loadingProductsFromHook;

  const [cart, setCart] = useCart(products);
  const [orderList, setOrderList] = useOrder();
  const [scrollPosition] = useScroll();
  const [searchText, setSearchText] = useState("");

  // ✅ SSR hydration for category data
  const [fashion, setfashion] = useState(initialData?.fashion || []);
  const [bodyspray, setBodyspray] = useState(initialData?.bodyspray || []);
  const [bestSellings, setBestSellings] = useState(
    initialData?.bestSellings || [],
  );
  const [newArrival, setNewArrival] = useState(initialData?.newArrival || []);
  const [ChosenForYou, setChosenForYou] = useState(
    initialData?.ChosenForYou || [],
  );
  const [saree, setSaree] = useState(
    initialData?.saree || [],
  );
  const [MostFavorite, setMostFavorite] = useState(
    initialData?.MostFavorite || [],
  );
  const [premium, setpremium] = useState(initialData?.premium || []);
  const [flormar, setflormar] = useState(initialData?.flormar || []);

  const [nudeMakeup, setNudeMakeup] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [allOrder, setAllOrder] = useState(initialData?.allOrder || []);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [blogs, setBlogs] = useState(initialData?.blogs || []);
  const [blogLoading, setBlogLoading] = useState(false);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setIsAdminLoading(false);
        return;
      }

      setIsAdminLoading(true);

      try {
        let isAdminFromPhone = false;
        let isAdminFromEmail = false;

        if (user?.phoneNumber) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/admin/${user.phoneNumber}`,
          );
          const data = await response.json();
          isAdminFromPhone = !!data?.isAdmin;
        }

        if (user?.email) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/admin1/${user.email}`,
          );
          const data = await response.json();
          isAdminFromEmail = !!data?.isAdmin;
        }

        setIsAdmin(isAdminFromPhone || isAdminFromEmail);
      } catch (error) {
        console.error("❌ Error fetching admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsAdminLoading(false);
      }
    };

    fetchAdminStatus();
  }, [user]);

  // ✅ Only fetch initial data on client if SSR did NOT provide it
  useEffect(() => {
    // Check if we have ANY SSR data - if yes, don't fetch again
    const hasSSRData =
      initialData?.ChosenForYou?.length > 0 ||
      initialData?.saree?.length > 0 ||
      initialData?.premium?.length > 0 ||
      initialData?.fashion?.length > 0 ||
      initialData?.bodyspray?.length > 0 ||
      initialData?.MostFavorite?.length > 0 ||
      initialData?.flormar?.length > 0 ||
      initialData?.blogs?.length > 0 ||
      initialData?.products?.length > 0;

    // If SSR provided data, skip client-side fetching
    if (hasSSRData) {
      setBlogLoading(false);
      return;
    }

    // Only fetch if SSR completely failed
    const fetchInitialData = async () => {
      setBlogLoading(true);
      try {
        const [
          ChosenForYouRes,
          sareeRes,
          premiumRes,
          favProductsRes,
          flormarRes,
          fashionRes,
          bodySprayRes,
          bestSellingsRes,
          newRes,
          ordersRes,
          blogsRes,
        ] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/productsByCategories?name=shirt`,
          )
            .then((r) => r.json())
            .catch(() => []),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/productsByCategories?name=saree`,
          )
            .then((r) => r.json())
            .catch(() => []),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/productsByCategories?name=Tshirt`,
          )
            .then((r) => r.json())
            .catch(() => []),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/productsByCategories?name=Two piece`,
          )
            .then((r) => r.json())
            .catch(() => []),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/productsByCategories?name=Three piece`,
          )
            .then((r) => r.json())
            .catch(() => []),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/productsByCategories?name=Lehenga`,
          )
            .then((r) => r.json())
            .catch(() => []),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/productsByCategories?name=Men watch`,
          )
            .then((r) => r.json())
            .catch(() => []),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/productsByCategories?name=best sellings`,
          )
            .then((r) => r.json())
            .catch(() => []),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/productsByCategories?name=new`,
          )
            .then((r) => r.json())
            .catch(() => []),

          fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
            .then((r) => r.json())
            .catch(() => []),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/getBlogs`)
            .then((r) => r.json())
            .catch(() => []),
        ]);

        setChosenForYou(ChosenForYouRes || []);
        setSaree(sareeRes);
        setpremium(premiumRes || []);
        setfashion(fashionRes || []);
        setBodyspray(bodySprayRes || []);
        setBestSellings(bestSellingsRes || []);
        setNew(newRes || []);
        setMostFavorite(favProductsRes || []);
        setAllOrder(ordersRes || []);
        setBlogs(blogsRes || []);
        setflormar(flormarRes || []);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setBlogLoading(false);
      }
    };

    fetchInitialData();
  }, []); // Remove initialData dependency to prevent re-fetching

  useEffect(() => {
    if (searchText.length > 2) {
      const result = (products || []).filter((product) =>
        product?.name?.toLowerCase().includes(searchText.toLowerCase()),
      );
      setSearchedProducts(result);
    } else {
      setSearchedProducts([]);
    }
  }, [searchText, products]);

  const goToTop = () => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };

  const contextValue = useMemo(
    () => ({
      products,
      blogs,
      blogLoading,
      allOrder,
      loading: loadingProducts,
      ChosenForYou,
      saree,
      premium,
      flormar,
      fashion,
      MostFavorite,
      bodyspray,
      bestSellings,
      newArrival,
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
      loading,
      isAdmin,
      isAdminLoading,
    }),
    [
      ChosenForYou,
      saree,
      products,
      blogs,
      blogLoading,
      allOrder,
      loadingProducts,
      premium,
      flormar,
      fashion,
      MostFavorite,
      bodyspray,
      newArrival,
      searchedProducts,
      cart,
      setCart,
      orderList,
      setOrderList,
      searchText,
      appliedCoupon,
      user,
      loading,
      isAdmin,
      isAdminLoading,
    ],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}

      <a
        href="https://api.whatsapp.com/send?phone=8801404403596"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          title="Chat on WhatsApp"
          className={`transition-all cursor-pointer w-10 h-10 duration-300 ease-in-out fixed bottom-[50px] right-8 ${
            scrollPosition >= 0
              ? "opacity-0 lg:opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
        >
          <path
            fill="#009649"
            d="M16 .7C7.6.7.7 7.6.7 16c0 2.7.7 5.2 2 7.5L0 32l8.7-2.7c2.3 1.3 4.9 2 7.5 2 8.4 0 15.3-6.9 15.3-15.3S24.4.7 16 .7zm0 27.9c-2.4 0-4.8-.6-6.9-1.9l-.5-.3-5.1 1.6 1.7-5-.3-.5c-1.3-2.1-1.9-4.5-1.9-6.9 0-7.2 5.8-13 13-13s13 5.8 13 13-5.9 13-13 13zm7.4-9.7c-.4-.2-2.3-1.1-2.6-1.2-.3-.1-.5-.2-.7.2-.2.4-.8 1.2-1 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.6.2-.2.3-.4.5-.6.2-.2.1-.5 0-.7-.1-.2-.7-1.8-1-2.5-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1 .5s-1.3 1.2-1.3 3 1.3 3.4 1.5 3.6c.2.2 2.6 3.9 6.4 5.4.9.4 1.6.7 2.1.9.9.3 1.7.3 2.4.2.7-.1 2.3-1 2.6-1.9.3-.9.3-1.7.2-1.9-.1-.2-.3-.3-.7-.5z"
          />
        </svg>
      </a>

      <svg
        title="Back To Top"
        className={`transition-all cursor-pointer w-10 h-10 duration-300 ease-in-out fixed bottom-[100px] right-8 ${
          scrollPosition > 1000
            ? "opacity-0 lg:opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={goToTop}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        id="up-button"
      >
        <path d="M65.4 44.6c.8.8.8 2 0 2.8-.4.4-.9.6-1.4.6s-1-.2-1.4-.6L52 36.8V68c0 1.1-.9 2-2 2s-2-.9-2-2V36.8L37.4 47.4c-.4.4-.9.6-1.4.6s-1-.2-1.4-.6c-.8-.8-.8-2 0-2.8l14-14 .3-.3c.1 0 .1-.1.2-.1s.1-.1.2-.1.1 0 .2-.1h1c.1 0 .1 0 .2.1.1 0 .1 0 .2.1.1 0 .1.1.2.1 0 0 .1 0 .1.1l.3.3 13.9 13.9zM95 15v70c0 5.5-4.5 10-10 10H15C9.5 95 5 90.5 5 85V15C5 9.5 9.5 5 15 5h70c5.5 0 10 4.5 10 10zm-4 0c0-3.3-2.7-6-6-6H15c-3.3 0-6 2.7-6 6v70c0 3.3 2.7 6 6 6h70c3.3 0 6-2.7 6-6V15z" />
      </svg>
    </ThemeContext.Provider>
  );
}
