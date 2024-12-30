import React, { useEffect, useState } from "react";
import serverDomain from "../../api/serdomain";
import FindTutorsCards from "../../components/FindTutorsCards";

const FindTutors = () => {
  const [tutors, setTutors] = useState(null);
  useEffect(() => {
    fetch(`${serverDomain}/tutors`)
      .then((res) => res.json())
      .then((data) => setTutors(data))
      .catch((er) => console.log(er));
  }, []);

  if (!tutors) {
    return (
      <>
        <p>Failed to fetch data</p>
      </>
    );
  }
  return (
    <div>
      <p>Total Tutors {tutors?.length}</p>
      <div className="grid gird-cols-1 md:grid-cols-3 gap-12">
        {tutors.map((tutor) => (
          <FindTutorsCards key={tutor._id} tutor={tutor}></FindTutorsCards>
        ))}
      </div>
    </div>
  );
};

export default FindTutors;
