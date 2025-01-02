import React, { useEffect, useState } from "react";
import serverDomain from "../../api/serdomain";
import UseAuth from "../../context/UseAuth";
import axios from "axios";
import FindTutorsCards from "../../components/FindTutorsCards";
import swal from "sweetalert";

const MyTutorials = () => {
  const { user } = UseAuth();
  const [myAddedTutorials, setMyAddedTutorials] = useState([]);

  const cameFrom = "myTutorials";

  // {
  //   acknowledged: true;
  //   deletedCount: 1;
  // }

  useEffect(() => {
    axios
      .get(`${serverDomain}/myTutorials?email=${user?.email}`)
      .then((res) => setMyAddedTutorials(res.data));
  }, [user]);

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your tutorial!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${serverDomain}/myTutorials/${id}`, id)
          .then((res) => {
            if (res.data.deletedCount === 1) {
              const newTutorials = myAddedTutorials.filter(
                (item) => item._id != id
              );
              setMyAddedTutorials(newTutorials);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            }
          })
          .catch((err) => swal("Failed to delete"));
      } else {
        swal("Your tutorial is safe!");
      }
    });
  };
  return (
    <div>
      <div className="mt-3 mb-5">
        <h3 className="text-xl">
          <span className="font-extrabold">You've Added Total : </span>
          {myAddedTutorials?.length} Tutorials
        </h3>
      </div>
      <div className="grid gird-cols-1 md:grid-cols-3 gap-12">
        {myAddedTutorials?.map((tutor) => (
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

export default MyTutorials;
