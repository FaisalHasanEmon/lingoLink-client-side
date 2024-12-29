import React, { useContext } from "react";
import { Context } from "./AuthContext";

const UseAuth = () => {
  const useAuth = useContext(Context);
  return useAuth;
};

export default UseAuth;
