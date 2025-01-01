import axios from "axios";
import UseAuth from "../../context/UseAuth";
import serverDomain from "../../api/serdomain";
import { useNavigate } from "react-router-dom";

const AddTutorials = () => {
  const { user, notifyError, notifySuccess, theme } = UseAuth();
  const navigate = useNavigate();
  const handleTutorial = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());
    const { price, review, language, ...leftData } = data;

    //Checking if the price is a number or not
    if (isNaN(price)) {
      return notifyError("Price Must Be A Number");
    }
    if (!language) {
      return notifyError("Language Is Required");
    }
    const newTutorial = {
      price: Number(price),
      review: 0,
      language,
      ...leftData,
    };
    axios
      .post(`${serverDomain}/addTutorial`, newTutorial)
      .then((res) => {
        if (res.data?.acknowledged) {
          notifySuccess("You've Successfully Added A Tutorial");
          navigate("/my-tutorials");
          data.reset();
        }
      })
      .catch((er) => console.log(er));
    // console.log({ review, price, ...leftData });
  };
  return (
    <div>
      <div className="border-2 border-green-500 p-4 rounded-xl w-11/12 mx-auto">
        <h2 className="text-2xl">Add Tutorial</h2>
        <div className="mt-14">
          <form onSubmit={handleTutorial}>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span
                    className={`label-text text-base ${
                      theme ? "" : "text-white"
                    }`}
                  >
                    User Name
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Item Name"
                  name="name"
                  className="input input-bordered bg-transparent"
                  defaultValue={user?.displayName}
                  readOnly
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span
                    className={`label-text text-base ${
                      theme ? "" : "text-white"
                    }`}
                  >
                    User Email
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Item Name"
                  name="email"
                  className="input input-bordered bg-transparent"
                  defaultValue={user?.email}
                  readOnly
                />
              </label>
            </div>
            <hr className="mt-6 mb-3 border border-green-500" />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Row 1 */}
              <label className="form-control w-full">
                <div className="label">
                  <span
                    className={`label-text text-base ${
                      theme ? "" : "text-white"
                    }`}
                  >
                    Tutors Photo URL
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Photo URL"
                  name="image"
                  className="input input-bordered bg-transparent"
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span
                    className={`label-text text-base ${
                      theme ? "" : "text-white"
                    }`}
                  >
                    Language
                  </span>
                </div>
                <select
                  className="select select-bordered bg-transparent "
                  name="language"
                >
                  <option disabled selected className="bg-transparent">
                    Pick one
                  </option>
                  <option className={theme ? "" : "bg-slate-600 text-white"}>
                    English
                  </option>
                  <option className={theme ? "" : "bg-slate-600 text-white"}>
                    Bangla
                  </option>
                  <option className={theme ? "" : "bg-slate-600 text-white"}>
                    Hindi
                  </option>
                  <option className={theme ? "" : "bg-slate-600 text-white"}>
                    Chinese
                  </option>
                  <option className={theme ? "" : "bg-slate-600 text-white"}>
                    French
                  </option>
                  <option className={theme ? "" : "bg-slate-600 text-white"}>
                    Arabic
                  </option>
                  <option className={theme ? "" : "bg-slate-600 text-white"}>
                    German
                  </option>
                  <option className={theme ? "" : "bg-slate-600 text-white"}>
                    Portuguese
                  </option>
                  <option className={theme ? "" : "bg-slate-600 text-white"}>
                    Japanese
                  </option>
                </select>
              </label>

              {/* Row 2 */}
              <label className="form-control w-full">
                <div className="label">
                  <span
                    className={`label-text text-base ${
                      theme ? "" : "text-white"
                    }`}
                  >
                    Price
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  className="input input-bordered bg-transparent"
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span
                    className={`label-text text-base ${
                      theme ? "" : "text-white"
                    }`}
                  >
                    Review
                  </span>
                </div>
                <select
                  className="select select-bordered bg-transparent"
                  name="review"
                  required
                >
                  <option disabled selected>
                    0
                  </option>
                  {/* <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option> */}
                </select>
              </label>
              <label className="form-control w-full md:col-span-2">
                <div className="label">
                  <span
                    className={`label-text text-base ${
                      theme ? "" : "text-white"
                    }`}
                  >
                    Description
                  </span>
                </div>
                <textarea
                  placeholder="Description"
                  name="description"
                  className="input input-bordered h-[200px] bg-transparent p-3"
                  required
                />
              </label>
            </div>
            <input
              className="btn border-2 w-full text-xl border-orange-500 mt-10 hover:bg-orange-500 hover:text-green-100 font-bold hover:border-green-500"
              type="submit"
              value="Add Tutorial"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTutorials;
