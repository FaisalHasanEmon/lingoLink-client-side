import React, { useEffect } from "react";
import { BsPersonVideo2 } from "react-icons/bs";
import { FcViewDetails } from "react-icons/fc";
import { GiStarsStack } from "react-icons/gi";
import { ImPriceTags } from "react-icons/im";
import { IoLanguage } from "react-icons/io5";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const FindTutorsCards = ({ tutor, cameFrom = "nowhere", handleDelete }) => {
  const { _id, name, email, image, language, price, description, review } =
    tutor;

  // Aos animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div
      data-aos="zoom-in-up"
      className="card bg-transparent  shadow-xl hover:scale-105 hover:duration-1000"
    >
      <figure className="overflow-clip">
        <img className="w-full " src={image} alt="Shoes" />
      </figure>
      <div className="card-body flex-grow-1 *:text-lg">
        <div>
          <p className="card-title flex items-center">
            <BsPersonVideo2 /> {name}
          </p>
          <p className="flex items-center gap-2">
            <IoLanguage /> Language : {language}
          </p>
          <p className="flex gap-1 ">
            <p className="text-xl border ">
              <FcViewDetails />
            </p>
            <p>Description : {description}</p>
          </p>
          <p className="flex items-center gap-2">
            <GiStarsStack /> Review : {review}
          </p>
          <p className="flex items-center gap-2">
            <ImPriceTags />
            Price : {price}$
          </p>
        </div>

        <div className="card-actions justify-end">
          {/* For My Tutorials Page */}
          {cameFrom === "myTutorials" ? (
            <>
              <Link>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDelete(_id)}
                >
                  Delete
                </button>
              </Link>
              <Link to={`/my-tutorials/update/${_id}`}>
                <button className="btn btn-primary">Update</button>
              </Link>
            </>
          ) : (
            <></>
          )}

          {/* For Find Tutorials Page */}
          {cameFrom === "nowhere" ? (
            <>
              <Link to={`/details/${_id}`}>
                <button className="btn btn-primary">View Details</button>
              </Link>
            </>
          ) : (
            <></>
          )}

          {/* For My Booked Tutorials Page */}
          {cameFrom === "myBookings" ? (
            <>
              <Link>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDelete(_id)}
                >
                  Delete
                </button>
              </Link>
              <Link>
                <button className="btn btn-primary">Review</button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindTutorsCards;
