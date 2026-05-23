import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { ThreeDots } from "react-loader-spinner";
import ReactToPrint from "react-to-print";
import Invoice from "../../Components/Invoice/Invoice";
import { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";

const CustomerDashboard = () => {
  let [user] = useAuthState(auth);
  const otpUser = JSON.parse(localStorage.getItem("user"));
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invoiceRefs, setInvoiceRefs] = useState([]);
  let { isAdmin, isAdminLoading } = useContext(ThemeContext);
  const Navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (isAdmin && !otpUser) {
      setLoading(false);
      Navigate("/admin");
    } else {
      if (otpUser?.phone) {
        fetch(`http://localhost:3200/userOrder/${otpUser?.phone}`)
          .then((res) => res.json())
          .then((data) => {
            setUserOrders(data);
            setLoading(false);
          });
      } else {
        fetch(`http://localhost:3200/user1Order/${user?.email}`)
          .then((res) => res.json())
          .then((data) => {
            setUserOrders(data);
            setLoading(false);
          });
      }
    }
  }, []);

  useEffect(() => {
    setInvoiceRefs(userOrders.map(() => React.createRef()));
  }, [userOrders]);

  let total = 0;

  userOrders?.forEach((order) => {
    total = parseInt(total) + parseInt(order.total);
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="mx-[10%] my-[60px] ">
      <div className="flex flex-col gap-6 sm:flex-row sm:justify-between ">
        <div>
          <p className="font-bold text-2xl">Order History</p>
        </div>
        <div>
          <Link
            to="/"
            onClick={() => {
              signOut(auth);
              localStorage.removeItem("user");
            }}
            className="bg-accent text-primary px-6 py-2 hover:bg-secondary ease-in-out duration-200 "
          >
            Logout
          </Link>
        </div>
      </div>

      <div>
        {userOrders.length < 1 && loading ? (
          <div className="flex justify-center items-center h-[90vh]">
            <ThreeDots
              height="100"
              width="100"
              radius="10"
              color="#7DC569"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        ) : (
          <div className="overflow-x-auto mx-[-40px]">
            <table className="product-table">
              {/* head */}
              <thead className="bg-accent text-primary">
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/*................table row............... */}
                {userOrders?.map((order, i) => (
                  <tr className="">
                    <td>
                      <Link
                        to={`/customerDashboard/${order?.id}`}
                        className="flex items-center space-x-3 hover:text-accent hover:underline"
                      >
                        <div>
                          <p className="font-bold">{order?.id}</p>
                          <p className="font-bold">
                            {order?.billing.first_name +
                              " " +
                              order?.billing.last_name}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td>
                      {months[new Date(order?.order_date).getMonth()]}{" "}
                      {new Date(order?.order_date).getDate()},{" "}
                      {new Date(order?.order_date).getFullYear()}{" "}
                    </td>
                    <td className={` font-bold `}>{order?.order_status}</td>
                    <td>TK. {order?.total}</td>
                    <td>{order?.payment_method}</td>
                    <td>
                      {/* <Invoice
                      invoiceRefs={invoiceRefs}
                      i={i}
                      orderContent={order}
                    ></Invoice>
                    <ReactToPrint
                      trigger={() => (
                        <button className="ml-2 px-2 py-1 bg-secondary text-primary rounded hover:bg-accent ease-in-out duration-200">
                          Download Invoice
                        </button>
                      )}
                      content={() => invoiceRefs[i].current}
                    ></ReactToPrint> */}
                      <Link
                        className="bg-accent text-primary px-4 py-2 rounded hover:bg-secondary ease-in-out duration-200"
                        to={`/customerDashboard/${order?.id}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
              <tfoot className="bg-accent text-primary">
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
