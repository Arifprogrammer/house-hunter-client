/* eslint-disable no-prototype-builtins */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { BsFilterRight } from "react-icons/bs";
import axios from "axios";

export default function FilterModal({
  open,
  setOpen,
  setHouses,
  setShow,
  setError,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //* custom data
  const textFields = [
    ["City", "city", "Norway"],
    ["Availability", "availability", "18th July,23 to 24th July,23"],
    ["Room Size", "roomSize", "3.44 x 5.45"],
  ];

  const priceFileds = [
    ["$1000", "pricemin"],
    ["$3800", "pricemax"],
  ];

  const numberFields = [
    ["Bathrooms", "bathRooms", "2"],
    ["BedRooms", "bedRooms", "4"],
  ];

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
    if (cleanedEmptyData === {}) {
      setOpen(false);
      return;
    }
    const propertiesToParse = ["pricemax", "pricemin", "bathRooms", "bedRooms"];
    for (const property of propertiesToParse) {
      if (cleanedEmptyData.hasOwnProperty(property)) {
        cleanedEmptyData[property] = parseInt(cleanedEmptyData[property]);
      }
    }

    const filterHouse = async () => {
      const res = await axios.post(
        "https://house-hunter-server-sage.vercel.app/filterhouse",
        cleanedEmptyData
      );
      if (res.data.length < 1) {
        setError("Not found any data please try again");
      }
      setHouses(res.data);
      setShow(false);
      reset();
    };
    filterHouse();

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
                      {textFields.map((tf) => (
                        <div key={tf[1]} className="form-control">
                          <label className="label">
                            <span className="label-text text-black font-semibold text-base">
                              {tf[0]}
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder={tf[2]}
                            {...register(`${tf[1]}`)}
                            className="input input-bordered text-black font-semibold"
                          />
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
                            placeholder={nf[2]}
                            {...register(`${nf[1]}`, {
                              min: 0,
                              pattern: /^[0-9]+$/,
                            })}
                            className="input input-bordered text-black font-semibold"
                          />
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
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            Price Per Month (Give a range)
                          </span>
                        </label>
                        <div className="grid grid-cols-2 gap-x-3">
                          {priceFileds.map((pf) => (
                            <>
                              <input
                                key={pf[1]}
                                type="text"
                                placeholder={pf[0]}
                                {...register(`${pf[1]}`, {
                                  pattern: /^[0-9]+$/,
                                  min: 0,
                                })}
                                className="input input-bordered text-black font-semibold w-full"
                              />
                              {errors[`${pf[1]}`]?.type === "pattern" && (
                                <p className="col-span-2 text-red-600 font-semibold mt-1 ml-2">
                                  Please provide a number without symbol
                                </p>
                              )}
                              {errors[`${pf[1]}`]?.type === "min" && (
                                <p className="col-span-2 text-red-600 font-semibold mt-2">
                                  Only takes positive number.
                                </p>
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                      <div></div>
                      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="inline-flex justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-blue-900 shadow-sm hover:bg-gray-400 hover:text-black sm:ml-3 sm:w-auto gap-x-2"
                        >
                          Cancel
                        </button>
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
