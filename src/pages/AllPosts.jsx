import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoader(false);
    });
  }, []);
  // console.log(posts);
  return !loader ? (
    <div className="w-full min-h-[65vh] text-center flex items-center justify-center bg-bgLight text-textColor my-10">
      {posts === 0 && (
        <h1 className="text-2xl p-10 font-bold inline-block mt-10">
          No posts available{" "}
          <span className="text-textHover inline-block">
            <Link to="/add-post">Create post</Link>
          </span>
        </h1>
      )}
      <Container>
        <div className="grid justify-center content-center sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-0">
          {posts?.map((post) => (
            <div
              key={post.$id}
              className="hover:scale-105 transition duration-300"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <div className="w-full min-h-[80vh] text-center flex items-center justify-center bg-bgLight text-textColor">
      <h1 className="text-2xl p-10 font-bold inline-block  transition duration-200">
        Loading...
      </h1>
    </div>
  );
}

export default AllPosts;
