/* eslint-disable no-prototype-builtins */
import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function EditHouseModal({
  open,
  setOpen,
  specificHouse,
  refetch,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);
  const [toggle, setToggle] = useState(true);

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
  } = specificHouse;

  //* custom data
  const textFields = [
    ["House Name", "text", "houseName", houseName],
    ["Image", "url", "image", image],
    ["Address", "text", "address", address],
    ["City", "text", "city", city],
    ["Availability", "text", "availability", availability],
    ["Room Size", "text", "roomSize", roomSize],
  ];

  const numberFields = [
    ["Price", "price", price],
    ["Bathrooms", "bathRooms", bathRooms],
    ["BedRooms", "bedRooms", bedRooms],
  ];

  const userFields = [
    ["Name", "text", "ownerName", ownerName],
    ["Email", "email", "ownerEmail", ownerEmail],
  ];

  const onSubmit = (dataa) => {
    setToggle(!toggle);
    const editHouse = {
      ...dataa,
    };
    editHouse.price = parseInt(editHouse.price);
    editHouse.bathRooms = parseInt(editHouse.bathRooms);
    editHouse.bedRooms = parseInt(editHouse.bedRooms);
    editHouse.phone = `+880${editHouse.phone}`;

    const updateHouse = async () => {
      const res = await fetch(
        `https://house-hunter-server-sage.vercel.app/update?id=${_id}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(editHouse),
        }
      );
      const data = await res.json();
      if (data.upsertedCount || data.matchedCount) {
        refetch();
        setOpen(false);
      }
    };
    updateHouse();
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
                      {userFields.map((uf) => (
                        <div key={uf[2]} className="form-control">
                          <label className="label">
                            <span className="label-text text-black font-semibold text-base">
                              {uf[0]}*
                            </span>
                          </label>
                          <input
                            type={uf[1]}
                            defaultValue={user?.email || uf[3]}
                            readOnly
                            {...register(`${uf[2]}`, {
                              required: true,
                            })}
                            className="input input-bordered text-gray-500 font-semibold"
                          />
                          {errors[`${uf[2]}`]?.type === "required" && (
                            <p className="text-red-600 font-semibold mt-1 ml-2">
                              {uf[0]} is required
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
                          <button
                            className="btn join-item rounded-r-full"
                            disabled
                          >
                            +880
                          </button>
                          <input
                            type="tel"
                            defaultValue={phone?.slice(4)}
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
                            Number must be start with 1 & must have 10 number in
                            total.
                          </p>
                        )}
                      </div>
                      {textFields.map((tf) => (
                        <div key={tf[2]} className="form-control">
                          <label className="label">
                            <span className="label-text text-black font-semibold text-base">
                              {tf[0]}*
                            </span>
                          </label>
                          <input
                            type={tf[1]}
                            defaultValue={tf[3]}
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
                      {numberFields.map((nf) => (
                        <div key={nf[1]} className="form-control">
                          <label className="label">
                            <span className="label-text text-black font-semibold text-base">
                              {nf[0]}*
                            </span>
                          </label>
                          <input
                            type="text"
                            defaultValue={nf[2]}
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
                      <div className="form-control col-span-2">
                        <label className="label">
                          <span className="label-text text-black font-semibold text-base">
                            Description*
                          </span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered text-black font-semibold h-32 rounded-md"
                          defaultValue={description}
                          {...register("description", { required: true })}
                        ></textarea>
                        {errors.description?.type === "required" && (
                          <p className="text-red-600 font-semibold mt-1 ml-2">
                            Description is required
                          </p>
                        )}
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
