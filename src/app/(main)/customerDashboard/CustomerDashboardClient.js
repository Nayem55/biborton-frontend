"use client";
import { signOut } from "firebase/auth";
import React, { useEffect, useState, useContext, useRef } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthState } from "react-firebase-hooks/auth";
import { ThreeDots } from "react-loader-spinner";
import ReactToPrint from "react-to-print";
import { ThemeContext } from "../../../Components/Providers"; // Adjusted path
import auth from "../../../firebase.init";
import Invoice from "../../../Components/Invoice/Invoice"; // Adjusted path

const CustomerDashboardClient = () => {
  const [user, loading] = useAuthState(auth);
  const { orderList } = useContext(ThemeContext);
  const [orderListData, setOrderListData] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});
  const [loadingOrders, setLoadingOrders] = useState(false);
  const componentRef = useRef();
  const router = useRouter();

  // Auth protection logic
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setLoadingOrders(true);
      const identifier = user.phoneNumber || user.email;
      const isPhone = !!user.phoneNumber;
      
      // Fetch User Profile
      if (isPhone) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUser/${user.phoneNumber}`)
          .then((res) => res.json())
          .then((data) => setCustomerInfo(data));
      } else {
        // For Google users, we might not have a direct getUser by email,
        // but we can set default info or fetch if endpoint exists.
        setCustomerInfo({
          first_name: user.displayName?.split(' ')[0] || "User",
          last_name: user.displayName?.split(' ').slice(1).join(' ') || "",
          email: user.email
        });
      }

      // Fetch Orders
      const orderEndpoint = isPhone 
        ? `${process.env.NEXT_PUBLIC_API_URL}/userOrder/${user.phoneNumber}`
        : `${process.env.NEXT_PUBLIC_API_URL}/user1Order/${user.email}`;

      fetch(orderEndpoint)
        .then((res) => res.json())
        .then((data) => {
          setOrderListData(data);
          setLoadingOrders(false);
        })
        .catch(err => {
          console.error("Error fetching orders:", err);
          setLoadingOrders(false);
        });
    }
  }, [user]);

  const handleSignout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user"); // Clear OTP user as well
    router.push("/login");
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-[50vh]">
            <ThreeDots
                height="100"
                width="100"
                radius="10"
                color="#f3f3f3"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    );
  }

  if (!user) {
    return null; // Or a loading spinner while redirecting
  }


  return (
    <div className="flex flex-col lg:flex-row h-[100vh]">
        
      <div className="w-[100%] lg:w-[20%] bg-primary h-[50vh] lg:h-[100vh]">
        <div className="flex flex-col items-center py-10 gap-4">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://api.lorem.space/image/face?hash=3174" alt="" />
            </div>
          </div>
          <p className="text-white font-bold text-xl">
            {customerInfo?.first_name + " " + customerInfo?.last_name}
          </p>
          <p className="text-white text-xs mt-[-10px]">{user?.email}</p>
        </div>
        <div className="flex flex-col items-center gap-4">
            {/* <Link to="/customerDashboard" className="text-white font-bold text-xl hover:text-accent">
                Orders
            </Link> */}
            {/* <Link to="/customerDashboard/profile" className="text-white font-bold text-xl hover:text-accent">
                Profile
            </Link> */}
            <button onClick={handleSignout} className="text-white font-bold text-xl hover:text-accent">
                Sign Out
            </button>
        </div>
      </div>
      <div className="w-[100%] lg:w-[80%] bg-[#f3f3f3] h-[100vh] overflow-y-scroll">
        <div className="p-10">
          <p className="text-2xl font-bold mb-10">Orders</p>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orderListData?.map((order) => (
                  <tr key={order.id}>
                    <th>{order.id}</th>
                    <td>{order.order_date?.slice(0, 10)}</td>
                    <td>{order.order_status}</td>
                    <td>{order.total}</td>
                    <td className="flex gap-4">
                      <Link
                        href={`/orderDetails/${order.id}`}
                        className="btn btn-sm bg-secondary text-white border-none hover:bg-accent"
                      >
                        View
                      </Link>
                      {/* <ReactToPrint
                        trigger={() => (
                          <button className="btn btn-sm bg-accent text-white border-none hover:bg-secondary">
                            Invoice
                          </button>
                        )}
                        content={() => componentRef.current}
                      />
                      <div className="hidden">
                        <Invoice
                          ref={componentRef}
                          order={order}
                          customerInfo={customerInfo}
                        ></Invoice>
                      </div> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardClient;
