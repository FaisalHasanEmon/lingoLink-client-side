import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import serverDomain from "../../api/serdomain";
import Banner from "../../components/Banner";
import { FaUsers } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { LuLanguages } from "react-icons/lu";
import Aos from "aos";
import "aos/dist/aos.css";
import OurTutors from "../../components/OurTutors";

const Home = () => {
  // UseStates
  const [categories, setCategories] = useState([]); //Categories
  const [numberOfTutors, setNumberOfTutors] = useState([]); //Categories
  const [numberOfUsersAndTutorials, setNumberOfUsersAndTutorials] =
    useState(null);
  // Load Categories UseEffect
  useEffect(() => {
    axios.get("tutors_categories.json").then((res) => setCategories(res.data));
  }, [setCategories]);

  // Load Number of Tutors Per Categories
  useEffect(() => {
    //It finds the number of tutors per category
    axios
      .get(`${serverDomain}/category/numberOfTutors`)
      .then((res) => setNumberOfTutors(res.data));

    // Number of users and tutorials
    axios
      .get(`${serverDomain}/countUser&Tutorials`)
      .then((res) => setNumberOfUsersAndTutorials(res.data));
  }, []);

  // Aos animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const stats =
    [
      {
        number: numberOfUsersAndTutorials?.numberOfUsers,
        state: "Users",
        icon: <FaUsers />,
      },
      {
        number: numberOfUsersAndTutorials?.numberOfTutorials,
        state: "Tutorials",
        icon: <GiBookshelf />,
      },
      {
        number: 9,
        state: "Languages",
        icon: <LuLanguages />,
      },
    ] || [];
  // Function Showing the number of teacher in each category
  const tutorNumberInCategory = (tutor_language) => {
    const numbers = numberOfTutors?.find(
      (tutor) => tutor.language === tutor_language
    );

    return numbers?.count;
  };

  return (
    <div>
      <div className="md:w-11/12 mx-auto mb-8">
        <Banner></Banner>
      </div>
      {/* State Section */}
      <section className="lg:w-6/12 mx-auto grid grid-cols-3 gap-2 lg:gap-4 *:border-2 *:border-green-100 *:rounded-lg mt-14 mb-10  *:shadow-orange-300 *:shadow-md ">
        {stats?.map((item, index) => (
          <div
            data-aos="zoom-in"
            key={index}
            className="flex flex-col items-center lg:*:text-3xl p-2 "
          >
            <p className="font-bold">{item.number}+</p>
            <p className="flex items-center gap-2">
              {item.icon} {item.state}
            </p>
          </div>
        ))}
      </section>
      {/* category section */}
      <section className="mx-auto w-full lg:w-11/12 grid grid-cols-2  md:grid-cols-3 gap-2 md:gap-4">
        {categories?.map((category) => (
          <Link
            key={category.category_id}
            to={`/category/${category.language}`}
            data-aos="flip-down"
          >
            <div className="border-2 border-[#37ff00] hover:bg-orange-300 hover:scale-105 hover:shadow-green-300 hover:shadow-lg shadow-orange-300 shadow-md rounded-lg p-3 flex justify-between items-center ">
              <div className="flex justify-start items-center gap-2 md:gap-4">
                <figure className="w-6 md:w-10">
                  <img className="w-full" src={category.language_logo} alt="" />
                </figure>
                <p className="text-lg md:text-2xl font-bold">
                  {category.language}
                  <br />
                  <span className="text-base md:text-xl font-semibold">
                    {tutorNumberInCategory(category.language)} Teachers
                  </span>
                </p>
              </div>
              <div>
                <figure className="w-6 md:w-10 ">
                  <img
                    className="w-full"
                    src="/language_category_logo/navigate_logo.gif"
                  />
                </figure>
              </div>
            </div>
          </Link>
        ))}
      </section>
      {/* Our tutors */}
      <section className="mx-auto w-full lg:w-11/12 my-10">
        <OurTutors></OurTutors>
      </section>
    </div>
  );
};

export default Home;
