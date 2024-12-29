import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="container mx-auto px-5 mt-20 mb-5 min-h-[calc(100vh-400px)] ">
        <Outlet></Outlet>
      </div>
      <div className="">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;
