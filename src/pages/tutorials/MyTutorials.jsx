import React, { useEffect, useState } from "react";
import serverDomain from "../../api/serdomain";
import UseAuth from "../../context/UseAuth";
import axios from "axios";
import FindTutorsCards from "../../components/FindTutorsCards";

const MyTutorials = () => {
  const { user } = UseAuth();
  const [myAddedTutorials, setMyAddedTutorials] = useState([]);

  useEffect(() => {
    axios
      .get(`${serverDomain}/myTutorials?email=${user?.email}`)
      .then((res) => setMyAddedTutorials(res.data))
      .catch((er) => console.log(er));
  }, [user]);
  return (
    <div>
      <div className="mt-3 mb-5">
        <h3 className="text-xl">
          <span className="font-extrabold">You've Added Total : </span>
          {myAddedTutorials?.length} Tutorials
        </h3>
      </div>
      <div className="grid gird-cols-1 md:grid-cols-3 gap-12">
        {myAddedTutorials.map((tutor) => (
          <FindTutorsCards key={tutor._id} tutor={tutor}></FindTutorsCards>
        ))}
      </div>
    </div>
  );
};

export default MyTutorials;
