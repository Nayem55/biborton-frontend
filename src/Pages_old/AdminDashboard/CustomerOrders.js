import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";

const CustomerOrders = () => {
  const { ph } = useParams();
  const [userOrders, setUserOrders] = useState([]);
  const [user1Orders, setUser1Orders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3200/userOrder/${ph}`)
      .then((res) => res.json())
      .then((data) => {
        setUserOrders(data);
        setLoading(false);
      });
    fetch(`http://localhost:3200/user1Order/${ph}`)
      .then((res) => res.json())
      .then((data) => {
        setUser1Orders(data);
        setLoading(false);
      });
  }, []);

  let total = 0;

  (userOrders.length > 0 ? userOrders : user1Orders)?.forEach((order) => {
    total = parseInt(total) + parseInt(order.total);
  });

  return (
    <div>
      <div className="flex justify-between mx-12">
        <div className="flex">
          <h1 className="mt-12 mr-12 text-3xl font-bold">
            Customer order details
          </h1>
        </div>
      </div>

      {(userOrders.length > 0 ? userOrders : user1Orders).length < 1 &&
      loading ? (
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
        <div className="overflow-x-auto">
          <div className="mx-12 mb-[-40px] mt-[40px] flex gap-10">
            <p className="text-xl font-bold">Total spend : TK. {total} </p>
            <p className="text-xl font-bold">
              AOV : TK.{" "}
              {total / (userOrders.length > 0 ? userOrders : user1Orders).length
                ? total /
                  (userOrders.length > 0 ? userOrders : user1Orders).length
                : 0}{" "}
            </p>
          </div>
          <table className="product-table">
            {/* head */}
            <thead className="bg-accent text-primary">
              <tr>
                <th></th>
                <th>Order</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {/*................table row............... */}
              {(userOrders.length > 0 ? userOrders : user1Orders)?.map(
                (order) => (
                  <tr className="">
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <Link
                        to={`/admin/order/${order?.id}`}
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
                    <td>{order?.order_date}</td>
                    <td className={` font-bold `}>{order?.order_status}</td>
                    <td>TK. {order?.total}</td>
                    <td>{order?.payment_method}</td>
                  </tr>
                ),
              )}
            </tbody>
            {/* foot */}
            <tfoot className="bg-accent text-primary">
              <tr>
                <th></th>
                <th>Order</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Payment</th>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
