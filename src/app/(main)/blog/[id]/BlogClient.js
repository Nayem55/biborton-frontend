"use client";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../../Components/Providers"; // Adjusted path
// import { Helmet } from "react-helmet-async"; // Handled in server component

const BlogClient = ({ params }) => {
  const { id } = params;
  const { blogs } = useContext(ThemeContext);
  const [translate, setTranslate] = useState(false);

  // If blogs aren't loaded yet in context, this might be filtered out or empty
  // Ideally we should handle loading state.
  const blog = blogs?.find((blog) => blog._id === id);

  if (!blog) {
      if (!blogs || blogs.length === 0) {
          return <div className="text-center py-20">Loading blog...</div>
      }
      return <div className="text-center py-20">Blog not found.</div>
  }

  return (
    <div className="w-[80%] mx-auto py-10 relative">
      <div>
        <div>
          <div className="bg-accent px-4 py-1 w-[150px] mx-auto ">
            <p className="text-center font-bold text-primary">Skin Care</p>
          </div>
          <div className="w-[78px] mx-auto lg:absolute top-10 right-0 lg:top-10">
            <button
              onClick={() => setTranslate(true)}
              className={`mt-10 text-black hover:text-accent font-bold border border-accent px-2 ease-in-out duration-200 ${
                translate && "bg-accent text-white hover:text-black"
              } ${!translate && "text-opacity-40"}`}
            >
              En
            </button>

            <button
              onClick={() => setTranslate(false)}
              className={`mt-10 text-black hover:text-accent font-bold border border-accent px-2 ease-in-out duration-200 ${
                !translate && "bg-accent text-white hover:text-black"
              } ${translate && "text-opacity-40"}`}
            >
              Bn
            </button>
          </div>
          <p className="text-2xl my-6 font-bold text-center">
            {translate ? blog?.title_eng : blog?.title?.rendered}
          </p>
          <div className="flex justify-center">
            <img
              className=""
              src={blog?.yoast_head_json?.og_image?.[0]?.url}
              alt=""
            />
          </div>
          <div
            className="mt-10 text-black text-opacity-80 flex flex-col gap-4 2xl:w-[100%] mx-auto"
            dangerouslySetInnerHTML={{
              __html: translate ? blog?.content_eng : blog?.content?.rendered,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogClient;
