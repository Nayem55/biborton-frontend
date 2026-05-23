import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [pageCount, setPageCount] = useState(0);
  // const [page, setPage] = useState(localStorage.getItem("page"));
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletedId, setDeletedId] = useState();

  useEffect(() => {
    fetch("http://localhost:3200/productCount")
      .then((res) => res.json())
      .then((data) => {
        const count = data.count;
        const pages = Math.ceil(count / 50);
        setPageCount(pages);
      });
  }, []);

  useEffect(() => {
    setProducts([]);
    setLoading(true);
    fetch(`http://localhost:3200/Allproducts?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [page]);

  const handleDelete = (id) => {
    fetch(`http://localhost:3200/deleteProduct/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    toast.success("Product deleted sucessfully");
    const rest = products.filter((product) => product._id !== id);
    setProducts(rest);
    console.log(id, "deleted");
  };

  const handleSearch = () => {
    setProducts([]);
    setLoading(true);
    fetch(`http://localhost:3200/search/${searchedText}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        setPageCount(0);
      });
  };

  return (
    <div>
      <div className="flex justify-between mx-12">
        <div className="flex">
          <h1 className="mt-12 mr-12 text-2xl">Products</h1>
          <Link
            to="/admin/addProduct"
            className="px-6 mt-12 mr-6 border flex justify-center items-center border-accent bg-primary text-accent hover:bg-accent hover:text-primary ease-in-out duration-300"
          >
            Add New
          </Link>
          <Link
            to="/admin/filter"
            className="px-6 mt-12 border border-accent flex justify-center items-center bg-primary text-accent hover:bg-accent hover:text-primary ease-in-out duration-300 "
          >
            Bulk Edit
          </Link>
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
              className={page == index ? "selected" : ""}
              onClick={() => {
                setPage(index);
                localStorage.setItem("page", index);
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      {/*.................. pagination ....................*/}
      {products.length < 1 && loading ? (
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
                <th>Name</th>
                <th>Short Link</th>
                <th>SKU</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Categories</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/*................table row............... */}
              {products?.map((product) => (
                <tr className="">
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          {product?.images && (
                            <img src={product?.images[0]?.src} alt="" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">{product?.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <textarea
                      className="border border-black p-2"
                      value={`https://themynt.shop/sku/${product?.sku}`}
                    />
                  </td>
                  <td>{product?.sku ? product?.sku : "--"}</td>
                  <td
                    className={` font-bold ${
                      product?.stock_quantity > 0
                        ? "text-[#8ed03a]"
                        : "text-[#b14444]"
                    }`}
                  >
                    {product?.stock_quantity > 0
                      ? `In stock (${product?.stock_quantity})`
                      : `Out of stock (${product?.stock_quantity})`}
                  </td>
                  <td>TK. {product?.price}</td>
                  <td>
                    {product?.categories?.map((category) => (
                      <p>{category?.name} , </p>
                    ))}
                  </td>
                  <td>
                    {product?.tags?.map((tag) => (
                      <p>{tag?.name} , </p>
                    ))}
                  </td>
                  <td>{product?.status}</td>
                  <td>
                    <Link
                      to={`/admin/editProduct/${product._id}`}
                      className="mr-4"
                    >
                      <FontAwesomeIcon
                        className="text-[#8ed03a]"
                        icon={faPenToSquare}
                      ></FontAwesomeIcon>
                    </Link>
                    <Link
                      onClick={() => {
                        setDeletedId(product._id);
                        document.getElementById("confirmation").showModal();
                      }}
                    >
                      <FontAwesomeIcon
                        className="text-[#b14444]"
                        icon={faTrash}
                      ></FontAwesomeIcon>
                    </Link>
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
                          Are you sure you want to delete this item ?
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
                <th>Name</th>
                <th>Short Link</th>
                <th>SKU</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Categories</th>
                <th>Tags</th>
                <th>Status</th>
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
              className={page == index ? "selected" : ""}
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

export default AllProducts;

//npm install react react-dom react-modal
