import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import InvoiceContent from "../../Components/PackingSlip/PackingSlip";
import PackingSlip from "../../Components/PackingSlip/PackingSlip";
import Invoice from "../../Components/Invoice/Invoice";

const OrderList = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [orderRefs, setOrderRefs] = useState([]);
  const [invoiceRefs, setInvoiceRefs] = useState([]);
  const [filterBy, setFilterBy] = useState("Name");
  console.log(searchedText);

  useEffect(() => {
    fetch("http://localhost:3200/orderCount")
      .then((res) => res.json())
      .then((data) => {
        const count = data.count;
        const pages = Math.ceil(count / 50);
        setPageCount(pages);
      });
  }, []);

  useEffect(() => {
    setOrders([]);
    setLoading(true);
    fetch(`http://localhost:3200/orders?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    setOrderRefs(orders.map(() => React.createRef()));
    setInvoiceRefs(orders.map(() => React.createRef()));
  }, [orders]);

  const handleDelete = (id) => {
    fetch(`http://localhost:3200/deleteorder/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    toast.success("Order deleted sucessfully");
    const rest = orders.filter((order) => order._id !== id);
    setOrders(rest);
  };

  const handleSearch = () => {
    setOrders([]);
    setLoading(true);
    if (filterBy === "Name") {
      fetch(`http://localhost:3200/searchOrder/${searchedText}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        });
    } else if (filterBy === "Phone") {
      fetch(`http://localhost:3200/searchOrderByPhone/${searchedText}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        });
    } else {
      fetch(`http://localhost:3200/searchOrderById/${searchedText}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        });
    }
  };
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
    <div>
      <div className="flex justify-between mx-12">
        <div className="flex">
          <h1 className="mt-12 mr-12 text-2xl">Orders</h1>
          <div className="flex gap-4 items-center mt-12">
            <p>Filter by : </p>
            <select
              onChange={(e) => setFilterBy(e.target.value)}
              className="border border-secondary px-6 py-2"
            >
              <option>Name</option>
              <option>Phone</option>
              <option>Order ID</option>
            </select>
          </div>
          {/* <Link
            to="/admin/addorder"
            className="px-6 mt-12 mr-6 border flex justify-center items-center border-accent bg-primary text-accent hover:bg-accent hover:text-primary ease-in-out duration-300 "
          >
            Add New
          </Link>
          <Link className="px-6 mt-12 border border-accent flex justify-center items-center bg-primary text-accent hover:bg-accent hover:text-primary ease-in-out duration-300 ">
            Bulk Edit
          </Link> */}
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="border border-secondary px-4 py-1 border-opacity-40"
            onChange={(e) => setSearchedText(e.target.value)}
            value={searchedText}
          ></input>
          <button
            onClick={handleSearch}
            className="px-6 mt-12 ml-4 py-1 border border-accent bg-primary text-accent hover:bg-accent hover:text-primary ease-in-out duration-300 "
          >
            Search
          </button>
        </div>
      </div>
      {/*.................. pagination ....................*/}
      {pageCount > 1 && (
        <div className="pages">
          {[...Array(pageCount).keys()].map((index) => (
            <button
              className={page === index ? "selected" : ""}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      {/*.................. pagination ....................*/}
      {orders.length < 1 && loading ? (
        <div className="flex justify-center items-center h-[90vh]">
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
      ) : (
        <div className="overflow-x-auto">
          <table className="product-table">
            {/* head */}
            <thead className="bg-accent text-primary">
              <tr>
                <th></th>
                <th>Order</th>
                <th>Platform</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/*................table row............... */}
              {orders?.map((order, i) => (
                <tr className="">
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <Link
                      to={`/admin/order/${order?._id}`}
                      className="flex items-center space-x-3 hover:text-accent hover:underline"
                    >
                      <div>
                        <p className="font-bold">{order?.id}</p>
                        <p className="font-bold">
                          {order?.billing?.first_name +
                            " " +
                            order?.billing?.last_name}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td>{order.platform}</td>
                  <td>
                    {months[new Date(order?.order_date).getMonth()]}{" "}
                    {new Date(order?.order_date).getDate()},{" "}
                    {new Date(order?.order_date).getFullYear()}{" "}
                  </td>
                  <td className={` font-bold `}>{order?.order_status}</td>
                  <td>TK. {order?.total}</td>
                  <td>{order?.payment_method}</td>
                  {/* <td>{order?.set_paid?"Paid":"Not Paid"}</td> */}
                  <td>
                    <Link to={`/admin/order/${order._id}`} className="mr-4">
                      <FontAwesomeIcon
                        className="text-[#8ed03a]"
                        icon={faPenToSquare}
                      ></FontAwesomeIcon>
                    </Link>
                    <Link
                      onClick={() => {
                        setDeletedId(order._id);
                        document.getElementById("confirmation").showModal();
                      }}
                    >
                      <FontAwesomeIcon
                        className="text-[#b14444]"
                        icon={faTrash}
                      ></FontAwesomeIcon>
                    </Link>
                    <PackingSlip
                      orderRefs={orderRefs}
                      i={i}
                      orderContent={order}
                    ></PackingSlip>
                    <ReactToPrint
                      trigger={() => (
                        <button className="ml-2 px-2 py-1 bg-secondary text-primary rounded hover:bg-accent ease-in-out duration-200">
                          Packing Slip
                        </button>
                      )}
                      content={() => orderRefs[i].current}
                    ></ReactToPrint>
                    <Invoice
                      invoiceRefs={invoiceRefs}
                      i={i}
                      orderContent={order}
                    ></Invoice>
                    <ReactToPrint
                      trigger={() => (
                        <button className="ml-2 px-2 py-1 bg-secondary text-primary rounded hover:bg-accent ease-in-out duration-200">
                          Invoice
                        </button>
                      )}
                      content={() => invoiceRefs[i].current}
                    ></ReactToPrint>
                    <dialog
                      id="confirmation"
                      className="bg-accent rounded p-10"
                    >
                      <form method="dialog" className="">
                        <button className="btn text-primary btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                        <h3 className="font-bold text-lg text-primary">
                          Confirm Delete !
                        </h3>
                        <p className="py-4 text-primary">
                          Are you sure you want to delete this order ?
                        </p>
                        <button
                          onClick={() => handleDelete(deletedId)}
                          className="btn py-3 bg-primary text-accent border-none"
                        >
                          Confirm
                        </button>
                      </form>
                    </dialog>
                  </td>
                </tr>
              ))}
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
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/*.................. pagination ....................*/}
      {pageCount > 1 && (
        <div className="pages mb-[100px]">
          {[...Array(pageCount).keys()].map((index) => (
            <button
              className={page === index ? "selected" : ""}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      {/*.................. pagination ....................*/}
    </div>
  );
};

export default OrderList;

//npm install react react-dom react-modal
