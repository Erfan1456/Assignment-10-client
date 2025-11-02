import React from "react";
import Navbar from "./../Components/Common/Navbar";
import { Outlet } from "react-router";
import Footer from "./../Components/Common/Footer";
import ThemeToggle from "../Utilities/ThemeToggle";

const HomeRoot = () => {
  return (
    <div>
      <Navbar />
      <ThemeToggle />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeRoot;
