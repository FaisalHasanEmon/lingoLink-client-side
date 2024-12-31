import React from "react";
import UseAuth from "../context/UseAuth";
import { Link } from "react-router-dom";

const Banner = () => {
  const { user } = UseAuth();
  const points = [
    "Take customizable 1-on-1 lessons trusted by millions of users",
    "Learn from certified teachers that fit your budget and schedule",
    "Connect with a global community of language learners",
  ];
  return (
    <div className="flex flex-col-reverse  gap-5 md:flex-row justify-between items-center  ">
      <div>
        <h1 className="text-5xl font-bold">
          Become fluent in any <br /> language
        </h1>
        <ul className="my-5">
          {points.map((point, index) => (
            <li key={index} className="flex items-center  space-y-2">
              <p className="w-3 h-3 bg-orange-500 rounded-tl-[50%] rounded-bl-[50%] rounded-tr-[50%] mr-2"></p>
              <p className="text-base md:text-lg font-semibold">{point}</p>
            </li>
          ))}
        </ul>
        <div>
          {user ? (
            <>
              <Link
                to="find-tutors"
                className="btn bg-transparent border-2 border-orange-500 hover:border-green-500 text-lg font-bold"
              >
                <button className="flex justify-between items-center gap-3">
                  <p>Find Tutors</p>
                  <figure className="w-5 h-5">
                    <img src="/public/Orange_animated_right_arrow.gif" alt="" />
                  </figure>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link className="btn bg-transparent border-2 border-orange-500 hover:border-green-500 text-lg font-bold">
                <button className="flex justify-between items-center gap-3">
                  <p>Get Started</p>
                  <figure className="w-5 h-5">
                    <img src="/public/Orange_animated_right_arrow.gif" alt="" />
                  </figure>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="w-[350px] lg:w-[500px]">
        <img src="/public/banner_image.webp" alt="Banner Image" />
      </div>
    </div>
  );
};

export default Banner;
