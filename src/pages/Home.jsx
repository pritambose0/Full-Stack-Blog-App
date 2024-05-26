import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const userStatus = useSelector((state) => state.auth.status);
  const userName = useSelector((state) => state.auth.userData.name);
  // console.log(userStatus);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                {userStatus ? `Welcome ${userName}` : "Login to read posts"}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-5 flex flex-col items-center gap-5">
      <h1 className="text-2xl font-bold hover:text-gray-500">
        {userStatus ? `Welcome ${userName}` : "Login to read posts"}
      </h1>
      <Container>
        <div className="flex flex-wrap">
          {userStatus ? (
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <h1 className="text-2xl font-bold hover:text-gray-500 mx-auto">
              Login to read posts
            </h1>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
