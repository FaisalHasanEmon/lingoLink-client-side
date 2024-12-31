import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import serverDomain from "../../api/serdomain";
import Banner from "../../components/Banner";

const Home = () => {
  // UseStates
  const [categories, setCategories] = useState([]); //Categories
  const [numberOfTutors, setNumberOfTutors] = useState([]); //Categories

  // Load Categories UseEffect
  useEffect(() => {
    axios
      .get("/src/api/tutors_categories.json")
      .then((res) => setCategories(res.data));
  }, [setCategories]);

  // Load Number of Tutors Per Categories
  useEffect(() => {
    axios
      .get(`${serverDomain}/category/numberOfTutors`)
      .then((res) => setNumberOfTutors(res.data));
  }, []);

  // Function Showing the number of teacher in each category
  const tutorNumberInCategory = (tutor_language) => {
    const numbers = numberOfTutors.find(
      (tutor) => tutor.language === tutor_language
    );

    return numbers?.count;
  };

  return (
    <div>
      <div className="md:w-11/12 mx-auto mb-8">
        <Banner></Banner>
      </div>
      {/* category section */}
      <section className="mx-auto w-full lg:w-11/12 grid grid-cols-2  md:grid-cols-3 gap-2 md:gap-4">
        {categories.map((category) => (
          <Link
            key={category.category_id}
            to={`/category/${category.language}`}
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
                    src="/public/language_category_logo/navigate_logo.gif"
                  />
                </figure>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Home;
