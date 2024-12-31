import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import UseAuth from "../../context/UseAuth";
import axios from "axios";
import serverDomain from "../../api/serdomain";

const UpdateTutorials = () => {
  const { notifyError, notifySuccess } = UseAuth();
  const previousData = useLoaderData();
  const navigate = useNavigate();
  console.log(previousData._id);
  console.log(previousData?.image);
  const handleUpdateTutorial = (e) => {
    e.preventDefault();
    const newFrom = new FormData(e.target);
    const newData = Object.fromEntries(newFrom.entries());
    const { newPrice, newReview, newLanguage, ...leftNewData } = newData;

    //Checking if the price is a number or not
    if (isNaN(newPrice)) {
      return notifyError("Price Must Be A Number");
    }
    if (!newLanguage) {
      return notifyError("Language Is Required");
    }
    const updatedTutorial = {
      id: previousData._id,
      newPrice: Number(newPrice),
      newReview: 0,
      newLanguage,
      ...leftNewData,
    };

    axios
      .put(`${serverDomain}/myTutorials`, updatedTutorial)
      .then((res) => {
        notifySuccess("Tutorial Updated");
        navigate("/my-tutorials");
      })
      .catch((er) => console.log(er));
    console.log(updatedTutorial);
  };
  return (
    <div>
      <div>
        <div className="border-2 border-green-500 p-4 rounded-xl w-11/12 mx-auto">
          <h2 className="text-2xl">Update Tutorial</h2>
          <div className="mt-14">
            <form onSubmit={handleUpdateTutorial}>
              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-base">User Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Item Name"
                    name="newName"
                    className="input input-bordered"
                    defaultValue={previousData?.name}
                    readOnly
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-base">User Email</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Item Name"
                    name="newEmail"
                    className="input input-bordered "
                    defaultValue={previousData?.email}
                    readOnly
                  />
                </label>
              </div>
              <hr className="mt-6 mb-3 border border-green-500" />
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Row 1 */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-base">
                      Tutors Photo URL
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Photo URL"
                    name="newImage"
                    className="input input-bordered"
                    defaultValue={previousData?.image}
                    required
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-base">Language</span>
                  </div>
                  <select className="select select-bordered" name="newLanguage">
                    <option disabled selected>
                      Pick one
                    </option>

                    <option selected>{previousData?.language}</option>
                    <option>English</option>
                    <option>Bangla</option>
                    <option>Hindi</option>
                    <option>Chinese</option>
                    <option>French</option>
                    <option>Arabic</option>
                    <option>German</option>
                    <option>Portuguese</option>
                    <option>Japanese</option>
                  </select>
                </label>

                {/* Row 2 */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-base">Price</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Price"
                    name="newPrice"
                    className="input input-bordered"
                    defaultValue={previousData?.price}
                    required
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-base">Review</span>
                  </div>
                  <select
                    className="select select-bordered"
                    name="newReview"
                    required
                  >
                    <option disabled selected>
                      {previousData?.review}
                    </option>
                  </select>
                </label>
                <label className="form-control w-full md:col-span-2">
                  <div className="label">
                    <span className="label-text text-base">Description</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Description"
                    name="newDescription"
                    className="input input-bordered h-[200px]"
                    defaultValue={previousData?.description}
                    required
                  />
                </label>
              </div>
              <input
                className="btn border-2 w-full text-xl border-orange-500 mt-10 hover:bg-orange-500 hover:text-green-100 font-bold hover:border-green-500"
                type="submit"
                placeholder="Add Tutorial"
                value="Update Tutorial"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTutorials;
