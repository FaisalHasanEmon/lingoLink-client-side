import React, { useEffect, useState } from "react";
import FindTutorsCards from "../../components/FindTutorsCards";
import axios from "axios";
import UseAuth from "../../context/UseAuth";
import serverDomain from "../../api/serdomain";

const MyBookedTutors = () => {
  const { user, notifySuccess } = UseAuth();
  const [myBookings, setMyBookings] = useState([]);
  useEffect(() => {
    axios
      .get(`${serverDomain}/bookedTutorials/${user?.email}`)
      .then((res) => setMyBookings(res?.data));
  }, [user]);
  const cameFrom = "myBookings";

  const handleDelete = (id) => {
    axios
      .delete(`${serverDomain}/delete-bookTutorial/${user?.email}&${id}`)
      .then((res) => {
        const remainingBookings = myBookings.filter(
          (bookings) => bookings._id !== id
        );
        setMyBookings(remainingBookings);
        notifySuccess("Successfully Deleted ");
      });
  };
  return (
    <div>
      <div>
        <p className="font-bold">
          You've Booked : {myBookings?.length ? myBookings.length : 0}
          Tutorials
        </p>
      </div>
      <div className="grid gird-cols-1 md:grid-cols-3 gap-12">
        {myBookings?.map((tutor) => (
          <FindTutorsCards
            key={tutor._id}
            tutor={tutor}
            cameFrom={cameFrom}
            handleDelete={handleDelete}
          ></FindTutorsCards>
        ))}
      </div>
    </div>
  );
};

export default MyBookedTutors;
