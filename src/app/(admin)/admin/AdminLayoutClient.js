"use client";
import React, { useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import { ThemeContext } from "../../../Components/Providers";
import {
  LayoutDashboard,
  PlusCircle,
  ShoppingCart,
  Users,
  TicketPercent,
  Star,
  FileText,
  SlidersHorizontal,
  Image as ImageIcon,
  UserCog,
  LogOut,
} from "lucide-react";

const AdminLayoutClient = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, isAdmin, isAdminLoading } = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#f6fbff] to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#49ADFF] border-t-transparent"></div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const menuItems = [
    { name: "Products", href: "/admin", icon: LayoutDashboard },
    { name: "Add Product", href: "/admin/addProduct", icon: PlusCircle },
    { name: "Orders", href: "/admin/order", icon: ShoppingCart },
    { name: "Users", href: "/admin/user", icon: Users },
    { name: "Coupons", href: "/admin/coupons", icon: TicketPercent },
    { name: "Reviews", href: "/admin/reviews", icon: Star },
    { name: "Blogs", href: "/admin/Allblog", icon: FileText },
    { name: "Bulk Edit", href: "/admin/filter", icon: SlidersHorizontal },
    { name: "Popup", href: "/admin/popup", icon: ImageIcon },
    { name: "Reseller Dashboard", href: "/admin/reseller", icon: UserCog },
  ];

  return (
    <div className="bg-gradient-to-br from-[#f6fbff] to-white min-h-screen">
      {/* ===== Fixed Sidebar ===== */}
      <aside className="fixed left-0 top-0 w-52 h-screen bg-white/80 backdrop-blur-xl border-r border-gray-200 shadow-xl flex flex-col z-50">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/">
            <Image
              src="https://i.ibb.co.com/qL6G2k62/3039b878-bec9-43ca-b082-1cec9a342a71-removebg-preview.png"
              alt="Biborton logo"
              width={130}
              height={60}
              className="transition-transform duration-500 hover:scale-105"
              priority
            />

            {/* <span className="tracking-[0.2em] pl-4 text-[28px]">Biborton</span> */}
          </Link>
        </div>

        {/* Scrollable Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-300 text-sm
                  ${
                    isActive
                      ? "bg-[#49ADFF]/10 text-[#49ADFF] borderrrrr-l-4 border-[#49ADFF] shadow-sm "
                      : "text-gray-600 hover:bg-[#49ADFF]/5 hover:text-[#49ADFF]"
                  }`}
              >
                <Icon
                  size={16}
                  className={`transition-transform duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              signOut(auth);
              router.push("/");
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="ml-48 py-5 px-2 min-h-screen">
        <div className="bg-white rounded-2xl shadow-md p-6 min-h-[85vh]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayoutClient;

// "use client";
// import React, { useEffect, useContext } from "react";
// import Link from 'next/link';
// import Image from 'next/image';
// import dynamic from 'next/dynamic';
// import { usePathname, useRouter } from 'next/navigation';
// import { signOut } from "firebase/auth";
// import auth from "../../../firebase.init";
// import { ThemeContext } from "../../../Components/Providers";
// import {
//   LayoutDashboard,
//   PlusCircle,
//   ShoppingCart,
//   Users,
//   TicketPercent,
//   Star,
//   FileText,
//   SlidersHorizontal,
//   Image as ImageIcon,
//   UserCog,
//   LogOut
// } from "lucide-react";

// const AdminLayoutClient = ({ children }) => {
//   const pathname = usePathname();
//   const router = useRouter();
//   let { user, loading, isAdmin, isAdminLoading } = useContext(ThemeContext);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   // Auth & Admin Guard
//   useEffect(() => {
//     if (!loading && !isAdminLoading) {
//       if (!user || !isAdmin) {
//         // Uncomment to redirect non-admins
//         // router.push('/');
//       }
//     }
//   }, [user, isAdmin, loading, isAdminLoading, router]);

//   if (loading || isAdminLoading) {
//     return (
//       <div className="flex justify-center items-center h-[90vh]">
//         <progress className="progress w-56"></progress>
//       </div>
//     );
//   }

//   if (!user || !isAdmin) return null;

//   return (
//     <div>
//       <div className="drawer drawer-mobile drawer-open">
//         <input
//           id="dashboard-drawer"
//           type="checkbox"
//           className="drawer-toggle"
//         />
//         <div className={`drawer-content`}>
//             {children}
//         </div>
//         <div className="drawer-side bg-[#F2F9FF] h-full min-h-screen">
//           <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
// <ul className="menu p-4 w-60 lg:w-60 text-primary bg-accent mt-20 lg:mt-0 h-full space-y-1">

//   <Link href="/" className="block p-4 mb-6">
//     <Image
//       src="https://luvit.com.bd/wp-content/uploads/2026/02/Aroma-Talks-logo-2.png"
//       alt="J. Fragrances Logo"
//       width={150}
//       height={80}
//       priority
//       quality={90}
//       className="transition-transform duration-700 hover:scale-105"
//     />
//   </Link>

//   <li>
//     <Link
//       href="/admin"
//       className={`flex items-center gap-2 ${
//         pathname === "/admin" && "bg-[#F2F9FF] text-[#49ADFF]"
//       }`}
//     >
//       <LayoutDashboard size={18} />
//       Products
//     </Link>
//   </li>

//   <li>
//     <Link
//       href="/admin/addProduct"
//       className={`flex items-center gap-2 ${
//         pathname === "/admin/addProduct" && "bg-[#F2F9FF] text-[#49ADFF]"
//       }`}
//     >
//       <PlusCircle size={18} />
//       Add Product
//     </Link>
//   </li>

//   <li>
//     <Link
//       href="/admin/order"
//       className={`flex items-center gap-2 ${
//         pathname === "/admin/order" && "bg-[#F2F9FF] text-[#49ADFF]"
//       }`}
//     >
//       <ShoppingCart size={18} />
//       Orders
//     </Link>
//   </li>

//   <li>
//     <Link
//       href="/admin/user"
//       className={`flex items-center gap-2 ${
//         pathname === "/admin/user" && "bg-[#F2F9FF] text-[#49ADFF]"
//       }`}
//     >
//       <Users size={18} />
//       Users
//     </Link>
//   </li>

//   <li>
//     <Link
//       href="/admin/coupons"
//       className={`flex items-center gap-2 ${
//         pathname === "/admin/coupons" && "bg-[#F2F9FF] text-[#49ADFF]"
//       }`}
//     >
//       <TicketPercent size={18} />
//       Coupons
//     </Link>
//   </li>

//   <li>
//     <Link
//       href="/admin/reviews"
//       className={`flex items-center gap-2 ${
//         pathname === "/admin/reviews" && "bg-[#F2F9FF] text-[#49ADFF]"
//       }`}
//     >
//       <Star size={18} />
//       Reviews
//     </Link>
//   </li>

//   <li>
//     <Link
//       href="/admin/Allblog"
//       className={`flex items-center gap-2 ${
//         pathname === "/admin/Allblog" && "bg-[#F2F9FF] text-[#49ADFF]"
//       }`}
//     >
//       <FileText size={18} />
//       Blogs
//     </Link>
//   </li>

//   <li>
//     <Link
//       href="/admin/filter"
//       className={`flex items-center gap-2 ${
//         pathname === "/admin/filter" && "bg-[#F2F9FF] text-[#49ADFF]"
//       }`}
//     >
//       <SlidersHorizontal size={18} />
//       Bulk Edit
//     </Link>
//   </li>

//   <li>
//     <Link
//       href="/admin/popup"
//       className={`flex items-center gap-2 ${
//         pathname === "/admin/popup" && "bg-[#F2F9FF] text-[#49ADFF]"
//       }`}
//     >
//       <ImageIcon size={18} />
//       Popup
//     </Link>
//   </li>

//   <li>
//     <Link
//       href="/admin/reseller"
//       className={`flex items-center gap-2 ${
//         pathname === "/admin/reseller" && "bg-[#F2F9FF] text-[#49ADFF]"
//       }`}
//     >
//       <UserCog size={18} />
//       Reseller Dashboard
//     </Link>
//   </li>

//   <li>
//     <button
//       onClick={() => {
//         signOut(auth);
//         router.push("/");
//       }}
//       className="flex items-center gap-2 w-full text-left hover:text-red-500"
//     >
//       <LogOut size={18} />
//       Log out
//     </button>
//   </li>

// </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLayoutClient;
