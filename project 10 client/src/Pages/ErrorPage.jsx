import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-6">
      <div className="max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-green-200">
        {/* Logo Section */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <img
            src="/assets/logo.webp"
            alt="logo"
            className="w-16 h-16 rounded-full"
          />
          <h1 className="text-2xl font-bold text-green-600">GrowTogether</h1>
        </div>

        {/* Error Content */}
        <h1 className="text-8xl font-extrabold text-green-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          It seems you’ve wandered off the garden path 🌱 The page you’re
          looking for doesn’t exist or has been moved.
        </p>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-block bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-green-600 transition duration-200 shadow-md shadow-green-300"
        >
          Back to Home
        </Link>
      </div>

      <footer className="mt-10 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-green-600 font-semibold">GrowTogether</span> —
        Cultivating Connections 🌿
      </footer>
    </div>
  );
};

export default ErrorPage;
