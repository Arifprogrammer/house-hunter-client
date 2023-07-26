import { useEffect, useState } from "react";
import House from "../House/House";
import { useLoaderData } from "react-router-dom";
import { BsFilterRight } from "react-icons/bs";
import FilterModal from "../../../components/FilterModal";
import { useForm } from "react-hook-form";
import axios from "axios";

const Home = () => {
  //* hooks
  const [houses, setHouses] = useState([]);
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");
  const [forceRerender, setForceRerender] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const { totalHouses } = useLoaderData();
  const totalPages = Math.ceil(totalHouses / itemsPerPage);
  const pagesNumbers = [...Array(totalPages).keys()];
  const options = [5, 10, 20];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //* functions
  const handleSelectChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const onSubmit = (data) => {
    const params = new URLSearchParams(data).toString();
    const searchHouse = async () => {
      const res = await axios.get(
        `https://house-hunter-server-sage.vercel.app/searchhouse?${params}`
      );
      if (res.data.length < 1) {
        setError("Not found any data please try again");
      }
      setHouses(res.data);
      setShow(false);
      reset();
    };
    searchHouse();
  };

  const handleSeeAllHouse = () => {
    setCurrentPage(0);
    setItemsPerPage(10);
    setForceRerender((prev) => prev + 1);
    setError("");
    setShow(true);
  };

  useEffect(() => {
    const getHouse = async () => {
      const res = await fetch(
        `https://house-hunter-server-sage.vercel.app/houses?page=${currentPage}&limit=${itemsPerPage}`
      );
      const getData = await res.json();
      setHouses(getData);
    };
    getHouse();
  }, [currentPage, itemsPerPage, forceRerender]);

  return (
    <section className="my-container my-16 lg:mt-12 lg:mb-20 px-4 lg:px-0">
      <form
        className="mb-16 flex flex-col lg:flex-row justify-center items-center gap-y-3 lg:gap-x-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="join lg:w-3/5">
          <input
            className="input input-bordered join-item grow focus:border-0"
            placeholder="Search by city like Germany/Sweden/Finland"
            {...register("city", {
              required: true,
              pattern: /^[a-zA-Z]+$/,
            })}
          />
          <button
            type="submit"
            className="btn join-item rounded-r-full bg-slate-300"
          >
            Search
          </button>
        </div>
        <div
          className="flex items-center gap-x-1 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <BsFilterRight className="text-xl font-bold" />
          <p className="font-semibold">Filter</p>
        </div>
      </form>
      {errors.city?.type === "required" && (
        <p className="text-red-600 font-semibold -mt-12 mb-16 ml-2 text-center text-lg">
          Field is required
        </p>
      )}
      {errors.city?.type === "pattern" && (
        <p className="text-red-600 font-semibold -mt-12 mb-16 ml-2 text-center text-lg">
          Only takes alphabetic characters
        </p>
      )}
      {error && (
        <p className="font-semibold text-red-600 text-center text-lg">
          {error}
        </p>
      )}
      <div className="grid grid-col-1 lg:grid-cols-3 gap-12 lg:gap-x-20">
        {houses.map((house) => (
          <House key={house._id} house={house} />
        ))}
      </div>
      {show ? (
        <div className="text-center mt-12">
          {pagesNumbers.map((number) => (
            <button
              className={`px-3 py-1 rounded-full text-black mr-3 ${
                currentPage === number ? "bg-[#A3E635]" : "bg-slate-200"
              }`}
              key={number}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}
          <select
            value={itemsPerPage}
            onChange={handleSelectChange}
            className="text-black border-2 border-blue-900 py-[2px] rounded-full"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={handleSeeAllHouse}
            className="rounded-md bg-lime-400 px-6 py-2 font-semibold text-blue-900 shadow-sm hover:bg-red-500"
          >
            <p>See All</p>
          </button>
        </div>
      )}
      <FilterModal
        open={open}
        setOpen={setOpen}
        setHouses={setHouses}
        setShow={setShow}
        setError={setError}
      />
    </section>
  );
};

export default Home;
