import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import UseAuth from "../context/UseAuth";

const RootLayout = () => {
  const { theme, setTheme } = UseAuth();
  return (
    <div className={theme ? "" : "bg-slate-500 text-white"}>
      <Navbar></Navbar>
      <div className="container mx-auto px-5 py-4 mt-20 mb-5 min-h-[calc(100vh-358px)]">
        <Outlet></Outlet>
      </div>
      <div className="">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;
