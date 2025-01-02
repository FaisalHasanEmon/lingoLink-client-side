import React from "react";
import UseAuth from "../context/UseAuth";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { user, loading, setLoading } = UseAuth();
  if (loading) {
    return <Loader></Loader>;
  }
  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRouter;
