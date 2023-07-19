import { useEffect, useState } from "react";
import House from "../House/House";
import { useLoaderData } from "react-router-dom";
import { BsFilterRight } from "react-icons/bs";
import FilterModal from "../../../components/FilterModal";

const Home = () => {
  //* hooks
  const [houses, setHouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const { totalHouses } = useLoaderData();
  const totalPages = Math.ceil(totalHouses / itemsPerPage);
  const pagesNumbers = [...Array(totalPages).keys()];
  const options = [5, 10, 20];

  //?-----------------------
  const handleSelectChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
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
  }, [currentPage, itemsPerPage]);

  return (
    <section className="my-container my-16 lg:mt-12 lg:mb-20 px-4 lg:px-0">
      <div className="mb-16 flex flex-col lg:flex-row justify-center items-center gap-y-3 lg:gap-x-6">
        <div className="join lg:w-3/5">
          <input
            className="input input-bordered join-item grow"
            placeholder="Search..."
          />
          <button className="btn join-item rounded-r-full bg-slate-300">
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
      </div>
      <div className="grid grid-col-1 lg:grid-cols-3 gap-12 lg:gap-x-20">
        {houses.map((house) => (
          <House key={house._id} house={house} />
        ))}
      </div>
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
      <FilterModal open={open} setOpen={setOpen} />
    </section>
  );
};

export default Home;
