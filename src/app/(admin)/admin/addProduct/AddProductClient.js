"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";
import { FASHION_CATEGORIES } from "../../../../lib/fashionMenuConfig";

const AddProductClient = () => {
  const [previewSource, setPreviewSource] = useState("");
  const [previewGallerySource, setPreviewGallerySource] = useState("");
  const [previewGallerySource1, setPreviewGallerySource1] = useState("");
  const [previewGallerySource2, setPreviewGallerySource2] = useState("");
  const [tagName, setTagName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [regPrice, setRegPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [saleStatus, setSaleStatus] = useState("false");
  const [saleStartDate, setSaleStartDate] = useState("");
  const [saleEndDate, setSaleEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockStatus, setStockStatus] = useState("instock");
  const [cost, setCost] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [variations, setVariations] = useState([]);
  const [color, setColor] = useState("");
  const [code, setCode] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [metaTitle, setMetaTitle] = useState("");

  // ────────────────────────────────────────────────
  //   handlers (এগুলো একদম আগের মতোই রাখা আছে)
  // ────────────────────────────────────────────────
  const handleAddTag = () => {
    if (tagName.trim()) {
      setTags([...tags, tagName.trim()]);
      setTagName("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      setCategories([...categories, categoryName.trim()]);
      setCategoryName("");
    }
  };

  const handleRemoveCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleAddAttribute = () => {
    if (key.trim() && value.trim()) {
      setAttributes([...attributes, { name: key.trim(), options: [value.trim()] }]);
      setKey("");
      setValue("");
    }
  };

  const handleRemoveAttribute = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const handleAddVariations = () => {
    if (color.trim() && code.trim()) {
      setVariations([...variations, { name: color.trim(), code: code.trim() }]);
      setColor("");
      setCode("");
    }
  };

  const handleRemoveVariations = (index) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  const prepareProductData = (status) => ({
    name,
    slug,
    meta_title: metaTitle,
    status,
    description,
    short_description: shortDescription,
    date_created: new Date().toISOString(),
    sku,
    price: regPrice,
    regular_price: regPrice,
    sale_price: salePrice,
    date_on_sale_from: saleStartDate ? new Date(saleStartDate).toISOString() : null,
    date_on_sale_from_gmt: null,
    date_on_sale_to: saleEndDate ? new Date(saleEndDate).toISOString() : null,
    date_on_sale_to_gmt: null,
    on_sale: saleStatus === "true",
    total_sales: 0,
    stock_quantity: Number(stockQuantity) || 0,
    average_rating: "0.00",
    rating_count: 0,
    categories: categories.map((name) => ({ name })),
    tags: tags.map((name) => ({ name })),
    images: [
      { src: previewSource },
      { src: previewGallerySource },
      { src: previewGallerySource1 },
      { src: previewGallerySource2 },
    ].filter((img) => img.src?.trim()),
    attributes,
    default_attributes: [],
    variations,
    grouped_products: [],
    related_ids: [],
    stock_status: stockStatus,
    cost,
    meta_description: metaDescription,
  });

  const handlePublish = () => {
    const data = prepareProductData("publish");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/addProduct`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .catch((err) => console.error(err));

    toast.success("Product added successfully");

    // reset form
    setName("");
    setSlug("");
    setMetaTitle("");
    setDescription("");
    setShortDescription("");
    setMetaDescription("");
    setSku("");
    setRegPrice("");
    setSalePrice("");
    setSaleStatus("false");
    setSaleStartDate("");
    setSaleEndDate("");
    setCost("");
    setStockQuantity("");
    setStockStatus("instock");
    setPreviewSource("");
    setPreviewGallerySource("");
    setPreviewGallerySource1("");
    setPreviewGallerySource2("");
    setTags([]);
    setCategories([]);
    setAttributes([]);
    setVariations([]);
  };

  const handleDraft = () => {
    const data = prepareProductData("draft");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/addProduct`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .catch((err) => console.error(err));

    toast.success("Product saved as draft");
  };

  return (
    <div className="min-h-screen bg-gray-50/40 py-10 px-2 md:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header + Buttons */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>

          <div className="flex items-center gap-4">
            <button
              onClick={handleDraft}
              className="px-6 py-2 text-sm rounded-lg  border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 border"
            >
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              className="px-8 py-2 text-sm rounded-lg bg-[#49ADFF] text-white font-medium hover:bg-[#40a0f0] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Publish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content – Left Side */}
          <div className="lg:col-span-8 space-y-8">
            {/* Card wrapper */}
            <div className="bg-white   rounded-xl border border-gray-200 p-6 md:p-8">
              <div className="space-y-7">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs rounded-lg border-gray-300 border  focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                    placeholder="product-url-friendly-slug"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                    placeholder="SEO friendly title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>
                  <div className=" border-gray-300 rounded-lg overflow-hidden border focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                    <Editor
                      apiKey="h86rpxhf2vvrathsd6ctr82yckmjy5roq36005saoeq81uul"
                      value={description}
                      init={{
                        height: 320,
                        menubar: false,
                        plugins: "image link code lists",
                        toolbar:
                          "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image code",
                        content_style: "body { font-family: inherit; font-size: 16px; }",
                      }}
                      onEditorChange={setDescription}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Regular Price (TK)
                    </label>
                    <input
                      type="text"
                      value={regPrice}
                      onChange={(e) => setRegPrice(e.target.value)}
                      className="w-full text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Sale Price (TK)
                    </label>
                    <input
                      type="text"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      className="w-full  text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Sale Status
                    </label>
                    <select
                      value={saleStatus}
                      onChange={(e) => setSaleStatus(e.target.value)}
                      className="w-full text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Sale Start
                    </label>
                    <input
                      type="date"
                      value={saleStartDate}
                      onChange={(e) => setSaleStartDate(e.target.value)}
                      className="w-full text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Sale End
                    </label>
                    <input
                      type="date"
                      value={saleEndDate}
                      onChange={(e) => setSaleEndDate(e.target.value)}
                      className="w-full text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Cost of Goods (TK)
                  </label>
                  <input
                    type="text"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                    placeholder="Cost price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Short Description
                  </label>
                  <div className=" border-gray-300 rounded-lg overflow-hidden border focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                    <Editor
                      apiKey="h86rpxhf2vvrathsd6ctr82yckmjy5roq36005saoeq81uul"
                      value={shortDescription}
                      init={{
                        height: 220,
                        menubar: false,
                        plugins: "lists",
                        toolbar: "undo redo | bold italic | bullist numlist",
                        content_style: "body { font-family: inherit; font-size: 15px; }",
                      }}
                      onEditorChange={setShortDescription}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Meta Description
                  </label>
                  <textarea
                    rows={5}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="w-full text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                    placeholder="SEO description (150-160 characters ideal)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      SKU
                    </label>
                    <input
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                      placeholder="Stock Keeping Unit"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={stockQuantity}
                      onChange={(e) => setStockQuantity(e.target.value)}
                      className="w-full text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Stock Status
                  </label>
                  <select
                    value={stockStatus}
                    onChange={(e) => setStockStatus(e.target.value)}
                    className="w-full text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                  >
                    <option value="instock">In Stock</option>
                    <option value="outofstock">Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar – Right Side */}
          <div className="lg:col-span-4 space-y-8">
            {/* Product Image & Gallery */}
            <div className="bg-white  rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">Media</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  {previewSource && (
                    <div className="mb-3 rounded-lg overflow-hidden  border-gray-200 border">
                      <img
                        src={previewSource}
                        alt="preview"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="url"
                    value={previewSource}
                    onChange={(e) => setPreviewSource(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4 "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gallery Images
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[previewGallerySource, previewGallerySource1, previewGallerySource2].map(
                      (src, idx) =>
                        src && (
                          <div
                            key={idx}
                            className="rounded-lg overflow-hidden  border-gray-200 border aspect-square"
                          >
                            <img
                              src={src}
                              alt={`gallery-${idx}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )
                    )}
                  </div>

                  <div className="space-y-3">
                    <input
                      type="url"
                      value={previewGallerySource}
                      onChange={(e) => setPreviewGallerySource(e.target.value)}
                      placeholder="Gallery image 1 url"
                      className="w-full text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4 "
                    />
                    <input
                      type="url"
                      value={previewGallerySource1}
                      onChange={(e) => setPreviewGallerySource1(e.target.value)}
                      placeholder="Gallery image 2 url"
                      className="w-full rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4 text-xs"
                    />
                    <input
                      type="url"
                      value={previewGallerySource2}
                      onChange={(e) => setPreviewGallerySource2(e.target.value)}
                      placeholder="Gallery image 3 url"
                      className="w-full rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white  rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                  placeholder="New tag..."
                  className="flex-1 text-xs min-w-[140px] rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                />
                <button
                  onClick={handleAddTag}
                  className="px-5 text-sm py-2 bg-[#49ADFF] text-white rounded-lg hover:bg-[#4da5ec] transition"
                >
                  Add
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm border border-indigo-200"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(i)}
                      className="text-indigo-600 hover:text-indigo-800 font-bold text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white border rounded-xl  border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                  placeholder="New category..."
                  className="flex-1 text-xs rounded-lg min-w-[140px] border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                />
                <button
                  onClick={handleAddCategory}
                  className="px-5 py-2 text-sm bg-[#49ADFF] text-white rounded-lg hover:bg-[#3e9deb] transition"
                >
                  Add
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((cat, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm border border-purple-200"
                  >
                    {cat}
                    <button
                      onClick={() => handleRemoveCategory(i)}
                      className="text-purple-600 text-sm hover:text-purple-800 font-bold "
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <p className="text-xs text-gray-500 mb-2">
                  Quick add fashion categories:
                </p>
                <div className="flex flex-wrap gap-2 max-h-44 overflow-y-auto">
                  {FASHION_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        setCategories((prev) =>
                          prev.includes(cat) ? prev : [...prev, cat],
                        )
                      }
                      className="px-3 py-1 text-xs rounded-full border border-gray-300 hover:border-[#b82332] hover:text-[#b82332] transition"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Attributes & Variations – optional collapse possible */}
            <div className="bg-white border rounded-xl  border-gray-200 p-6 space-y-8">
              {/* Attributes */}
              <div>
                <h3 className="text-base font-semibold mb-3">Attributes</h3>
                <div className="flex flex-wrap gap-3">
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Attribute name"
                    className="flex-1 min-w-[140px] text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Value"
                    className="flex-1 min-w-[140px] text-xs rounded-lg border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                  />
                  <button
                    onClick={handleAddAttribute}
                    className="px-5 py-2 bg-gray-800 text-sm text-white rounded-lg hover:bg-gray-900 transition whitespace-nowrap"
                  >
                    Add
                  </button>
                </div>

                <div className="mt-5 space-y-2">
                  {attributes.map((attr, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-800">{attr.name}:</span>
                        <span className="text-gray-600">{attr.options[0]}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveAttribute(i)}
                        className="text-red-600 text-sm hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Variations */}
              <div>
                <h3 className="text-base font-semibold mb-3">Variations</h3>
                <div className="flex flex-wrap gap-3">
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Color / Size / etc"
                    className="flex-1 min-w-[140px] rounded-lg text-xs border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                  />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Code / SKU"
                    className="flex-1 min-w-[140px] rounded-lg text-xs border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                  />
                  <button
                    onClick={handleAddVariations}
                    className="px-5 py-2 bg-gray-800 text-sm text-white rounded-lg hover:bg-gray-900 transition whitespace-nowrap"
                  >
                    Add
                  </button>
                </div>

                <div className="mt-5 space-y-2">
                  {variations.map((v, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-800">{v.name}</span>
                        <span className="text-gray-500 text-sm">({v.code})</span>
                      </div>
                      <button
                        onClick={() => handleRemoveVariations(i)}
                        className="text-red-600 text-sm hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductClient;