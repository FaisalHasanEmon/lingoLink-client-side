import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-20 mb-5 h-[calc(100vh-400px)] border border-green-500">
        <Outlet></Outlet>
      </div>
      <div className="">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;
