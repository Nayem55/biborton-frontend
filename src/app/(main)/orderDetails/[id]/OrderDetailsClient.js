"use client";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";
import { useRouter } from 'next/navigation';

const OrderDetailsClient = ({ id }) => {
//   const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, authLoading] = useAuthState(auth);
  const router = useRouter();

  // Auth Protection
  useEffect(() => {
    if (!authLoading && !user) {
        router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setLoading(false);
      });
  }, [id]);

  if (authLoading || loading) {
    return (
        <div className="flex justify-center items-center h-[50vh]">
            <ThreeDots
                height="100"
                width="100"
                radius="10"
                color="#7dc569"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    );
  }

  if (!user) return null;

  return (
    <div className="w-[100%] lg:w-[80%] mx-auto my-10">
      <p className="text-2xl font-bold mb-4">Order #{order.id}</p>
      <p className="text-sm text-secondary text-opacity-70 mb-6">
        Order <span className="text-secondary font-bold">#{order.id}</span> was
        placed on{" "}
        <span className="text-secondary font-bold">
          {new Date(order.date_created).toDateString()}
        </span>{" "}
        and is currently{" "}
        <span className="text-secondary font-bold">{order.status}</span>.
      </p>

      <p className="font-bold text-2xl mb-4">Order details</p>
      <div>
        <table className="table w-full border border-secondary border-opacity-30">
          <thead>
            <tr>
              <th className="bg-transparent border-b border-secondary border-opacity-30 text-secondary">
                Product
              </th>
              <th className="bg-transparent border-b border-secondary border-opacity-30 text-secondary text-right">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {order?.line_items?.map((item) => (
              <tr key={item.id}>
                <td className="border-b border-secondary border-opacity-30">
                  <div className="flex items-center gap-2">
                    <p className="text-secondary font-bold text-opacity-70">
                      {item.name}
                    </p>{" "}
                    <p className="font-bold">x {item.quantity}</p>
                  </div>
                </td>
                <td className="text-right border-b border-secondary border-opacity-30 font-bold text-secondary text-opacity-70">
                  TK. {item.total}
                </td>
              </tr>
            ))}
            <tr>
              <td className="font-bold text-secondary text-opacity-70 border-b border-secondary border-opacity-30">
                Subtotal:
              </td>
              <td className="text-right font-bold text-secondary text-opacity-70 border-b border-secondary border-opacity-30">
                TK. {order.total}
              </td>
            </tr>
            <tr>
              <td className="font-bold text-secondary text-opacity-70 border-b border-secondary border-opacity-30">
                Shipping:
              </td>
              <td className="text-right font-bold text-secondary text-opacity-70 border-b border-secondary border-opacity-30">
                TK. {order.shipping_total}
              </td>
            </tr>
            <tr>
              <td className="font-bold text-secondary text-opacity-70 border-b border-secondary border-opacity-30">
                Payment Method:
              </td>
              <td className="text-right font-bold text-secondary text-opacity-70 border-b border-secondary border-opacity-30">
                {order.payment_method_title}
              </td>
            </tr>
            <tr>
              <td className="font-bold text-secondary text-opacity-70 ">
                Total:
              </td>
              <td className="text-right font-bold text-secondary text-opacity-70 ">
                TK. {parseInt(order.total) + parseInt(order.shipping_total)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="border border-secondary border-opacity-30 w-full mt-10 p-6">
          <p className="text-2xl font-bold mb-4">Billing address</p>
          <p className=" italic text-secondary text-opacity-70">
            {order.billing.first_name} {order.billing.last_name}
          </p>
          <p className=" italic text-secondary text-opacity-70">
            {order.billing.address_1}
          </p>
          <p className=" italic text-secondary text-opacity-70">
            {order.billing.city}
          </p>
          <p className=" italic text-secondary text-opacity-70">
            {order.billing.postcode}
          </p>
          <p className=" italic text-secondary text-opacity-70">
            {order.billing.phone}
          </p>
          <p className=" italic text-secondary text-opacity-70">
            {order.billing.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsClient;
