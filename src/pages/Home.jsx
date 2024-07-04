import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../store/postSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";

function Home() {
  const userStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);
  // const [posts, setPosts] = useState([]);
  // console.log(userStatus.name);
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    setLoader(false);
  }, [dispatch]);

  // console.log(posts);
  const posts = useSelector((state) => state.post.posts);
  const error = useSelector((state) => state.error);
  console.log(posts);
  return userStatus ? (
    <>
      {loader ? (
        <div className="w-full min-h-[80vh] text-center flex items-center justify-center text-textColor">
          <h1 className="text-2xl p-10 font-bold inline-block  transition duration-200">
            Loading...
          </h1>
        </div>
      ) : error ? (
        <div className="w-full min-h-[80vh] text-center flex items-center justify-center text-red-500">
          <h1 className="text-2xl p-10 font-bold inline-block  transition duration-200">
            {`Error: ${error}`}
          </h1>
        </div>
      ) : (
        <div className="w-full min-h-[80vh] text-center flex-col items-center justify-center">
          <div className="mx-8 lg:mx-16 py-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-5 md:gap-0 text-start relative">
              <h1 className="text-3xl lg:text-4xl font-bold ">{`Welcome ${user.name}`}</h1>

              <input
                type="text"
                className="bg-gray-800 p-3 w-full md:w-[22rem] lg:w-[25rem] h-[3.7rem] rounded-md  hover:bg-bgColor transition-colors duration-300 pl-5 border border-gray-500 text-white placeholder-white"
                placeholder="Search..."
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-5 top-20 md:top-6"
              />
            </div>
          </div>

          <div className="mx-8 lg:mx-16">
            <div className="grid content-center md:grid-cols-2 lg:grid-cols-3 space-x-5 mb-10 mt-5">
              {posts?.map((post) => (
                <div key={post.$id}>
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </div>

          {!posts && (
            <h1 className="text-2xl p-10 font-bold flex flex-col gap-3 mt-5">
              No posts available{" "}
              <span className="text-textHover inline-block">
                <Link to="/add-post">Create post</Link>
              </span>
            </h1>
          )}
        </div>
      )}
    </>
  ) : (
    <>
      <div className="w-full min-h-[80vh] text-center flex items-center justify-center text-textColor">
        <Container>
          <div className="flex items-center justify-center flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold inline-block hover:text-primary transition duration-200 cursor-pointer">
                <Link to="/login">Login to read Posts</Link>
              </h1>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Home;
