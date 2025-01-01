import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../context/UseAuth";
import axios from "axios";
import serverDomain from "../../api/serdomain";

const Register = () => {
  // Use State
  const [seePassword, setSeePassword] = useState(false); // view and unview Password

  const {
    createUser,
    user,
    setUser,
    updateUserProfile,
    notifyError,
    setLoading,
    nam,
    theme,
    setTheme,
  } = UseAuth();

  //   Navigate
  const navigate = useNavigate();
  //   Create New User with email and password handler
  const handleNewUser = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");

    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    const check = regex.test(password);
    if (check == false) {
      return notifyError(
        "Password must have at least one upper case, one lower case, one number and one special character and at least 6 character long "
      );
    }
    createUser(email, password)
      .then((res) => {
        setUser(res.user);
        const userInfo = res.user;

        const displayName = name;
        const email = userInfo.email;
        const creationTime = userInfo.metadata.creationTime;
        const photoURL = photo;
        const newUser = { displayName, email, photoURL, creationTime };

        axios.post(`${serverDomain}/newUser`, newUser);

        updateUserProfile(name, photo)
          .then(() => {
            setLoading(false);
            navigate("/");
          })
          .catch((er) => notifyError(er.code.split("/")[1]));
      })
      .catch((er) => notifyError(er.code.split("/")[1]));
  };
  return (
    <div>
      <div className="flex justify-center items-center ">
        <div className=" card bg-transparent w-full max-w-lg shrink border border-green-100 shadow-orange-500 shadow-2xl ">
          <form onSubmit={handleNewUser} className="card-body">
            <h2 className="text-center text-3xl font-bold">
              Create an account
            </h2>
            <div className="form-control">
              <label className="label">
                <span className={`label-text ${theme ? "" : "text-white "}`}>
                  Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered bg-transparent"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className={`label-text ${theme ? "" : "text-white "}`}>
                  Photo URL
                </span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="photo url"
                className="input input-bordered bg-transparent"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className={`label-text ${theme ? "" : "text-white "}`}>
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered bg-transparent"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className={`label-text ${theme ? "" : "text-white "}`}>
                  Password
                </span>
              </label>
              <input
                type={seePassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered bg-transparent"
                required
              />
              <div
                onClick={() => setSeePassword(!seePassword)}
                className="absolute right-5 top-[52px]"
              >
                {seePassword ? <LuEye></LuEye> : <LuEyeOff></LuEyeOff>}
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn border-green-500 bg-transparent text-base border-2 font-bold hover:border-orange-500  hover:bg-transparent hover:font-extrabold ">
                Register
              </button>
            </div>
            <div>
              <h2>
                Already have an account?
                <Link to="/login">
                  <span className="font-bold"> Login</span>
                </Link>
              </h2>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
