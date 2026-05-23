import React, { useContext } from "react";
import "./PackingSlip.css";
import { ThemeContext } from "../../Contexts/ThemeContext";

const PackingSlip = ({ orderContent, orderRefs, i }) => {
  const { products } = useContext(ThemeContext);
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
    <div className="hidden">
      <div ref={orderRefs[i]} className="packingSlip">
        <div className="flex justify-between bg-[#f5f5f5]">
          <p className="font-bold mx-4 my-4">OFFICE INVOICE</p>
          <p className="font-bold mx-4 my-4">
            OFFICE USE ONLY // ORDER# {orderContent?.id}
          </p>
        </div>
        <div className="flex justify-between mx-4 my-10">
          <div className="mx-4">
            <p>Order No: {orderContent?.id}</p>
            <p className="mt-6">
              Order Date:{" "}
              {months[new Date(orderContent?.order_date).getMonth()]}{" "}
              {new Date(orderContent?.order_date).getDate()},{" "}
              {new Date(orderContent?.order_date).getFullYear()}{" "}
            </p>
            <p>Customer No: </p>
          </div>
          <div className="mx-4">
            <p>Delivery Details:</p>
            <p className="mt-6"></p>
            <p>
              {orderContent?.billing.first_name +
                " " +
                orderContent?.billing.last_name}
            </p>
            <p>{orderContent?.billing.phone}</p>
            <p>
              {orderContent?.billing.address_1 +
                ", " +
                orderContent?.billing.state}
            </p>
            <p>{orderContent?.billing.city}</p>
          </div>
          <div className="">
            <p>{orderContent?.payment_method}</p>
            <p>Regular (2-3 Days)</p>
            <p className="font-bold mt-10">
              Order Total: Tk {orderContent?.total}
            </p>
          </div>
        </div>
        <div className="mx-4 my-10">
          <div>
            <p className="font-bold text-2xl pt-10">
              Order# {orderContent?.id}
            </p>
            <p>
              Please process order# {orderContent?.id} & deliver the following
              product(s) to Sawshin Rahman with above shipping details ASAP.
              Also review customer note if any.
            </p>
          </div>
          <div className="mt-10">
            <table className="w-[100%]">
              <thead>
                <tr className="bg-[#cccccc] border border-[#cccccc]">
                  <th className="text-left pl-2">Image</th>
                  <th className="text-left pl-2">Product</th>
                  <th className="text-left pl-2">SKU</th>
                  <th className="text-left pl-2">Weight</th>
                  <th className="text-left pl-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {orderContent.items.map((item, index) => (
                  <tr className="border border-[#cccccc]">
                    <td className="text-left">
                      <img
                        className="w-[80px]"
                        src={
                          products?.find(
                            (product) => product._id === item.product_id
                          )?.images[0].src
                        }
                        alt=""
                      />
                    </td>
                    <td className="pl-2 text-[#0249bd] cursor-pointer underline">
                      <a
                        href={`/product/${item?.product_id}`}
                      >
                        {
                          products?.find(
                            (product) => product._id === item.product_id
                          )?.name
                        }
                      </a>
                    </td>
                    <td className="pl-2">
                      {
                        products?.find(
                          (product) => product._id === item.product_id
                        )?.sku
                      }
                    </td>
                    <td className="pl-2">N/A</td>
                    <td className="pl-2">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-20">
            <p>Customer Note:</p>
            <p className="mt-6">
              I verify that the order is delivered to the customer and he/she
              has received the delivery with full satisfaction.
            </p>
            <div className="border border-t-secondary border-dotted w-[100px] mt-16"></div>
            <p className="">Office Signature</p>
            <p className="mt-2">Office Notes:</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackingSlip;
