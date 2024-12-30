import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import FindTutorsCards from "../../components/FindTutorsCards";

const Category = () => {
  const data = useLoaderData();
  const { category } = useParams();

  return (
    <div>
      <div className="my-5">
        <h3 className="text-3xl font-extrabold">
          Language Category: {category}
        </h3>
      </div>
      <section>
        <div>
          <div className="grid gird-cols-1 md:grid-cols-3 gap-12">
            {data.map((tutor) => (
              <FindTutorsCards key={tutor._id} tutor={tutor}></FindTutorsCards>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
