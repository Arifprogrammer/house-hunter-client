/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignIn = () => {
  //* hooks
  const [passError, setPassError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [disable, setDisable] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  //* functions
  const onSubmit = (data) => {};

  return (
    <>
      <section className="py-16 lg:pt-32">
        <div className="card w-[95%] lg:w-[28%] bg-transparent mx-auto py-8 mt-12 rounded-sm shadow-md shadow-blue-900">
          <form
            className="card-body p-5 lg:p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black font-semibold text-base">
                  Email*
                </span>
              </label>
              <input
                type="email"
                placeholder="Type your email"
                {...register("email", { required: true })}
                className="input input-bordered text-black font-semibold"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600 font-semibold mt-1 ml-2">
                  Email is required
                </p>
              )}
              <p className="text-red-600 font-semibold mt-1 ml-2">
                {emailError}
              </p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black font-semibold text-base">
                  Password*
                </span>
              </label>
              <input
                type={showPassword ? "password" : "text"}
                placeholder="Type your password"
                {...register("password", { required: true })}
                className="input input-bordered text-black font-semibold"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="text-xl ml-auto mr-7 -mt-8"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
              <label className="label mt-1">
                <Link className="label-text-alt link link-hover text-slate-700 text-sm">
                  Forgot password?
                </Link>
              </label>

              {errors.password?.type === "required" && (
                <p className="text-red-600 font-semibold mt-1 ml-2">
                  Password is required
                </p>
              )}
              <p className="text-red-600 font-semibold mt-1 ml-2">
                {passError}
              </p>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn text-base lg:text-xl border-0 ${
                  disable === false
                    ? "bg-lime-400 text-blue-900 hover:bg-white hover:text-blue-900 hover:border-2 hover:border-blue-900"
                    : "bg-lime-300"
                } `}
                disabled={disable}
              >
                Login
              </button>
              <div className="flex items-center my-8">
                <div className="border-[1px] border-slate-700 w-full"></div>
                <p className="px-4 font-bold">Or</p>
                <div className="border-[1px] border-slate-700 w-full"></div>
              </div>
            </div>
            <p className="text-center font-semibold">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-900 font-bold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignIn;
