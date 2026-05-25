import React from "react";
// import img from "../Images/shipping.jpg";
// import img from '../../../../Images/shipping.jpg';

export const metadata = {
  title: "Shipping Policy | Biborton| collections |",
  description:
    "Read Biborton| collections | shipping policy to understand our delivery processes, times, and eco-friendly practices. Your satisfaction is our priority",
  alternates: {
    canonical: "https://biborton.shop/shippingPolicy", // Adjusted from original which had /about accidentally?
  },
};

const ShippingPolicy = () => {
  return (
    <div className="px-[6%] py-[10%] sm:px-[10%] sm:py-[6%]">
      <h1 className="text-3xl text-center font-bold my-10 lg:text-4xl">
        Delivery and Shipping Policy
      </h1>
      <div className=" flex flex-col gap-10 justify-center items-center">
        <div>
          {/* <img src={img.src} alt="Shipping" width={600} height={600} /> */}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2 ">Shipping Methods:</h2>
          <p className="mb-4 text-black text-opacity-70">
            The shipping method you can choose from the checkout page determines
            how quickly your shipped item will be delivered.{" "}
          </p>
          <p className="mb-4 text-black text-opacity-70">
            We process one shipping address for one order. So please mention
            your desired shipping address in detail where you want to get
            delivery.{" "}
          </p>
          <h2 className="text-xl font-bold mb-2 ">Delivery Charge: </h2>
          <p className="mb-4 text-black text-opacity-70">
            The shipping method you can choose from the checkout page determines
            how quickly your shipped item will be delivered.{" "}
          </p>
          <p className="text-black text-opacity-70">
            We process one shipping address for one order. So please mention
            your desired shipping address in detail where you want to get
            delivery.{" "}
          </p>
          <h2 className="text-xl font-bold mb-2  mt-6">
            Delivery Information:{" "}
          </h2>
          <p className="mt-4 text-black text-opacity-70">
            1. Any order placed after 5 p.m. will be considered an order for the
            next business day, not the same day.
            <br />
            <br />
            2. Business Day: Saturday to Thursday except for public holidays.
            <br /> <br />
            3. Product color may vary slightly due to photographic lighting or
            your monitor settings.
            <br /> <br />
            4. The discount product is not changeable.
            <br /> <br />
            5. You must check the product before receiving the parcel. No
            complaints will be accepted after the product is received.
            <br /> <br />
            6. We highly value the urgency of your orders. We endeavor to make
            sure that your ordered products reach your door in the fastest
            possible time. Once your order is confirmed, you will receive a
            confirmation mail with the invoice. Please note every unpaid order
            will be reconfirmed over the phone. If we can’t reconfirm the order
            over the phone the order will be canceled within 24 hours
            <br /> <br />
            7. Your ordered products will be sent to your given address in 5 to
            7 working days
            <br /> <br />
            8. We start the shipping process within 24 hours. So, if you want to
            cancel or modify any order, please inform our customer support team
            as soon as possible via our Facebook page or over the phone:
            01969906700
            <br /> <br />
            9. No discounted/special offer item will be exchanged/refundable.
            <br /> <br />
          </p>
          <p className="mt-4 text-black text-opacity-70">
            Your shipping policy should be easy to find and understand, and
            should be updated regularly to reflect any changes in your shipping
            processes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
