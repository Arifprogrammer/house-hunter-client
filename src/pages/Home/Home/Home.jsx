import { useEffect, useState } from "react";
import House from "../House/House";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  //* hooks
  const [houses, setHouses] = useState([]);
  const { totalHouses } = useLoaderData();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
        `http://localhost:5000/houses?page=${currentPage}&limit=${itemsPerPage}`
      );
      const getData = await res.json();
      setHouses(getData);
    };
    getHouse();
  }, [currentPage, itemsPerPage]);

  return (
    <section className="my-container my-16 lg:mt-12 lg:mb-20">
      <div className="text-center mb-16">
        <div className="join w-3/5">
          <input
            className="input input-bordered join-item grow"
            placeholder="Search..."
          />
          <button className="btn join-item rounded-r-full">Search</button>
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
            className={`px-3 py-1 rounded-lg text-black mr-3 ${
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
          className="text-black border-2 border-blue-900 py-[2px] rounded-lg"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default Home;
