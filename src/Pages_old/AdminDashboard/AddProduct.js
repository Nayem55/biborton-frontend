import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";

const AddProduct = () => {
  const [previewSource, setPreviewSource] = useState("");
  const [previewGallerySource, setPreviewGallerySource] = useState("");
  const [previewGallerySource1, setPreviewGallerySource1] = useState("");
  const [previewGallerySource2, setPreviewGallerySource2] = useState("");
  const [tagName, setTagName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [regPrice, setRegPrice] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [saleStatus, setSaleStatus] = useState(false);
  const [saleStartDate, setSaleStartDate] = useState(null);
  const [saleEndDate, setSaleEndDate] = useState(null);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState(0);
  const [stockStatus, setStockStatus] = useState("instock");
  const [cost, setCost] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [variations, setVariations] = useState([]);
  const [color, setColor] = useState("");
  const [code, setCode] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [metaTitle, setMetaTitle] = useState("");

  const handleAddTag = () => {
    tagName && setTags([...tags, tagName]);
    setTagName("");
  };

  const handleRemoveTag = (index) => {
    const rest = tags.filter((tag, i) => i !== index);
    setTags(rest);
  };
  const handleAddCategory = () => {
    categoryName && setCategories([...categories, categoryName]);
    setCategoryName("");
  };

  const handleRemoveCategory = (index) => {
    const rest = categories.filter((tag, i) => i !== index);
    setCategories(rest);
  };

  const handleAddAttribute = () => {
    const newAttribute = {
      name: key,
      options: [value],
    };
    setAttributes([...attributes, newAttribute]);
    setKey("");
    setValue("");
  };
  const handleRemoveAttribute = (index) => {
    const rest = attributes.filter((attribute, i) => i !== index);
    setAttributes(rest);
  };
  const handleAddVariations = () => {
    const newVariations = {
      name: color,
      code: code,
    };
    setVariations([...variations, newVariations]);
    setColor("");
    setCode("");
  };
  const handleRemoveVariations = (index) => {
    const rest = variations.filter((variation, i) => i !== index);
    setVariations(rest);
  };

  const handlePublish = () => {
    const data = {
      name: name,
      slug: slug,
      meta_title: metaTitle,
      status: "publish",
      description: description,
      short_description: shortDescription,
      date_created: new Date().toISOString(),
      sku: sku,
      price: regPrice,
      regular_price: regPrice,
      sale_price: salePrice,
      date_on_sale_from: new Date(saleStartDate).toISOString(),
      date_on_sale_from_gmt: null,
      date_on_sale_to: new Date(saleEndDate).toISOString(),
      date_on_sale_to_gmt: null,
      on_sale: JSON.parse(saleStatus),
      total_sales: 0,
      stock_quantity: stockQuantity,
      average_rating: "0.00",
      rating_count: 0,
      categories: categories.map((category) => {
        return {
          name: category,
        };
      }),
      tags: tags.map((tag) => {
        return {
          name: tag,
        };
      }),
      images: [
        {
          src: previewSource,
        },
        {
          src: previewGallerySource,
        },
        {
          src: previewGallerySource1,
        },
        {
          src: previewGallerySource2,
        },
      ],
      attributes: attributes,
      default_attributes: [],
      variations: variations,
      grouped_products: [],
      related_ids: [],
      stock_status: stockStatus,
      cost: cost,
      meta_description: metaDescription,
    };
    fetch("http://localhost:3200/addProduct", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    toast.success("Product added successfully");
    setName("");
    setSlug("");
    setCategories([]);
    setCategoryName("");
    setCost("");
    setDescription("");
    setPreviewGallerySource("");
    setPreviewGallerySource1("");
    setPreviewGallerySource2("");
    setPreviewSource("");
    setRegPrice();
    setSalePrice();
    setSaleStatus(false);
    setShortDescription("");
    setStockQuantity();
    setStockStatus();
    setTagName("");
    setTags([]);
    setMetaTitle("");
    setMetaDescription("");
  };
  const handleDraft = () => {
    const data = {
      name: name,
      slug: slug,
      meta_title: metaTitle,
      status: "draft",
      description: description,
      short_description: shortDescription,
      sku: sku,
      price: regPrice,
      regular_price: regPrice,
      sale_price: salePrice,
      date_on_sale_from: saleStartDate,
      date_on_sale_from_gmt: null,
      date_on_sale_to: saleEndDate,
      date_on_sale_to_gmt: null,
      on_sale: JSON.parse(saleStatus),
      total_sales: 0,
      stock_quantity: stockQuantity,
      average_rating: "0.00",
      rating_count: 0,
      categories: categories.map((category) => {
        return {
          name: category,
        };
      }),
      tags: tags.map((tag) => {
        return {
          name: tag,
        };
      }),
      images: [
        {
          src: previewSource,
        },
        {
          src: previewGallerySource,
        },
        {
          src: previewGallerySource1,
        },
        {
          src: previewGallerySource2,
        },
      ],
      attributes: attributes,
      default_attributes: [],
      variations: variations,
      grouped_products: [],
      related_ids: [],
      stock_status: stockStatus,
      cost: cost,
      meta_description: metaDescription,
    };
    fetch("http://localhost:3200/addProduct", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    toast.success("Product saved as draft");
  };

  return (
    <div className="mx-12 flex mb-20 ">
      <div className="w-[70%]">
        <h1 className="mt-12 mr-12 text-2xl ">Add New Product</h1>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          className="w-[100%] px-3 mt-10 border border-secondary py-1"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Slug name"
          value={slug}
          className="w-[100%] px-3 mt-10 border border-secondary py-1"
          onChange={(e) => setSlug(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Product meta title"
          value={metaTitle}
          className="w-[100%] px-3 mt-10 border border-secondary py-1"
          onChange={(e) => setMetaTitle(e.target.value)}
        ></input>
        <p className="mt-10 text-xl mb-6">Product description</p>
        <Editor
          apiKey="ywqhmibef4g9y6hz7jl7epetmo78x6v5xixuyvqav2nuw8rm" // Optional but recommended for using TinyMCE Cloud
          value={description}
          init={{
            height: 300,
            menubar: false,
            plugins: "image link code",
            toolbar:
              "undo redo | bold italic | alignleft aligncenter alignright | image code",
          }}
          onEditorChange={(newContent) => setDescription(newContent)}
        />
        <p className="mt-10 text-xl mb-6">Regular price (TK.)</p>
        <input
          type="text"
          className="w-[100%] px-3 border border-secondary py-1"
          value={regPrice}
          onChange={(e) => setRegPrice(e.target.value)}
        ></input>
        <p className="mt-10 text-xl mb-6">Sale price (TK.)</p>
        <input
          type="text"
          className="w-[100%] px-3 border border-secondary py-1"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
        ></input>
        <p className="mt-10 text-xl mb-6">Sale status</p>
        <select
          type="text"
          className="w-[100%] px-3 border border-secondary py-2"
          value={saleStatus}
          onChange={(e) => setSaleStatus(e.target.value)}
        >
          <option>false</option>
          <option>true</option>
        </select>
        <p className="mt-10 text-xl mb-6">Sale start date</p>
        <input
          type="date"
          className="w-[100%] px-3 border border-secondary py-1"
          value={saleStartDate}
          onChange={(e) => setSaleStartDate(e.target.value)}
        ></input>
        <p className="mt-10 text-xl mb-6">Sale end date</p>
        <input
          type="date"
          className="w-[100%] px-3 border border-secondary py-1"
          value={saleEndDate}
          onChange={(e) => setSaleEndDate(e.target.value)}
        ></input>
        <p className="mt-10 text-xl mb-6">Cost of Good</p>
        <input
          type="text"
          className="w-[100%] px-3  border border-secondary py-1"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        ></input>
        <p className="mt-10 text-xl mb-6">Product short description</p>
        <Editor
          apiKey="ywqhmibef4g9y6hz7jl7epetmo78x6v5xixuyvqav2nuw8rm" // Optional but recommended for using TinyMCE Cloud
          value={shortDescription}
          init={{
            height: 300,
            menubar: false,
            plugins: "image link code",
            toolbar:
              "undo redo | bold italic | alignleft aligncenter alignright | image code",
          }}
          onEditorChange={(newContent) => setShortDescription(newContent)}
        />
        <p className="mt-10 text-xl mb-6">Product meta description</p>
        <textarea
          rows={10}
          className="w-[100%] px-3 border border-secondary py-1"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
        ></textarea>
        <p className="mt-10 text-xl mb-6">Sku</p>
        <input
          type="text"
          className="w-[100%] px-3  border border-secondary py-1"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        ></input>
        <p className="mt-10 text-xl mb-6">Stock quantity</p>
        <input
          type="text"
          className="w-[100%] px-3  border border-secondary py-1"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        ></input>
        <p className="mt-10 text-xl mb-6">Stock status</p>
        <select
          type="text"
          className="w-[100%] px-4  border border-secondary py-2"
          value={stockStatus}
          onChange={(e) => setStockStatus(e.target.value)}
        >
          <option></option>
          <option>instock</option>
          <option>outofstock</option>
        </select>
      </div>
      <div className="w-[30%] mt-12">
        <div className="flex gap-10 ml-10 mt-[70px]">
          <button
            onClick={handleDraft}
            className="border border-accent text-accent flex justify-center items-center h-[35px] w-[160px] font-bold ease-in-out duration-300 hover:bg-accent hover:text-primary hover:border-none"
          >
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            className="border border-accent flex justify-center items-center h-[35px] w-[160px] ease-in-out duration-300 bg-accent text-primary font-bold  hover:bg-primary hover:text-accent"
          >
            Publish
          </button>
        </div>
        <div className="ml-10 mt-[50px] text-xl">
          <p className="mb-6">Product Image</p>
          <div>
            {previewSource && (
              <img src={previewSource} alt="" className="my-4"></img>
            )}
          </div>
          {/* <input onChange={handleChange} type="file"></input> */}
          <input
            onChange={(e) => setPreviewSource(e.target.value)}
            value={previewSource}
            placeholder="Enter image url"
            type="text"
            className="w-[84%] px-3  border border-secondary py-1"
          ></input>
          <p className="mb-6 mt-10">Product Gallery</p>
          <div className="flex gap-4">
            <div>
              {previewGallerySource && (
                <img
                  src={previewGallerySource}
                  alt=""
                  className="my-4 h-[100px]"
                ></img>
              )}
            </div>
            <div>
              {previewGallerySource1 && (
                <img
                  src={previewGallerySource1}
                  alt=""
                  className="my-4 h-[100px]"
                ></img>
              )}
            </div>
            <div>
              {previewGallerySource2 && (
                <img
                  src={previewGallerySource2}
                  alt=""
                  className="my-4 h-[100px]"
                ></img>
              )}
            </div>
          </div>
          {/* <input multiple onChange={handleChangeGallery} type="file"></input> */}
          <input
            onChange={(e) => setPreviewGallerySource(e.target.value)}
            value={previewGallerySource}
            placeholder="Enter image url"
            type="text"
            className="w-[84%] px-3 mb-4 border border-secondary py-1"
          ></input>
          <input
            onChange={(e) => setPreviewGallerySource1(e.target.value)}
            value={previewGallerySource1}
            placeholder="Enter image url"
            type="text"
            className="w-[84%] px-3 mb-4 border border-secondary py-1"
          ></input>
          <input
            onChange={(e) => setPreviewGallerySource2(e.target.value)}
            value={previewGallerySource2}
            placeholder="Enter image url"
            type="text"
            className="w-[84%] px-3  border border-secondary py-1"
          ></input>
          <div>
            <p className="mt-10 mb-6">Product Tags</p>
            <div className="flex items-center">
              <input
                onChange={(e) => setTagName(e.target.value)}
                value={tagName}
                type="text"
                className="border border-secondary px-2 w-[60%]"
              ></input>
              <button
                onClick={handleAddTag}
                className="border border-accent bg-accent text-primary w-[20%] px-3 text-sm flex justify-center items-center pt-[6px] pb-[3px] ml-4 ease-in-out duration-300 hover:bg-primary hover:text-accent"
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap my-4">
            {tags.map((tag, i) => (
              <div className="border border-accent px-4 pb-1 pt-2  flex justify-between items-center gap-4 ">
                <p className="text-sm">{tag}</p>
                <button className="text-sm" onClick={() => handleRemoveTag(i)}>
                  X
                </button>
              </div>
            ))}
          </div>
          <div>
            <p className="mt-6 mb-6">Product Categories</p>
            <div className="flex items-center">
              <input
                onChange={(e) => setCategoryName(e.target.value)}
                value={categoryName}
                type="text"
                className="border border-secondary px-2 w-[60%]"
              ></input>
              <button
                onClick={handleAddCategory}
                className="border border-accent bg-accent text-primary w-[20%] px-3 text-sm flex justify-center items-center pt-[6px] pb-[3px] ml-4 ease-in-out duration-300 hover:bg-primary hover:text-accent"
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap my-4">
            {categories.map((category, i) => (
              <div className="border border-accent px-4 pb-1 pt-2  flex justify-between items-center gap-4 ">
                <p className="text-sm">{category}</p>
                <button
                  className="text-sm"
                  onClick={() => handleRemoveCategory(i)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <div>
            <p>Add Attributes</p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setKey(e.target.value)}
                value={key}
                type="text"
                placeholder="Key"
                className="border border-secondary px-2 mt-4 w-[20%]"
              ></input>
              <input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                type="text"
                className="border border-secondary px-2 mt-4 w-[20%] "
                placeholder="Value"
              ></input>
              <button
                onClick={handleAddAttribute}
                className="border border-accent bg-accent text-primary w-[20%] px-3 text-sm flex justify-center items-center pt-[6px] pb-[3px] mt-4 ml-4 ease-in-out duration-300 hover:bg-primary hover:text-accent"
              >
                Add
              </button>
            </div>
          </div>
          <div>
            {attributes.map((attribute, i) => (
              <div className="pb-1 pt-2 mt-4 w-[60%] flex justify-between items-center gap-4 ">
                <div className="flex gap-4">
                  <p className="text-sm border border-accent px-6 py-1 ">
                    {attribute?.name}
                  </p>
                  <p className="text-sm border border-accent px-6 py-1 ">
                    {" "}
                    {attribute?.options[0]}
                  </p>
                </div>
                <button
                  className="text-sm"
                  onClick={() => handleRemoveAttribute(i)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p>Add Variations</p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setColor(e.target.value)}
                value={color}
                type="text"
                placeholder="color"
                className="border border-secondary px-2 mt-4 w-[20%]"
              ></input>
              <input
                onChange={(e) => setCode(e.target.value)}
                value={code}
                type="text"
                className="border border-secondary px-2 mt-4 w-[20%] "
                placeholder="code"
              ></input>
              <button
                onClick={handleAddVariations}
                className="border border-accent bg-accent text-primary w-[20%] px-3 text-sm flex justify-center items-center pt-[6px] pb-[3px] mt-4 ml-4 ease-in-out duration-300 hover:bg-primary hover:text-accent"
              >
                Add
              </button>
            </div>
          </div>
          <div>
            {variations.map((variation, i) => (
              <div className="pb-1 pt-2 mt-4 w-[60%] flex justify-between items-center gap-4 ">
                <div className="flex gap-4">
                  <p className="text-sm border border-accent px-6 py-1 ">
                    {variation?.name}
                  </p>
                  <p className="text-sm border border-accent px-6 py-1 ">
                    {" "}
                    {variation?.code}
                  </p>
                </div>
                <button
                  className="text-sm"
                  onClick={() => handleRemoveVariations(i)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
