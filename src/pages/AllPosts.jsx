import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index";
// import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
// import { allPosts } from "../store/postSlice";
import { useSelector } from "react-redux";

function AllPosts() {
  // const [posts, setPosts] = useState([]);
  // const [loader, setLoader] = useState(true);

  // useEffect(() => {
  //   appwriteService.getPosts([]).then((posts) => {
  //     if (posts) {
  //       setPosts(posts.documents);
  //     }
  //     setLoader(false);
  //   });
  // }, []);
  // console.log(posts);

  const posts = useSelector((state) => state.post.posts);
  const error = useSelector((state) => state.error);
  // console.log(posts);
  if (error) {
    return (
      <div className="w-full min-h-[80vh] text-center flex items-center justify-center bg-bgLight text-red-500">
        <h1 className="text-2xl p-10 font-bold inline-block  transition duration-200">
          {`Error: ${error}`}
        </h1>
      </div>
    );
  }

  return (
    <div className=" w-full text-center flex items-center justify-center text-textColor">
      <div className="mx-5 sm:mx-8 lg:mx-16">
        <div className="grid content-center md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
          {posts?.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </div>

      {!posts && (
        <h1 className="text-2xl p-10 font-bold mt-10 flex flex-col gap-3">
          No posts available{" "}
          <p className="text-textHover">
            <Link to="/add-post">Create post</Link>
          </p>
        </h1>
      )}
    </div>
  );
}

export default AllPosts;
