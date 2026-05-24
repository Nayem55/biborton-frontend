"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import Sidebar from "../Components/Reseller/Sidebar";
import ResellerHeader from "../Components/Reseller/ResellerHeader";
import ProductsTab from "../Components/Reseller/ProductsTab";
import OrdersTab from "../Components/Reseller/OrdersTab";
import ProductDrawer from "../Components/Reseller/ProductDrawer";

const ITEMS_PER_PAGE = 20;

const ResellerDashboard = () => {
  const navigate = useNavigate();
  const reseller = useMemo(() => {
    const stored = localStorage.getItem("reseller");
    return stored ? JSON.parse(stored) : null;
  }, []);

  // State
  const [products, setProducts] = useState([]);
  const [affiliateOrders, setAffiliateOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Products pagination & search
  const [productSearch, setProductSearch] = useState("");
  const [productPage, setProductPage] = useState(1);

  // Orders filters
  const [orderSearch, setOrderSearch] = useState("");
  const [orderPage, setOrderPage] = useState(1);
  const [orderPagination, setOrderPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0,
  });

  const today = dayjs();
  const firstDayOfMonth = today.startOf("month").format("YYYY-MM-DD");
  const lastDayOfMonth = today.endOf("month").format("YYYY-MM-DD");

  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(lastDayOfMonth);

  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingProductDetail, setLoadingProductDetail] = useState(false);

  // Auth Guard
  useEffect(() => {
    if (!reseller) {
      toast.error("Please log in to access the dashboard");
      navigate("/reseller-login");
    }
  }, [reseller, navigate]);

  // Prevent body scroll when drawer or mobile sidebar is open
  useEffect(() => {
    if (drawerOpen || sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [drawerOpen, sidebarOpen]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const res = await fetch("http://localhost:3200/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch Orders (memoized callback)
  const fetchOrders = useCallback(async () => {
    if (!reseller || activeTab !== "orders") return;

    try {
      setLoadingOrders(true);
      const params = new URLSearchParams({
        page: orderPage.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        search: orderSearch,
        start: startDate,
        end: endDate,
      });

      const res = await fetch(
        `http://localhost:3200/orders/affiliate/${reseller.resellerID}?${params}`,
      );
      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setAffiliateOrders(data.orders || []);
      setOrderPagination(
        data.pagination || { currentPage: 1, totalPages: 1, totalOrders: 0 },
      );
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  }, [reseller, activeTab, orderPage, orderSearch, startDate, endDate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Reset order page when filters change
  useEffect(() => {
    setOrderPage(1);
  }, [orderSearch, startDate, endDate]);

  // Earnings Summary
  const earningsSummary = useMemo(() => {
    if (!affiliateOrders.length) return { total: 0, paid: 0, pending: 0 };

    const total = affiliateOrders.reduce(
      (sum, order) => sum + Math.round((Number(order.subtotal) || 0) * 0.1),
      0,
    );
    const paid = affiliateOrders
      .filter((o) => o.reseller_payment === true)
      .reduce(
        (sum, order) => sum + Math.round((Number(order.subtotal) || 0) * 0.1),
        0,
      );

    return { total, paid, pending: total - paid };
  }, [affiliateOrders]);

  // Affiliate Link Generator
  const generateAffiliateLink = useCallback(
    (slug) =>
      `https://biborton.shop/product/${slug}?ref=${reseller?.resellerID}`,
    [reseller?.resellerID],
  );

  const copyLink = useCallback((link) => {
    navigator.clipboard.writeText(link);
    toast.success("Affiliate link copied!");
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("reseller");
    toast.success("Logged out successfully");
    navigate("/reseller-login");
  }, [navigate]);

  // Open Product Drawer
  const openDetails = useCallback(async (productFromList) => {
    try {
      setDrawerOpen(true);
      setSelectedProduct(null);
      setLoadingProductDetail(true);

      const res = await fetch(
        `http://localhost:3200/getSingleProduct/${productFromList.slug}`,
      );
      if (!res.ok) throw new Error("Failed to load product");

      const data = await res.json();
      setSelectedProduct(data);
    } catch (err) {
      toast.error("Failed to load product details");
      setDrawerOpen(false);
    } finally {
      setLoadingProductDetail(false);
    }
  }, []);

  const affiliateLinkForDrawer = selectedProduct?.slug
    ? generateAffiliateLink(selectedProduct.slug)
    : "";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        reseller={reseller}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <ResellerHeader
          reseller={reseller}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            {activeTab === "dashboard" && (
              <ProductsTab
                loading={loadingProducts}
                products={products}
                search={productSearch}
                setSearch={setProductSearch}
                currentPage={productPage}
                setCurrentPage={setProductPage}
                onCopyLink={copyLink}
                onOpenDetails={openDetails}
                generateAffiliateLink={generateAffiliateLink}
              />
            )}

            {activeTab === "orders" && (
              <OrdersTab
                loadingOrders={loadingOrders}
                affiliateOrders={affiliateOrders}
                orderSearch={orderSearch}
                setOrderSearch={setOrderSearch}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                firstDayOfMonth={firstDayOfMonth}
                lastDayOfMonth={lastDayOfMonth}
                orderPagination={orderPagination}
                orderPage={orderPage}
                setOrderPage={setOrderPage}
                earningsSummary={earningsSummary}
              />
            )}
          </div>
        </main>
      </div>

      {/* Product Drawer */}
      <ProductDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={selectedProduct}
        affiliateLink={affiliateLinkForDrawer}
        onCopyLink={copyLink}
        loading={loadingProductDetail}
      />

      {/* Overlay for mobile sidebar & drawer */}
      {(sidebarOpen || drawerOpen) && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => {
            setSidebarOpen(false);
            if (!loadingProductDetail) setDrawerOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ResellerDashboard;
