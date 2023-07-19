/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
  //* hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  //* functions

  const onSubmit = (data) => {
    const { email, password, name, mobile, role } = data;
    const updatedData = { ...data };
    updatedData.mobile = `+880${updatedData.mobile}`;
    const addUser = async () => {
      const res = await fetch("http://localhost:5000/users", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (data.upsertedCount || data.matchedCount) {
        reset();
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };
    addUser();
  };

  return (
    <>
      <section className="py-16 lg:pt-20">
        <div className="card w-[95%] lg:w-[28%] bg-transparent mx-auto py-8 mt-12 rounded-sm shadow-md shadow-blue-900">
          <form
            className="card-body p-5 lg:p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black font-semibold text-base">
                  Name*
                </span>
              </label>
              <input
                type="text"
                placeholder="Type your name"
                {...register("name", { required: true })}
                className="input input-bordered text-black font-semibold"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-600 font-semibold mt-1 ml-2">
                  Name is required
                </p>
              )}
            </div>
            <div className="from-control">
              <label className="label">
                <span className="label-text text-black font-semibold text-base">
                  Mobile Number*
                </span>
              </label>
              <div className="join w-full">
                <button className="btn join-item rounded-r-full" disabled>
                  +880
                </button>
                <input
                  type="tel"
                  className="input input-bordered join-item grow rounded-r-3xl text-black font-semibold"
                  placeholder="Type your mobile number"
                  {...register("mobile", {
                    required: true,
                    pattern: /1[1-9]\d{8}/,
                  })}
                />
              </div>
              {errors.mobile?.type === "required" && (
                <p className="text-red-600 font-semibold mt-1 ml-2">
                  Mobile number is required
                </p>
              )}
              {errors.mobile?.type === "pattern" && (
                <p className="text-red-600 font-semibold mt-1 ml-2">
                  Number must be start with 1 & must have 11 number in total.
                </p>
              )}
              <div className="from-control mt-6 font-semibold text-black">
                <select
                  {...register("role", { required: true })}
                  className="select select-bordered w-full max-w-[50%]"
                  value="Select role..."
                >
                  <option disabled>Select role...</option>
                  <option value="House Owner">House Owner</option>
                  <option value="House Renter">House Renter</option>
                </select>
                {errors.role?.type === "required" && (
                  <p className="text-red-600 font-semibold mt-1 ml-2">
                    Role is required
                  </p>
                )}
              </div>
            </div>
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black font-semibold text-base">
                  Password*
                </span>
              </label>
              <input
                type="password"
                placeholder="Type your password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                className="input input-bordered text-black font-semibold"
              />

              {errors.password?.type === "required" && (
                <p className="text-red-600 font-semibold mt-1 ml-2">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600 font-semibold mt-1 ml-2">
                  Password must be 6 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600 font-semibold mt-1 ml-2">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-lime-400 text-blue-900 border-0 hover:bg-white hover:text-blue-900 hover:border-2 hover:border-blue-900 text-base lg:text-xl"
              >
                Register
              </button>
              <div className="flex items-center my-8">
                <div className="border-[1px] border-slate-700 w-full"></div>
                <p className="px-4 font-bold">Or</p>
                <div className="border-[1px] border-slate-700 w-full"></div>
              </div>
            </div>
            <p className="text-center font-semibold">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-900 font-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
