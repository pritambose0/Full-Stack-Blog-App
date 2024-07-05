import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";
import { fetchPosts } from "./store/postSlice";
// import appwriteService from "./appwrite/config";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login(userData));
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return !loading ? (
    <div className="flex flex-wrap content-between bg-bgLight w-full">
      <div className="w-full">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <>
      <div className="w-full min-h-screen text-center flex items-center justify-center bg-bgColor text-textColor">
        <h1 className="text-xl p-10 font-bold inline-block  transition duration-200">
          Loading...
        </h1>
      </div>
    </>
  );
}

export default App;
