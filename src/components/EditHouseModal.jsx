/* eslint-disable no-prototype-builtins */
import { Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function EditHouseModal({ open, setOpen, house }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);

  const {
    _id,
    houseName,
    image,
    address,
    city,
    price,
    ownerName,
    ownerEmail,
    phone,
    description,
    availability,
    roomSize,
    bathRooms,
    bedRooms,
  } = house;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full lg:w-[800px]">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <form
                      className="card-body p-5 lg:p-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-x-6"
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
                          defaultValue={user?.name}
                          readOnly
                          {...register("ownerName", { required: true })}
                          className="input input-bordered text-black font-semibold"
                        />
                        {errors.ownerName?.type === "required" && (
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
                          <button
                            className="btn join-item rounded-r-full"
                            disabled
                          >
                            +880
                          </button>
                          <input
                            type="tel"
                            defaultValue={phone.slice(4)}
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
                            Number must be start with 1 & must have 10 number in
                            total.
                          </p>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            Email*
                          </span>
                        </label>
                        <input
                          type="email"
                          defaultValue={user?.email}
                          readOnly
                          placeholder="Type your email"
                          {...register("ownerEmail", { required: true })}
                          className="input input-bordered text-black font-semibold"
                        />
                        {errors.ownerEmail?.type === "required" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            Email is required
                          </p>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            House Name*
                          </span>
                        </label>
                        <input
                          type="text"
                          defaultValue={houseName}
                          placeholder="Norway"
                          {...register("houseName", { required: true })}
                          className="input input-bordered text-black font-semibold"
                        />
                        {errors.houseName?.type === "required" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            House Name is required
                          </p>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            City*
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Norway"
                          defaultValue={city}
                          {...register("city", { required: true })}
                          className="input input-bordered text-black font-semibold"
                        />
                        {errors.city?.type === "required" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            City is required
                          </p>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            Bedrooms*
                          </span>
                        </label>
                        <input
                          type="text"
                          defaultValue={bedRooms}
                          placeholder="5"
                          {...register("bedRooms", {
                            required: true,
                            pattern: /^[0-9]+$/,
                          })}
                          className="input input-bordered text-black font-semibold"
                        />
                        {errors.bedRooms?.type === "required" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            Bedrooms is required
                          </p>
                        )}
                        {errors.bedRooms?.type === "pattern" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            Please provide a valid number
                          </p>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            Bathrooms*
                          </span>
                        </label>
                        <input
                          type="text"
                          defaultValue={bathRooms}
                          placeholder="3"
                          {...register("bathRooms", {
                            required: true,
                            pattern: /^[0-9]+$/,
                          })}
                          className="input input-bordered text-black font-semibold"
                        />
                        {errors.bathRooms?.type === "required" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            Bathrooms is required
                          </p>
                        )}
                        {errors.bathRooms?.type === "pattern" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            Please provide a valid number
                          </p>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            Price*
                          </span>
                        </label>
                        <input
                          type="text"
                          defaultValue={price}
                          {...register("price", {
                            required: true,
                            pattern: /^[0-9]+$/,
                          })}
                          className="input input-bordered text-black font-semibold"
                        />
                        {errors.price?.type === "required" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            Price is required
                          </p>
                        )}
                        {errors.price?.type === "pattern" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            Please provide a valid number
                          </p>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            Room Size*
                          </span>
                        </label>
                        <input
                          type="text"
                          defaultValue={roomSize}
                          placeholder="3.44 x 5.45"
                          {...register("roomsize", { required: true })}
                          className="input input-bordered text-black font-semibold"
                        />
                        {errors.roomsize?.type === "required" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            Room Size is required
                          </p>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            Availability
                          </span>
                        </label>
                        <input
                          type="text"
                          defaultValue={availability}
                          placeholder="18th July,23 to 24th July,23"
                          {...register("availability", { required: true })}
                          className="input input-bordered text-black font-semibold"
                        />
                        {errors.availability?.type === "required" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            Availability is required
                          </p>
                        )}
                      </div>
                      <div></div>
                      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-lime-400 px-3 py-2 text-sm font-semibold text-blue-900 shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto gap-x-2"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
