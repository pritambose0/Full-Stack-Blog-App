import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
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
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return !loader ? (
    <>
      {post && (
        <div className="py-8 w-full min-h-[80vh] text-center flex-col items-center justify-center bg-bgLight text-textColor">
          <Container>
            <PostForm post={post} />
          </Container>
        </div>
      )}
    </>
  ) : (
    <div className="text-xl p-10 font-semibold h-[80vh]">Loading...</div>
  );
}

export default EditPost;
