import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaDollarSign, FaRegStar } from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";
import {
  MdDescription,
  MdOutlineAlternateEmail,
  MdOutlineVerified,
} from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import UseAuth from "../../context/UseAuth";
import axios from "axios";
import serverDomain from "../../api/serdomain";
import { use } from "react";

const Details = () => {
  const { user, notifySuccess } = UseAuth();
  const tutor = useLoaderData();
  const navigate = useNavigate();
  const [isBooked, setBooked] = useState();

  useEffect(() => {
    axios
      .get(`${serverDomain}/bookTutorial/${user?.email}&${tutor?._id}`)
      .then(async (res) => {
        setBooked(await res.data?.exists);
      });
  }, [user]);

  const check = () => {
    if (user?.email === tutor?.email) {
      return true;
    }
    if (isBooked) {
      return true;
    }
    return false;
  };
  const checkMessage = () => {
    if (user?.email === tutor?.email) {
      return "You've Added This Tutorial";
    }
    if (isBooked) {
      return "You've Already Booked This Tutorial";
    }
    return false;
  };

  const handleBookTutorial = () => {
    const userEmail = user.email;
    const userName = user.displayName;
    const { _id: tutorId, ...remainingTutorInfo } = tutor;
    const bookedTutorial = {
      tutorId,
      userName,
      userEmail,
      ...remainingTutorInfo,
    };
    axios.post(`${serverDomain}/bookTutorial`, bookedTutorial).then((res) => {
      if (res.data.acknowledged) {
        notifySuccess("Appointment Successful");
        navigate("/booked-tutors");
      }
    });
  };

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
          <div className="space-y-3">
            <p className="font-bold">{checkMessage()}</p>
            <button
              onClick={handleBookTutorial}
              disabled={check()}
              className="btn text-2xl border-2 border-orange-500 bg-transparent hover:border-green-500 hover:bg-transparent"
            >
              Book An Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
