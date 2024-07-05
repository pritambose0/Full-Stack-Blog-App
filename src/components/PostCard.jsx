import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faGreaterThan } from "@fortawesome/free-solid-svg-icons";

function PostCard({ $id, title, featuredImage, $createdAt }) {
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : undefined;
  const date = new Date($createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const createdAt = date.toLocaleDateString("en-US", options);

  // console.log($id, title, featuredImage);
  return (
    <Link to={`/post/${$id}`} className="flex justify-center">
      <div className="w-full md:h-[70vh] bg-secondary rounded-xl text-start overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover h-[50%] w-full rounded-t-xl hover:scale-105 transition duration-300"
        />
        <div className="flex flex-col justify-center px-8 h-[50%] py-0 md:py-5 gap-4">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faCalendar}
              className="text-base sm:text-lg font-medium text-gray-500"
            />
            <p className="text-base sm:text-lg font-medium text-gray-500">
              {createdAt}
            </p>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
          <div className="flex items-center gap-2 relative w-full mb-5 sm:mb-0">
            <p className="text-base sm:text-lg text-gray-200">Read more</p>
            <FontAwesomeIcon
              icon={faGreaterThan}
              className="text-[1.3rem] font-semibold w-[13px] h-[13px]"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
