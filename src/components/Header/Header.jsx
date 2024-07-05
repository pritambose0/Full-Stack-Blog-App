import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },

    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },

    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },

    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
  ];
  return (
    <header className="py-8 w-full">
      <nav className="flex items-center justify-between text-textColor mx-5 sm:mx-8 lg:mx-16 relative">
        <div className="flex items-center justify-between w-full">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="hidden lg:flex ml-auto items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block font-medium mx-6 duration-200 hover:text-primary rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </div>

        {/* MOBILE MENU */}

        {isOpen ? (
          <button onClick={toggleMenu} className="lg:hidden">
            <FontAwesomeIcon icon={faX} className="text-[1.4rem]" />
          </button>
        ) : (
          <button onClick={toggleMenu} className="lg:hidden">
            <FontAwesomeIcon icon={faBars} className="text-[1.5rem]" />
          </button>
        )}
      </nav>

      {isOpen && (
        <ul className="flex flex-col gap-8 justify-start pt-[30%] mx-auto items-center h-screen w-[70%] fixed top-0 bg-gray-800 z-50">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="inline-block text-xl font-semibold mx-6 duration-200 hover:text-primary rounded-full"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}

          {authStatus && (
            <li>
              <LogoutBtn className="text-xl" />
            </li>
          )}
        </ul>
      )}
    </header>
  );
}

export default Header;
