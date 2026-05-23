import React from "react";

export const metadata = {
  title: "Refund Policy - MYNT| Fragrances |",
  description: "Read our Refund Policy.",
};

const Refund = () => {
  return (
    <div className="container mx-auto py-[10%]  sm:py-[6%]">
      {/* Kept external image URL as is */}
      <img className="mb-6 mx-auto w-[200px]" src="https://luvit.com.bd/wp-content/uploads/2026/04/MYNT-logo-1.png" alt="Logo" />
      <p className="text-xl text-center font-bold mb-16">
        MYNT Return Policy
      </p>
      <p className="font-bold">
        Thanks for shopping from MYNT Beauty & Fragrances.
      </p>
      <p>If you are unsatisfied with your purchase, we're here to help.</p>
      <p className="font-bold mt-6">MYNT Beauty & Fragrances Return Policy</p>
      <p>
        1. You have 3 calendar days to return an item from the date you received
        it.
        <br />
        2. To be eligible for a return, your item must be unused and in the same
        condition, you received it.
        <br />
        3. Your item must be in its original packaging.
        <br />
        4. Your item needs to have a receipt or proof of purchase.
        <br />
        5. For any kind of defective, damaged, or missing product issue, an
        unboxing video is mandatory as per our policy. Without an unboxing
        video, the policy will not be applicable.
      </p>
      <p className="font-bold mt-6">MYNT Beauty & Fragrances Refund Policy</p>
      <p>
        1. Once we receive your item, we will inspect it and notify you that we
        have received your returned item.
        <br />
        2. We will immediately notify you of the status of your refund after
        inspecting the item.
        <br />
        3. If your return is approved, we will initiate a refund to your method
        of payment.
        <br />
        4. You will receive the credit within a few days, depending on the
        refund issues.
      </p>
      <p className="font-bold mt-6">
        MYNT Beauty & Fragrances Delivery Charge Policy
      </p>
      <p>
        1. You will be responsible for paying for your own delivery charge for
        returning your item.
        <br />
        2. Delivery charges are nonrefundable.
        <br />
        3. If you receive a refund, the cost of return delivery will be deducted
        from your refund.
        <br />
      </p>
      <p className="font-bold mt-6">Contact MYNT Beauty & Fragrances</p>
      <p>
        If you have any questions on how to return your item to us:
        <span className="font-bold"> Inbox us on Facebook. </span> Or you can
        Contact us on <span className="font-bold">01969-906700</span> this
        number.
      </p>
      <p className="mt-4">
        <span className="font-bold">Note:</span> MYNT Beauty & Fragrances holds
        the terms and conditions of the Return & Refund Policy.
      </p>
    </div>
  );
};

export default Refund;
