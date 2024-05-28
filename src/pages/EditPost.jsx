import React, { useEffect, useState } from "react";
import { PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loader, setLoader] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
        setLoader(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return !loader ? (
    <>
      {post && (
        <div className="py-8 w-full min-h-[80vh] text-center flex items-center justify-center bg-bgLight text-textColor">
          <PostForm post={post} />
        </div>
      )}
    </>
  ) : (
    <div className="w-full min-h-[80vh] text-center flex items-center justify-center bg-bgLight text-textColor">
      <h1 className="text-2xl p-10 font-bold inline-block  transition duration-200">
        Loading...
      </h1>
    </div>
  );
}

export default EditPost;
