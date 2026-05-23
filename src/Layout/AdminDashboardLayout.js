import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet, useLocation } from "react-router-dom";
import auth from "../firebase.init";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import "../Pages/AdminDashboard/AdminDashboard.css";
import useAdmin from "../Hooks/useAdmin";
import useScroll from "../Hooks/useScroll";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { signOut } from "firebase/auth";

const AdminDashboardLayout = () => {
  const location = useLocation();
  let {user, loading,isAdmin,isAdminLoading} = useContext(ThemeContext);


  useEffect(() => {
    window.scrollTo(0,0);
  },[location.pathname])

  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <progress className="progress  w-56"></progress>
      </div>
    );
  }
  
  return (
    <div>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className={`drawer-content`}>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side bg-primary">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 lg:w-60 text-primary bg-accent mt-20 lg:mt-0">
          <Link to="/"><img src="https://luvit.com.bd/wp-content/uploads/2026/01/Fragrances-removebg-preview-1.png" alt="" className="p-4 mb-10" ></img></Link>
            <li>
              <Link className={`${(location.pathname==="/admin") && "bg-primary text-accent"}`} to="/admin">Products</Link>
            </li>
            <li>
              <Link className={`${(location.pathname==="/admin/addProduct") && "bg-primary text-accent"}`} to="/admin/addProduct">Add Product</Link>
            </li>
            <li>
              <Link className={`${location.pathname==="/admin/order" && "bg-primary text-accent"}`} to="/admin/order">Orders</Link>
            </li>
            <li>
              <Link className={`${location.pathname==="/admin/user" && "bg-primary text-accent"}`} to="/admin/user">Users</Link>
            </li>
            <li>
              <Link to="/admin/coupons" className={`${location.pathname==="/admin/coupons" && "bg-primary text-accent"}`} >Coupons</Link>
            </li>
            {/* <li>
              <Link className={`${location.pathname==="/admin/slides" && "bg-primary text-accent"}`} >Slides</Link>
            </li> */}
            <li>
              <Link className={`${location.pathname==="/admin/analytics" && "bg-primary text-accent"}`} to="/admin/analytics" >Analytics</Link>
            </li>
            <li>
              <Link className={`${location.pathname==="/admin/reviews" && "bg-primary text-accent"}`} to="/admin/reviews" >Reviews</Link>
            </li>
            <li>
              <Link className={`${location.pathname==="/admin/blogs" && "bg-primary text-accent"}`} to="/admin/Allblog" >Blogs</Link>
            </li>
            <li>
              <Link className={`${location.pathname==="/admin/filter" && "bg-primary text-accent"}`} to="/admin/filter" >Bulk Edit</Link>
            </li>
            <li>
              <Link className={`${location.pathname==="/admin/popup" && "bg-primary text-accent"}`} to="/admin/popup" >Popup</Link>
            </li>
            <li>
              <Link className={`${location.pathname==="/admin/distributor-list" && "bg-primary text-accent"}`} to="/admin/reseller" >Reseller Dashboard</Link>
            </li>
            <li>
              <Link onClick={()=>signOut(auth)} to="/" >Log out</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
