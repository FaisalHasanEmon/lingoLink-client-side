import React from "react";
import { BsPersonVideo2 } from "react-icons/bs";
import { FcViewDetails } from "react-icons/fc";
import { GiStarsStack } from "react-icons/gi";
import { ImPriceTags } from "react-icons/im";
import { IoLanguage } from "react-icons/io5";

const FindTutorsCards = ({ tutor }) => {
  const { name, email, image, language, price, description, review } = tutor;
  return (
    <div className="card bg-base-100  shadow-xl hover:scale-105 hover:duration-1000">
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
          <p className="flex items-start justify-center gap-2 ">
            <p className="text-xl">
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
          <button className="btn btn-primary">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default FindTutorsCards;
