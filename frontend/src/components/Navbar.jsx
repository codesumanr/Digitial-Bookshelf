import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [Nav, setNav] = useState("hidden");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const commonLinks = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
  ];

  let roleBasedLinks = [];
  if (isLoggedIn && role === "user") {
    roleBasedLinks = [
      { title: "Cart", link: "/cart" },
      { title: "Profile", link: "/profile" },
    ];
  } else if (isLoggedIn && role === "admin") {
    roleBasedLinks = [{ title: "Admin Profile", link: "/profile" }];
  }

  const links = [...commonLinks, ...roleBasedLinks];

  return (
    <>
      <nav className="relative flex w-full items-center justify-between bg-zinc-800 py-2 text-white lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          {/* Logo */}
          <div className="ms-2 w-3/6 lg:w-1/6">
            <Link to="/" className="flex text-2xl font-semibold items-center justify-center">
              <img src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" className="h-10 me-4" />
              Digitial Bookshelf
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="w-1/6 block lg:hidden">
            <button
              className="px-2 focus:outline-none"
              type="button"
              onClick={() => setNav(Nav === "hidden" ? "block" : "hidden")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7 stroke-white" viewBox="0 0 24 24">
                <path d="M3 6.75h18M3 12h18M3 17.25h18" />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="5/6 hidden lg:block">
            <div className="flex items-center">
              {links.map((item, index) => (
                <div
                  key={index}
                  className={`mx-3 transition-all duration-300 hover:cursor-pointer ${
                    item.title.toLowerCase().includes("profile")
                      ? "border border-blue-500 px-3 py-1 rounded hover:bg-white hover:text-zinc-900"
                      : "hover:text-blue-300"
                  }`}
                >
                  <Link to={item.link}>{item.title}</Link>
                </div>
              ))}

              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="rounded border border-blue-500 px-3 py-1 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
                  >
                    LogIn
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded bg-blue-500 px-3 py-1 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
                  >
                    SignUp
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="rounded text-red-500 border border-red-500 px-3 py-1 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`5/6 ${Nav} lg:hidden bg-zinc-800 text-white px-12`}>
        <div className="flex flex-col items-center">
          {links.map((item, index) => (
            <div
              key={index}
              className={`my-3 transition-all duration-300 hover:cursor-pointer ${
                item.title.toLowerCase().includes("profile")
                  ? "border border-blue-500 px-3 py-1 rounded hover:bg-white hover:text-zinc-900"
                  : "hover:text-blue-300"
              }`}
            >
              <Link to={item.link} onClick={() => setNav("hidden")}>
                {item.title}
              </Link>
            </div>
          ))}

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                onClick={() => setNav("hidden")}
                className="rounded border border-blue-500 px-3 py-1 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
              >
                LogIn
              </Link>
              <Link
                to="/signup"
                onClick={() => setNav("hidden")}
                className="rounded bg-blue-500 px-3 py-1 my-4 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
              >
                SignUp
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setNav("hidden");
              }}
              className="rounded text-red-500 border border-red-500 px-3 py-1 my-4 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
