/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ price, house }) => {
  //*hooks
  const { user } = useContext(AuthContext);
  const [disable, setDisable] = useState(
    user?.role === "House Renter" ? false : true
  );
  const navigate = useNavigate();

  //* customhooks
  const [axiosSecure] = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const bookHouse = { ...house };
    bookHouse.houseId = bookHouse._id;
    delete bookHouse._id;
    bookHouse.renterName = user?.name;
    bookHouse.renterEmail = user?.email;
    bookHouse.phone = `+880${data.phone}`;
    const addNewClasses = async () => {
      const res = await axiosSecure.post(`/bookhouse`, bookHouse);
      if (res.data.insertedId) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Booked successfully",
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    };
    addNewClasses();
  };

  return (
    <div className="card w-full lg:w-96 bg-transparent mx-auto my-12 rounded-sm shadow-md shadow-blue-900 lg:fixed lg:top-28 lg:right-7">
      <form className="card-body p-5 lg:p-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl">${price} month</h1>
          <div className="flex gap-x-1 items-center w-8">
            <p>5</p>
            <FaStar />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-black font-semibold text-base">
              Name*
            </span>
          </label>
          <input
            type="text"
            value={user?.name}
            readOnly
            className="input input-bordered text-black font-semibold"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-black font-semibold text-base">
              Email*
            </span>
          </label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered text-black font-semibold"
          />
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
              {...register("phone", {
                required: true,
                pattern: /1[1-9]\d{8}/,
              })}
            />
          </div>
          {errors.phone?.type === "required" && (
            <p className="text-red-600 font-semibold mt-1 ml-2">
              Mobile number is required
            </p>
          )}
          {errors.phone?.type === "pattern" && (
            <p className="text-red-600 font-semibold mt-1 ml-2">
              Number must be start with 1 & must have 10 number in total.
            </p>
          )}
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
            Reserve
          </button>
          {disable && (
            <p className="text-red-600 font-semibold mt-1 ml-2">
              {`You have to login as "House Renter"`}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
