import { useForm } from "react-hook-form";
import { useContext } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const AddHouse = () => {
  //* hooks
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  //* customhooks
  const [axiosSecure] = useAxiosSecure();

  //* custom data
  const textFields = [
    ["House Name", "text", "houseName"],
    ["Image", "url", "image"],
    ["Address", "text", "address"],
    ["City", "text", "city"],
    ["Availability", "text", "availability"],
    ["Room Size", "text", "roomSize"],
  ];

  const numberFields = [
    ["Price", "price"],
    ["Bathrooms", "bathRooms"],
    ["BedRooms", "bedRooms"],
  ];

  //* functions
  const onSubmit = (data) => {
    const newHouse = {
      ...data,
    };
    newHouse.price = parseInt(newHouse.price);
    newHouse.bathRooms = parseInt(newHouse.bathRooms);
    newHouse.bedRooms = parseInt(newHouse.bedRooms);
    newHouse.ownerName = user?.name;
    newHouse.ownerEmail = user?.email;
    newHouse.phone = `+880${newHouse.phone}`;

    const addNewHouse = async () => {
      const res = await axiosSecure.post(`/newhouse`, newHouse);
      reset();
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
          title: "Added successfully",
        });
        setTimeout(() => {
          navigate("/dashboard/managehouse");
        }, 1500);
      }
    };
    addNewHouse();
  };

  return (
    <>
      <section>
        <div className="card card1 w-[95%] lg:w-4/5 bg-white mx-auto rounded-sm shadow-md shadow-gray-700">
          <form
            className="card-body px-20 py-12  grid grid-cols-1 lg:grid-cols-2 gap-x-8 "
            onSubmit={handleSubmit(onSubmit)}
          >
            {textFields.map((tf, i) => (
              <div key={i} className="form-control">
                <label className="label">
                  <span className="label-text text-black font-semibold text-base">
                    {tf[0]}*
                  </span>
                </label>
                <input
                  type={tf[1]}
                  {...register(`${tf[2]}`, { required: true })}
                  className="input input-bordered text-black font-semibold"
                />
                {errors[`${tf[2]}`]?.type === "required" && (
                  <p className="text-red-600 font-semibold mt-1 ml-2">
                    {`${tf[0]} is required`}
                  </p>
                )}
              </div>
            ))}
            {numberFields.map((nf, i) => (
              <div key={i} className="form-control">
                <label className="label">
                  <span className="label-text text-black font-semibold text-base">
                    {nf[0]}*
                  </span>
                </label>
                <input
                  type="text"
                  {...register(`${nf[1]}`, {
                    required: true,
                    min: 0,
                    pattern: /^[0-9]+$/,
                  })}
                  className="input input-bordered text-black font-semibold"
                />
                {errors[`${nf[1]}`]?.type === "required" && (
                  <p className="text-red-600 font-semibold mt-1 ml-2">
                    {nf[0]} is required
                  </p>
                )}
                {errors[`${nf[1]}`]?.type === "pattern" && (
                  <p className="text-red-600 font-semibold mt-1 ml-2">
                    Please provide a valid number
                  </p>
                )}
                {errors[`${nf[1]}`]?.type === "min" && (
                  <p className="text-red-600 font-semibold mt-2">
                    Only takes positive number.
                  </p>
                )}
              </div>
            ))}
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
            <div className="form-control col-span-2">
              <label className="label">
                <span className="label-text text-black font-semibold text-base">
                  Description*
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered text-black font-semibold h-32 rounded-md"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-red-600 font-semibold mt-1 ml-2">
                  Description is required
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-green-700 text-white border-0 hover:bg-black  text-base lg:text-xl w-fit lg:transition lg:duration-200"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddHouse;
