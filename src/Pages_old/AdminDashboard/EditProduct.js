"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";

const EditProduct = () => {
  const [previewSource, setPreviewSource] = useState("");
  const [previewGallerySource, setPreviewGallerySource] = useState("");
  const [previewGallerySource1, setPreviewGallerySource1] = useState("");
  const [previewGallerySource2, setPreviewGallerySource2] = useState("");
  const [previewGallerySource3, setPreviewGallerySource3] = useState("");
  const [previewGallerySource4, setPreviewGallerySource4] = useState("");
  const [previewGallerySource5, setPreviewGallerySource5] = useState("");
  const [previewGallerySource6, setPreviewGallerySource6] = useState("");
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
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockStatus, setStockStatus] = useState("instock");
  const [cost, setCost] = useState("");
  const { id } = useParams();
  const [attributes, setAttributes] = useState([]);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [variations, setVariations] = useState([]);
  const [color, setColor] = useState("");
  const [code, setCode] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [metaTitle, setMetaTitle] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3200/backendProduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "");
        setMetaTitle(data.meta_title || "");
        setSlug(data.slug || "");
        setSku(data.sku || "");
        setDescription(data.description || "");
        setShortDescription(data.short_description || "");
        setRegPrice(data.regular_price || "");
        setSalePrice(data.sale_price || "");
        setSaleStatus(data.on_sale ? "true" : "false");
        setStockQuantity(data.stock_quantity || "");
        setStockStatus(data.stock_status || "instock");
        setSaleStartDate(data.date_on_sale_from?.split("T")[0] || "");
        setSaleEndDate(data.date_on_sale_to?.split("T")[0] || "");
        setPreviewSource(data.images?.[0]?.src || "");
        setPreviewGallerySource(data.images?.[1]?.src || "");
        setPreviewGallerySource1(data.images?.[2]?.src || "");
        setPreviewGallerySource2(data.images?.[3]?.src || "");
        setPreviewGallerySource3(data.images?.[4]?.src || "");
        setPreviewGallerySource4(data.images?.[5]?.src || "");
        setPreviewGallerySource5(data.images?.[6]?.src || "");
        setPreviewGallerySource6(data.images?.[7]?.src || "");
        setVariations(data.variations || []);
        setAttributes(data.attributes || []);
        setMetaDescription(data.meta_description || "");

        setTags(data.tags?.map((t) => t.name) || []);
        setCategories(data.categories?.map((c) => c.name) || []);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

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
      setAttributes([
        ...attributes,
        { name: key.trim(), options: [value.trim()] },
      ]);
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

  const prepareData = (status) => ({
    name,
    slug,
    meta_title: metaTitle,
    status,
    description,
    short_description: shortDescription,
    price: regPrice,
    regular_price: regPrice,
    sale_price: salePrice,
    date_on_sale_from: saleStartDate || null,
    date_on_sale_from_gmt: null,
    date_on_sale_to: saleEndDate || null,
    date_on_sale_to_gmt: null,
    on_sale: saleStatus === "true",
    stock_quantity: Number(stockQuantity) || 0,
    categories: categories.map((name) => ({ name })),
    tags: tags.map((name) => ({ name })),
    images: [
      { src: previewSource },
      { src: previewGallerySource },
      { src: previewGallerySource1 },
      { src: previewGallerySource2 },
      { src: previewGallerySource3 },
      { src: previewGallerySource4 },
      { src: previewGallerySource5 },
      { src: previewGallerySource6 },
    ].filter((img) => img.src?.trim()),
    attributes,
    default_attributes: [],
    variations,
    grouped_products: [],
    stock_status: stockStatus,
    cost,
    sku,
    meta_description: metaDescription,
  });

  const handleUpdateAndPublish = () => {
    const data = prepareData("publish");
    fetch(`http://localhost:3200/editProduct/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => console.log(resData))
      .catch((err) => console.error(err));

    toast.success("Product updated & published");
  };

  const handleUpdateAndDraft = () => {
    const data = prepareData("draft");
    fetch(`http://localhost:3200/editProduct/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => console.log(resData))
      .catch((err) => console.error(err));

    toast.success("Product updated & saved as draft");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-5 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header + Actions */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>

          <div className="flex items-center gap-4">
            <button
              onClick={handleUpdateAndDraft}
              className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition shadow-sm"
            >
              Save Draft
            </button>
            <button
              onClick={handleUpdateAndPublish}
              className="px-8 py-2.5 rounded-lg bg-[#49ADFF] text-white font-medium hover:bg-[#439de6] hover:scale-105 transition shadow-md hover:shadow-lg"
            >
              Update & Publish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form – Left */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 md:p-8">
              <div className="space-y-7">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4"
                    placeholder="Product name"
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
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4"
                    placeholder="url-friendly-slug"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                    <Editor
                      apiKey="ywqhmibef4g9y6hz7jl7epetmo78x6v5xixuyvqav2nuw8rm"
                      value={description}
                      init={{
                        height: 340,
                        menubar: false,
                        plugins: "lists image link code",
                        toolbar:
                          "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image code",
                        content_style:
                          "body { font-family: inherit; font-size: 16px; }",
                      }}
                      onEditorChange={setDescription}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Regular Price (৳)
                    </label>
                    <input
                      type="text"
                      value={regPrice}
                      onChange={(e) => setRegPrice(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Sale Price (৳)
                    </label>
                    <input
                      type="text"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      On Sale?
                    </label>
                    <select
                      value={saleStatus}
                      onChange={(e) => setSaleStatus(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4"
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
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4"
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
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Cost of Goods (৳)
                  </label>
                  <input
                    type="text"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4"
                    placeholder="Purchase / production cost"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Short Description
                  </label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
                    <Editor
                      apiKey="ywqhmibef4g9y6hz7jl7epetmo78x6v5xixuyvqav2nuw8rm"
                      value={shortDescription}
                      init={{
                        height: 220,
                        menubar: false,
                        plugins: "lists",
                        toolbar: "undo redo | bold italic | bullist numlist",
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
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4"
                    placeholder="SEO description ~150-160 chars"
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
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4"
                    placeholder="SEO page title"
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
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4"
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
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4"
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
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4"
                  >
                    <option value="instock">In Stock</option>
                    <option value="outofstock">Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar – Right */}
          <div className="lg:col-span-4 space-y-8">
            {/* Media */}
            <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Product Media
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  {previewSource && (
                    <div className="mb-3 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <img
                        src={previewSource}
                        alt="Featured"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="url"
                    value={previewSource}
                    onChange={(e) => setPreviewSource(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gallery (up to 7)
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      previewGallerySource,
                      previewGallerySource1,
                      previewGallerySource2,
                      previewGallerySource3,
                      previewGallerySource4,
                      previewGallerySource5,
                      previewGallerySource6,
                    ]
                      .filter(Boolean)
                      .map((src, idx) => (
                        <div
                          key={idx}
                          className="aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm"
                        >
                          <img
                            src={src}
                            alt={`gallery-${idx}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                  </div>

                  <div className="space-y-3">
                    {[
                      setPreviewGallerySource,
                      setPreviewGallerySource1,
                      setPreviewGallerySource2,
                      setPreviewGallerySource3,
                      setPreviewGallerySource4,
                      setPreviewGallerySource5,
                      setPreviewGallerySource6,
                    ].map((setter, idx) => {
                      const values = [
                        previewGallerySource,
                        previewGallerySource1,
                        previewGallerySource2,
                        previewGallerySource3,
                        previewGallerySource4,
                        previewGallerySource5,
                        previewGallerySource6,
                      ];
                      return (
                        <input
                          key={idx}
                          type="url"
                          value={values[idx]}
                          onChange={(e) => setter(e.target.value)}
                          placeholder={`Gallery image ${idx + 1} URL`}
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4 text-sm"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                  placeholder="Add tag..."
                  className="flex-1 rounded-lg min-w-[140px] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-2"
                />
                <button
                  onClick={handleAddTag}
                  className="px-5 py-2 bg-[#49ADFF] text-white rounded-lg hover:bg-[#439de6] hover:scale-105 transition"
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
                      className="text-indigo-600 hover:text-indigo-800 text-xs font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Categories
              </h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddCategory())
                  }
                  placeholder="Add category..."
                  className="flex-1 min-w-[140px] rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4"
                />
                <button
                  onClick={handleAddCategory}
                  className="px-5 py-2 bg-[#49ADFF] text-white rounded-lg hover:bg-[#439de6] hover:scale-105 transition"
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
                      className="text-purple-600 hover:text-purple-800 text-xs font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Attributes + Variations */}
            <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 space-y-8">
              <div>
                <h3 className="text-base font-semibold mb-3">Attributes</h3>
                <div className="flex flex-wrap gap-3">
                  <input
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Attribute name"
                    className="flex-1 min-w-[140px] rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 py-2 px-4"
                  />
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Value"
                    className="flex-1 min-w-[140px] rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 py-2 px-4"
                  />
                  <button
                    onClick={handleAddAttribute}
                    className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition whitespace-nowrap"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-5 space-y-2">
                  {attributes.map((attr, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200"
                    >
                      <div className="flex gap-3">
                        <span className="font-medium">{attr.name}:</span>
                        <span className="text-gray-600">
                          {attr.options?.[0] || ""}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveAttribute(i)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-3">Variations</h3>
                <div className="flex flex-wrap gap-3">
                  <input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Color / Size / etc"
                    className="flex-1 min-w-[140px] rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 py-2 px-4"
                  />
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Code / SKU"
                    className="flex-1 min-w-[140px] rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 py-2 px-4"
                  />
                  <button
                    onClick={handleAddVariations}
                    className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition whitespace-nowrap"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-5 space-y-2">
                  {variations.map((v, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200"
                    >
                      <div className="flex gap-3">
                        <span className="font-medium">{v.name}</span>
                        <span className="text-gray-500 text-sm">
                          ({v.code})
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveVariations(i)}
                        className="text-red-600 hover:text-red-800"
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

export default EditProduct;
