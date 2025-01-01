import React from "react";
import { RiseLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <RiseLoader color="#55ff00" size={50} speedMultiplier={0} />
    </div>
  );
};

export default Loader;
