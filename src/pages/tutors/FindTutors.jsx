import React, { useEffect, useState } from "react";
import serverDomain from "../../api/serdomain";
import FindTutorsCards from "../../components/FindTutorsCards";
import axios from "axios";
import UseAuth from "../../context/UseAuth";
import { RiseLoader } from "react-spinners";
import Loader from "../../components/Loader";

const FindTutors = () => {
  const { loading, setLoading } = UseAuth();
  const [tutors, setTutors] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [count, setCount] = useState(0);

  const numberOfPages = Math.ceil(count / itemsPerPage);

  const pages = [...Array(numberOfPages).keys()];

  useEffect(() => {
    axios
      .get(`${serverDomain}/tutors?page=${currentPage}&size=${itemsPerPage}`)
      .then((res) => setTutors(res.data))
      .catch((er) => console.log(er));
    setLoading(false);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    axios
      .get(`${serverDomain}/countUser&Tutorials`)
      .then((res) => setCount(res.data?.numberOfTutorials));
    setLoading(false);
  }, []);
  if (loading) {
    return <Loader></Loader>;
  }
  if (!count) {
    return <Loader></Loader>;
  }

  if (!tutors) {
    return <Loader></Loader>;
  }
  return (
    <div>
      {/* <div className="mb-14 mx-auto grid grid-cols-3 border">
        <form className="flex justify-center items-center">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
          </label>
          <button className="btn">
            Search{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      </div> */}
      <div className="grid gird-cols-1 md:grid-cols-3 gap-12">
        {tutors.map((tutor) => (
          <FindTutorsCards key={tutor._id} tutor={tutor}></FindTutorsCards>
        ))}
      </div>
      <div className="flex justify-center items-center mt-7 gap-3">
        {pages.map((page, index) => (
          <button
            className={`btn hover:scale-105 font-bold border-2 border-orange-300 hover:bg-orange-500 ${
              page === currentPage ? "bg-green-500" : ""
            }`}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FindTutors;
