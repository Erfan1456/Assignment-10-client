import React, { useState } from "react";
import { NavLink } from "react-router";

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: "Home", path: "/" },
    { name: "Explore Gardeners", path: "/explore-gardeners" },
    { name: "Browse Tips", path: "/browse-tips" },
    { name: "Share a Garden Tip", path: "/share-tip", private: true },
    { name: "My Tips", path: "/my-tips", private: true },
  ];

  return (
    <nav className="bg-base-100 shadow-md">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
            alt="logo"
            className="w-8 h-8"
          />
          <span className="font-bold text-xl text-primary">GrowTogether</span>
        </NavLink>

        {/* Menu for desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          {links.map(
            (link) =>
              (!link.private || user) && (
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
              )
          )}

          {/* Login / User */}
          {user ? (
            <div className="relative group">
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-32 bg-base-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 hover:bg-primary hover:text-white rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-primary btn-sm">
              Login / SignUp
            </NavLink>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
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
        <div className="md:hidden px-6 pb-4 space-y-2 bg-base-100">
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
              className="block w-full text-left px-4 py-2 rounded hover:bg-primary/20 transition"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="block px-4 py-2 btn btn-primary btn-sm w-full text-center"
              onClick={() => setIsOpen(false)}
            >
              Login / SignUp
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
