import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("lightTheme");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "lightTheme";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "lightTheme" ? "darkTheme" : "lightTheme";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer w-14 h-8">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={theme === "darkTheme"}
        onChange={toggleTheme}
      />
      {/* Slider background */}
      <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-full peer-focus:ring-2  transition-colors duration-300"></div>

      {/* Sliding circle with icons */}
      <div
        className={`absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-yellow-400 transition-transform duration-300 
        ${
          theme === "darkTheme"
            ? "translate-x-6 text-gray-800"
            : "translate-x-0 text-yellow-400"
        }`}
      >
        {theme === "lightTheme" ? <FaSun /> : <FaMoon />}
      </div>
    </label>
  );
};

export default ThemeToggle;
