"use client";
import React, { useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";
import { ThemeContext } from "../../../Components/Providers"; // Adjusted path
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const BlogsClient = () => {
  const { blogs, blogLoading } = useContext(ThemeContext);
  
  return (
    <div className="sm:m-[10%]">
      <div className="mt-10 mb-4 w-[90%] 2xl:w-[full lg:w-full mx-auto">
        <p className="text-[14px] font-semibold">
          HOME
          <FontAwesomeIcon
            className="mx-2"
            icon={faCaretRight}
          ></FontAwesomeIcon>
          BLOGS
        </p>
      </div>
      <h1
        className={`w-[90%] 2xl:w-full lg:w-full mx-auto font-bold mb-10 text-[22px] `}
      >
        Discover Natural Beauty Tips and Tricks
      </h1>
      {blogLoading && (
        <div className="flex justify-center items-center h-[50vh]">
          <ThreeDots
            height="100"
            width="100"
            radius="10"
            color="#abcacb"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      )}
      <div className="grid grid-cols-1 gap-y-8 lg:gap-6 lg:grid-cols-2">
        {blogs?.map((blog) => (
          <div key={blog?._id || blog?.id} className="flex flex-col justify-center items-center mb-[40px] p-[16px] rounded">
            <div className="flex flex-col items-center">
              <img
                className="w-[800px] h-[400px] sm:h-[600px] "
                src={blog?.yoast_head_json?.og_image?.[0]?.url}
                alt=""
                width={800}
                height={600}
              />
              <div className="bg-accent px-4 py-1 mt-[-15px] mb-10">
                <p className="text-primary font-bold">Skin Care</p>
              </div>
            </div>
            <p className="font-bold mb-6 text-xl">{blog?.title?.rendered}</p>
            <div
              className="limit-lines"
              dangerouslySetInnerHTML={{
                __html: blog?.content?.rendered?.slice(0, 260) + ".....",
              }}
            />
            <Link
              href={`/blog/${blog?._id}`}
              className="mt-6 hover:text-accent ease-in-out duration-200 font-bold"
            >
              <p>CONTINUE READING</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsClient;
