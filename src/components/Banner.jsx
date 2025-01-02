import React, { useEffect } from "react";
import UseAuth from "../context/UseAuth";
import { Link } from "react-router-dom";
import bannerImage from "../assets/banner_image.webp";
import bannerButtonGif from "../assets/Orange_animated_right_arrow.gif";
import Aos from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  const { user } = UseAuth();
  const points =
    [
      "Take customizable 1-on-1 lessons trusted by millions of users",
      "Learn from certified teachers that fit your budget and schedule",
      "Connect with a global community of language learners",
    ] || [];

  // Aos animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="flex flex-col-reverse  gap-5 md:flex-row justify-between items-center  ">
      <div data-aos="fade-right">
        <h1 className="text-5xl font-bold">
          Become fluent in any <br /> language
        </h1>
        <ul className="my-5">
          {points?.map((point, index) => (
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
                    <img src={bannerButtonGif} alt="" />
                  </figure>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn bg-transparent border-2 border-orange-500 hover:border-green-500 text-lg font-bold"
              >
                <button className="flex justify-between items-center gap-3">
                  <p>Get Started</p>
                  <figure className="w-5 h-5">
                    <img src={bannerButtonGif} alt="" />
                  </figure>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div data-aos="fade-left" className="w-[350px] lg:w-[500px]">
        <img src={bannerImage} alt="Banner Image" />
      </div>
    </div>
  );
};

export default Banner;
