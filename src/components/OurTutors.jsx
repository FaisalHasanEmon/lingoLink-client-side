import axios from "axios";
import React, { useEffect, useState } from "react";
import serverDomain from "../api/serdomain";
import Marquee from "react-fast-marquee";

const OurTutors = () => {
  const [tutorsImage, setTutorsImage] = useState([]);

  useEffect(() => {
    axios
      .get(`${serverDomain}/tutors-images`)
      .then((res) => setTutorsImage(res.data));
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Meet Our Tutors</h1>
      <div>
        <Marquee>
          {tutorsImage?.map((image) => (
            <figure className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-orange-400 mx-5 border-2 border-green-500  shadow-green-500 shadow-lg rounded-lg overflow-clip p-2">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={image.image}
              ></img>
            </figure>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default OurTutors;
