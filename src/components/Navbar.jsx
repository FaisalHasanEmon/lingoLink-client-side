import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UseAuth from "../context/UseAuth";

const Navbar = () => {
  const { logout, user, setUser } = UseAuth();

  const handleSignOut = () => {
    setUser(null);
    logout();
    console.log("I am working for logout");
  };

  const logo = user?.photoURL;
  const tabs = (
    <>
      <li>
        <NavLink
          className="text-white   hover:bg-orange-500   bg-green-500 font-bold"
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="text-white   hover:bg-orange-500   bg-green-500 font-bold"
          to="/find-tutors"
        >
          Find Tutors
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink
              className="text-white   hover:bg-orange-500   bg-green-500 font-bold"
              to="/add-tutorials"
            >
              Add Tutorials
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-white   hover:bg-orange-500   bg-green-500 font-bold"
              to="/booked-tutors"
            >
              My Booked Tutors
            </NavLink>
          </li>
        </>
      ) : (
        <>
          {" "}
          <li>
            <NavLink
              className="text-white   hover:bg-orange-500   bg-green-500 font-bold"
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-white   hover:bg-orange-500   bg-green-500 font-bold"
              to="/register"
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 font-protestRiot fixed top-0 z-50 border-b-2 border-white shadow-md shadow-orange-200">
      <div className="flex-1 ">
        <a className="btn btn-ghost text-xl flex justify-center items-center  ">
          <img
            className="h-12 w-full"
            src="/public/LingoLink_Logo.png"
            alt="Logo"
          />
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown relative">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-28 p-2 shadow space-y-2 "
          >
            {tabs}
          </ul>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{tabs}</ul>
        </div>
        {user ? (
          <>
            <div className="dropdown dropdown-end" title={user?.displayName}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <p>{user?.displayName}</p>
                </li>
                <li onClick={handleSignOut}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
