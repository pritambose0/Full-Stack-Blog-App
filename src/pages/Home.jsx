import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const userStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  // console.log(userStatus.name);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoader(false);
    });
  }, []);

  return userStatus ? (
    <>
      {loader ? (
        <div className="w-full min-h-[80vh] text-center flex items-center justify-center bg-bgLight text-textColor">
          <h1 className="text-2xl p-10 font-bold inline-block  transition duration-200">
            Loading...
          </h1>
        </div>
      ) : (
        <div className="w-full min-h-[80vh] text-center flex-col items-center justify-center bg-bgLight text-textColor">
          <h1 className="text-2xl p-10 font-bold inline-block">
            {`Welcome ${user.name}`}
          </h1>
          {posts === 0 && (
            <h1 className="text-2xl p-10 font-bold inline-block mt-5">
              No posts available{" "}
              <span className="text-textHover inline-block">
                <Link to="/add-post">Create post</Link>
              </span>
            </h1>
          )}

          <Container>
            <div className="grid justify-center content-center sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-0 mb-10 mt-0 sm:mt-5">
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
      )}
    </>
  ) : (
    <>
      <div className="w-full min-h-[80vh] text-center flex items-center justify-center bg-bgLight text-textColor">
        <Container>
          <div className="flex items-center justify-center flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold inline-block hover:text-textHover transition duration-200 cursor-pointer">
                <Link to="/login">Login to read Posts</Link>
              </h1>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
  return;

  // if (posts.length === 0) {
  //   return (
  //     <div className="w-full min-h-[80vh] text-center flex items-center justify-center bg-bgLight text-textColor">
  //       <Container>
  //         <div className="flex items-center justify-center flex-wrap">
  //           <div className="p-2 w-full">
  //             <h1 className="text-2xl font-bold inline-block hover:text-textHover transition duration-200 cursor-pointer">
  //               <Link to="/login">Login to read Posts</Link>
  //             </h1>
  //           </div>
  //         </div>
  //       </Container>
  //     </div>
  //   );
  // }
  // return (
  //   <div className="w-full min-h-[80vh] text-center flex-col items-center justify-center bg-bgLight text-textColor">
  //     <h1 className="text-2xl p-10 font-bold inline-block  transition duration-200">
  //       {userStatus && `Welcome ${user.name}`}
  //     </h1>
  //     <Container>
  //       <div className="flex flex-col md:flex-row flex-wrap mb-10">
  //         {userStatus &&
  //           posts.map((post) => (
  //             <div
  //               key={post.$id}
  //               className="p-2 w-1/4 hover:scale-105 transition duration-300"
  //             >
  //               <PostCard {...post} />
  //             </div>
  //           ))}
  //       </div>
  //     </Container>
  //   </div>
  // );
}

export default Home;
