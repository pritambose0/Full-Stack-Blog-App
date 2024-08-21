import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { removePost, fetchPosts } from "../store/postSlice";

function Post() {
  // const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.post.posts);
  const post = posts?.find((post) => post.$id === slug);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const error = useSelector((state) => state.post.error);
  // console.log(post);
  useEffect(() => {
    dispatch(fetchPosts());
    window.scrollTo(0, 0);
  }, [dispatch]);

  if (error) {
    return (
      <div className="w-full min-h-[80vh] text-center flex items-center justify-center bg-bgColor text-red-500">
        <h1 className="text-2xl p-10 font-bold inline-block transition duration-200">
          {`Error: ${error}`}
        </h1>
      </div>
    );
  }

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        dispatch(removePost(post.$id));
        // console.log(post);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="mx-5 sm:mx-8 lg:mx-16 min-h-screen">
      <div className="flex flex-col items-center justify-center text-textColor pt-5 pb-10">
        <div className="mb-10 text-start w-full">
          <h1 className="text-2xl md:text-3xl font-semibold">
            {post.title}
          </h1>
        </div>
        <div className="w-full lg:w-[70%] items-center flex justify-center mb-4 rounded-xl">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-md object-center object-cover aspect-video w-full"
          />
        </div>

        <div className="browser-css w-full lg:w-[70%]">
          {parse(post.content)}
        </div>

        {isAuthor && (
          <div className="w-full text-start my-10">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-primary hover:bg-blue-800" className="mr-3">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500 hover:bg-red-700" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="w-full min-h-[80vh] text-center flex items-center justify-center bg-bgLight text-textColor">
      <h1 className="text-xl p-10 font-bold inline-block  transition duration-200">
        Loading...
      </h1>
    </div>
  );
}

export default Post;
