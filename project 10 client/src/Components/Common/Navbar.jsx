import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import ThemeToggle from "../../Utilities/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { user, loading, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout()
      .then(() => toast.success("Logged out successfully!"))
      .catch(() => toast.error("Logout failed!"));
  };

  if (loading) {
    // Loader while Firebase checks auth
    return (
      <div className="flex justify-center items-center min-h-16 bg-white shadow-md">
        <span className="loading loading-spinner loading-md text-pink-500"></span>
      </div>
    );
  }

  const links = [
    { name: "Home", path: "/" },
    { name: "Explore Gardeners", path: "/gardeners" },
    { name: "Browse Tips", path: "/browseTips" },
    { name: "Share a Garden Tip", path: "/shareTips" },
    { name: "My Tips", path: "/myTips" },
  ];

  return (
    <nav className="bg-base-100 shadow-md py-2 border-b border-black">
      <div className=" mx-auto w-9/10 flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src="/assets/logo.webp"
            alt="logo"
            className="w-12 h-12 rounded-full"
          />
          <span className="font-bold text-xl text-primary">GrowTogether</span>
        </NavLink>

        {/* Links */}
        <div className="hidden lg:flex space-x-6 items-center">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `hover:text-secondary transition-colors ${
                  isActive
                    ? "text-primary font-semibold border-b-2 border-primary"
                    : "text-base-content"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Menu for desktop */}
        <div className="hidden lg:flex space-x-6 items-center">
          {/* Login / User */}
          {user ? (
            <div className="relative group">
              <img
                src="https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
                alt="profile image"
                className="w-12 h-12 rounded-full cursor-pointer"
                onClick={() => setShowLogoutBtn(!showLogoutBtn)}
              />
              <div className="absolute right-13 top-1 bg-base-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-12">
                <div className="w-full text-left px-4 py-2  rounded whitespace-nowrap">
                  Erfan Khan
                </div>
              </div>
              {showLogoutBtn ? (
                <div className="absolute right-0 mt-2 w-32 bg-base-200 rounded shadow-lg z-14">
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 hover:bg-primary hover:text-white rounded text-center"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <NavLink to="/signup" className="btn btn-primary">
              SignUp
            </NavLink>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}

        <div className="lg:hidden flex items-center justify-center gap-6">
          <ThemeToggle />
          <button onClick={toggleMenu} className="btn btn-ghost btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden px-6 pb-4 space-y-2 bg-base-100">
          {links.map(
            (link) =>
              (!link.private || user) && (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded hover:bg-primary/20 transition ${
                      isActive
                        ? "bg-primary/30 font-semibold"
                        : "text-base-content"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              )
          )}
          {user ? (
            <button
              onClick={onLogout}
              className="block px-4 py-2 btn btn-primary w-full text-center"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/signup"
              className="block px-4 py-2 btn btn-primary w-full text-center"
              onClick={() => setIsOpen(false)}
            >
              SignUp
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
