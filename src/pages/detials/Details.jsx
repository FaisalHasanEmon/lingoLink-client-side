import React from "react";
import { FaChalkboardTeacher, FaDollarSign, FaRegStar } from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";
import {
  MdDescription,
  MdOutlineAlternateEmail,
  MdOutlineVerified,
} from "react-icons/md";
import { useLoaderData } from "react-router-dom";

const Details = () => {
  const tutor = useLoaderData();

  //   {
  //     description: "Graduated From Dhaka University, Teacher at Khulna University";
  //     email: "faisalhasanemon@gmail.com";
  //     image: "https://ecdn.dhakatribune.net/contents/cache/images/640x359x1/uploads/dten/2017/06/Bangladeshi-teacher-makes-a-plea-for-fellow-teachers_Shahanaj-Parvin-2.jpg";
  //     language: "Bangla";
  //     name: "Faisal Hasan Emon";
  //     price: 50;
  //     review: 5;
  //     _id: "67732ae1171b92e7ce59dacb";
  //   }

  console.log(tutor);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 ">
        {/* Image Section */}
        <div className="lg:w-[487px] lg:h-[401px] overflow-clip">
          <img className="w-full object-cover" src={tutor?.image} alt="" />
        </div>
        {/* Details Section */}
        <div>
          <p className="text-2xl font-bold flex items-center gap-2 mb-2">
            <FaChalkboardTeacher />
            {tutor?.name}
            <MdOutlineVerified className="justify-end" color="green" />
          </p>
          <div className="space-y-3 *:text-lg *:font-semibold *:gap-2">
            <p className=" flex justify-start items-center">
              <IoLanguageSharp />

              {tutor?.language}
            </p>
            <p className=" flex justify-start items-center">
              <MdOutlineAlternateEmail />

              {tutor?.email}
            </p>
            <p className=" flex justify-start items-start">
              <MdDescription size={25} className="pt-2" /> {tutor?.description}
            </p>
          </div>
        </div>
        {/* Rating And Button Section */}
        <div className="flex flex-col lg:justify-between gap-10">
          <div className="flex justify-between  *:text-2xl *:gap-1 font-bold">
            <p className="flex items-center">
              <span>Rating : </span>
              {tutor?.review}
              <FaRegStar />
            </p>
            <p className="flex items-center">
              <span>Price: </span>
              {tutor?.price}
              <FaDollarSign />
            </p>
          </div>
          <div>
            <button className="btn text-2xl border-2 border-orange-500 bg-transparent hover:border-green-500 hover:bg-transparent">
              Book An Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
