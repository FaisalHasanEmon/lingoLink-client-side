import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../context/UseAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [seePassword, setSeePassword] = useState(false);

  const {
    login,
    user,
    setUser,
    resetPassword,
    notifySuccess,
    notifyError,
    createAccountWithGoogle,
  } = UseAuth();

  // Handle Google Login
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    let check = false;
    createAccountWithGoogle()
      .then((res) => {
        setUser(res.user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((er) => notifyError(er.code));

    if (check) {
      navigate("/");
    }
  };
  // Login Handling function
  const handleLogin = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
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

    login(email, password)
      .then((res) => {
        setUser(res.user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((er) => {
        notifyError(er.code.split("/")[1]);
      });
  };

  // Forget Password function
  const handleForgetPassword = (e) => {
    e.preventDefault();
    const validEmail = e.target.forgetEmail.value;

    resetPassword(validEmail)
      .then(() => {
        notifySuccess("A password reset email has sent to your email");
        e.target.forgetEmail.value = " ";
      })
      .catch((er) => {
        notifyError(er.code);
        e.target.forgetEmail.value = " ";
      });
  };
  return (
    <div>
      <div className="py-4 flex justify-center items-center">
        <div className=" card bg-base-100 w-full max-w-md shrink-0 border border-themeColor shadow-2xl ">
          {/* Main Login Form */}
          <form onSubmit={handleLogin} className="card-body">
            <h2 className="text-center text-3xl">Login Your Account</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={seePassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <div
                onClick={() => setSeePassword(!seePassword)}
                className="absolute right-5 top-[52px]"
              >
                {seePassword ? <LuEye></LuEye> : <LuEyeOff></LuEyeOff>}
              </div>
              <label className="label">
                <a
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-themeColor text-white hover:bg-green-900 hover:font-bold">
                Login
              </button>
            </div>
            <div className="divider bg-black h-[1px]"></div>
            <div className="form-control">
              <button
                onClick={handleGoogleLogin}
                className="btn bg-white text-themeColor border-themeColor hover:border-themeColor hover:bg-white hover:font-bold"
              >
                <BsGoogle></BsGoogle> Sign In With Google
              </button>
            </div>
            <div>
              <h2>
                Doesn't have an account?
                <Link to="/register">
                  <span className="font-bold"> Please Register</span>
                </Link>
              </h2>
            </div>
          </form>
          {/* Forget Password Modal Form */}
          <dialog
            id="my_modal_1"
            className="modal border border-themeColor shadow-2xl "
          >
            <div className="modal-box ">
              <div>
                <div className=" card  w-full max-w-lg shrink-0 ">
                  <form onSubmit={handleForgetPassword} className="card-body">
                    <h2 className="text-center text-3xl">
                      Enter Your Valid Email Address
                    </h2>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        name="forgetEmail"
                        placeholder="email"
                        className="input input-bordered"
                        required
                      />
                    </div>
                    <div className="form-control mt-6 space-y-2">
                      <button className="btn bg-themeColor text-white hover:bg-green-900 hover:font-bold">
                        Submit
                      </button>
                      <form method="dialog">
                        <button className="btn w-full border border-red-500 hover:bg-red-500 hover:text-white  text-black  hover:font-bold">
                          Close
                        </button>
                      </form>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Login;
