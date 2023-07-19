/* eslint-disable no-prototype-builtins */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { BsFilterRight } from "react-icons/bs";

export default function FilterModal({ open, setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function removeEmptyStringProperties(obj) {
    for (const key in obj) {
      if (obj[key] === "") {
        delete obj[key];
      }
    }
    return obj;
  }

  const onSubmit = (data) => {
    const cleanedEmptyData = removeEmptyStringProperties(data);
    if (cleanedEmptyData.hasOwnProperty("pricemax")) {
      cleanedEmptyData.pricemax = parseInt(cleanedEmptyData.pricemax);
    }
    if (cleanedEmptyData.hasOwnProperty("pricemin")) {
      cleanedEmptyData.pricemin = parseInt(cleanedEmptyData.pricemin);
    }
    if (cleanedEmptyData.hasOwnProperty("bathRooms")) {
      cleanedEmptyData.bathRooms = parseInt(cleanedEmptyData.bathRooms);
    }
    if (cleanedEmptyData.hasOwnProperty("bedRooms")) {
      cleanedEmptyData.bedRooms = parseInt(cleanedEmptyData.bedRooms);
    }
    console.log(cleanedEmptyData);
    setOpen(false);
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
                            City
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Norway"
                          {...register("city")}
                          className="input input-bordered text-black font-semibold"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            Bedrooms
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="5"
                          {...register("bedRooms", {
                            pattern: /^[0-9]+$/,
                          })}
                          className="input input-bordered text-black font-semibold"
                        />
                        {errors.bedRooms?.type === "pattern" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            Please provide a valid number
                          </p>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            Bathrooms
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="3"
                          {...register("bathRooms", {
                            pattern: /^[0-9]+$/,
                          })}
                          className="input input-bordered text-black font-semibold"
                        />
                        {errors.bathRooms?.type === "pattern" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            Please provide a valid number
                          </p>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            Room Size
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="3.44 x 5.45"
                          {...register("roomsize")}
                          className="input input-bordered text-black font-semibold"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            Availability
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="18th July,23 to 24th July,23"
                          {...register("availability")}
                          className="input input-bordered text-black font-semibold"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            Price Per Month (Give a range)
                          </span>
                        </label>
                        <div className="flex gap-x-3">
                          <input
                            type="text"
                            placeholder="$1000"
                            {...register("pricemin", {
                              pattern: /^[0-9]+$/,
                            })}
                            className="input input-bordered text-black font-semibold w-1/2"
                          />
                          <input
                            type="text"
                            placeholder="$3800"
                            {...register("pricemax", {
                              pattern: /^[0-9]+$/,
                            })}
                            className="input input-bordered text-black font-semibold w-1/2"
                          />
                        </div>
                        {errors.pricemin?.type === "pattern" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            Please provide a valid number
                          </p>
                        )}
                        {errors.pricemax?.type === "pattern" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            Please provide a valid number
                          </p>
                        )}
                      </div>
                      <div></div>
                      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-lime-400 px-3 py-2 text-sm font-semibold text-blue-900 shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto gap-x-2"
                        >
                          <BsFilterRight className="text-xl font-bold" />
                          <p>Filter</p>
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
