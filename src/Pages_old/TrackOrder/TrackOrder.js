import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TrackOrder = () => {
  const [order, setOrder] = useState();
  const [orderID, setOrderID] = useState("");
  const [track, setTrack] = useState(false);

  const handleTrack = () => {
    setOrder();
    setTrack(false);
    fetch(`https://biborton-server.vercel.app/order/${orderID}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });
    setTrack(true);
  };
  return (
    <div className="px-[4%] sm:px-[10%] py-[6%]">
      <p className="text-xl sm:text-2xl font bold mb-10">TRACK YOUR ORDER</p>
      <div className="flex gap-6 sm:gap-10">
        <input
          onChange={(e) => setOrderID(e.target.value)}
          type="number"
          placeholder="Provide order ID"
          className="border border-[#cccccc] px-4 py-1"
        />
        <button
          onClick={handleTrack}
          className="bg-accent text-primary px-4 py-1 hover:bg-secondary ease-in-out duration-200 rounded"
        >
          Track
        </button>
      </div>
      {order?.order_status ? (
        <div className="mt-6">
          <p className="text-xl">Order Status : {order?.order_status}</p>
          <div className="flex gap-4 sm:gap-10 mt-10">
            <div className="flex flex-col items-center">
              <p
                className={` ${
                  order?.order_status === "Processing" ||
                  order?.order_status === "Shipping" ||
                  order?.order_status === "Delivered" ||
                  order?.order_status === "Completed"
                    ? "bg-[#088c2c] border-[#088c2c]"
                    : "bg-accent border-accent"
                } border  rounded-full flex justify-center items-center text-primary w-[40px] h-[40px] sm:w-[60px] sm:h-[60px]`}
              >
                {order?.order_status === "Processing" ||
                order?.order_status === "Shipping" ||
                order?.order_status === "Delivered" ||
                order?.order_status === "Completed" ? (
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                ) : (
                  1
                )}
              </p>
              <p className="mt-2 font-bold">Processing</p>
            </div>
            <div className="flex flex-col items-center">
              <p
                className={` ${
                  order?.order_status === "Shipping" ||
                  order?.order_status === "Delivered" ||
                  order?.order_status === "Completed"
                    ? "bg-[#088c2c] border-[#088c2c]"
                    : "bg-accent border-accent"
                } border  rounded-full flex justify-center items-center text-primary w-[40px] h-[40px] sm:w-[60px] sm:h-[60px]`}
              >
                {order?.order_status === "Shipping" ||
                order?.order_status === "Delivered" ||
                order?.order_status === "Completed" ? (
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                ) : (
                  2
                )}
              </p>
              <p className="mt-2 font-bold">Shipping</p>
            </div>
            <div className="flex flex-col items-center">
              <p
                className={` ${
                  order?.order_status === "Delivered" ||
                  order?.order_status === "Completed"
                    ? "bg-[#088c2c] border-[#088c2c]"
                    : "bg-accent border-accent"
                } border  rounded-full flex justify-center items-center text-primary w-[40px] h-[40px] sm:w-[60px] sm:h-[60px]`}
              >
                {order?.order_status === "Delivered" ||
                order?.order_status === "Completed" ? (
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                ) : (
                  3
                )}
              </p>
              <p className="mt-2 font-bold">Delivered</p>
            </div>
            <div className="flex flex-col items-center">
              <p
                className={` ${
                  order?.order_status === "Completed"
                    ? "bg-[#088c2c] border-[#088c2c]"
                    : "bg-accent border-accent"
                } border rounded-full flex justify-center items-center text-primary w-[40px] h-[40px] sm:w-[60px] sm:h-[60px]`}
              >
                {order?.order_status === "Completed" ? (
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                ) : (
                  4
                )}
              </p>
              <p className="mt-2 font-bold">Completed</p>
            </div>
          </div>
        </div>
      ) : (
        track && (
          <p className="text-[#e02238] mt-6 font-bold">Invalid Order ID.</p>
        )
      )}
    </div>
  );
};

export default TrackOrder;
