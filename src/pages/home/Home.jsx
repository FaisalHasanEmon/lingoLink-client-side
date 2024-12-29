import React, { useContext } from "react";
import { Context } from "../../context/AuthContext";
import UseAuth from "../../context/UseAuth";

const Home = () => {
  const { name } = UseAuth();

  return <div>{name}</div>;
};

export default Home;
