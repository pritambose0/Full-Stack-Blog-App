import React from "react";
import { Button } from "../components";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[80vh] flex justify-center text-center mx-5 sm:mx-8 lg:mx-16">
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-10 w-full">
        <h1 className="text-7xl sm:text-9xl font-semibold">404</h1>
        <p className="text-2xl sm:text-4xl font-semibold">Page Not Found</p>
        <Link to="/">
          <Button className="min-w-[17rem] min-h-[3.5rem] mx-auto">
            Go to home page
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
