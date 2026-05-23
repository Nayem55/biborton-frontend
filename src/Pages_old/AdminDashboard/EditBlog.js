import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const [previewSource, setPreviewSource] = useState("");
  const [tagName, setTagName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3200/getBlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data?.title?.rendered);
        setDescription(data.content.rendered);
        setPreviewSource(data.yoast_head_json.og_image[0].url);
        data.tags.map((tag) => !tags.includes(tag) && tags.push(tag));
        data?.categories?.map(
          (category) =>
            !categories.includes(category) && categories.push(category),
        );
      });
  }, []);

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

  const handleUpdateAndPublish = () => {
    const data = {
      status: "publish",

      title: {
        rendered: name,
      },
      content: {
        rendered: description,
      },
      categories: [categories[0]],
      tags: [tags[0]],
      yoast_head_json: {
        og_image: [
          {
            width: 1151,
            height: 800,
            url: previewSource,
            type: "image/jpeg",
          },
        ],
      },
    };
    fetch(`http://localhost:3200/editBlog/${id}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    toast.success("Product edited successfully");
  };
  const handleUpdateAndDraft = () => {
    const data = {
      status: "draft",

      title: {
        rendered: name,
      },
      content: {
        rendered: description,
      },
      categories: categories[0],
      tags: [tags[0]],
      yoast_head_json: {
        og_image: [
          {
            width: 1151,
            height: 800,
            url: previewSource,
            type: "image/jpeg",
          },
        ],
      },
    };
    fetch(`http://localhost:3200/editBlog/${id}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    toast.success("Product edited successfully");
  };

  return (
    <div className="mx-12 flex mb-20 ">
      <div className="w-[70%]">
        <h1 className="mt-12 mr-12 text-2xl ">Edit Blog</h1>
        <input
          type="text"
          placeholder="Blog title"
          className="w-[100%] px-3 mt-10 border border-secondary py-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <p className="mt-10 text-xl mb-6">Blog description</p>
        <textarea
          rows={15}
          className="w-[100%] px-3 border border-secondary py-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <p className="my-6 text-xl">Blog Image</p>
        <div>
          {previewSource && (
            <img className="mb-10" src={previewSource} alt=""></img>
          )}
        </div>
        {/* <input onChange={handleChange} type="file"></input> */}
        <input
          onChange={(e) => setPreviewSource(e.target.value)}
          placeholder="Enter image url"
          type="text"
          className="w-[84%] px-3  border border-secondary py-1"
        ></input>
      </div>
      <div className="w-[30%] mt-12">
        <div className="flex gap-10 ml-10 mt-[70px]">
          <button
            onClick={handleUpdateAndDraft}
            className="border border-accent text-accent flex justify-center items-center h-[35px] w-[160px] font-bold ease-in-out duration-300 hover:bg-accent hover:text-primary hover:border-none"
          >
            Save Draft
          </button>
          <button
            onClick={handleUpdateAndPublish}
            className="border border-accent flex justify-center items-center h-[35px] w-[160px] ease-in-out duration-300 bg-accent text-primary font-bold  hover:bg-primary hover:text-accent"
          >
            Publish
          </button>
        </div>
        <div className="ml-10 mt-[50px] text-xl">
          <div>
            <p className="mt-10 mb-6">Blog Tags</p>
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
            <p className="mt-6 mb-6">Blog Categories</p>
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
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
