import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const House = ({ house }) => {
  const {
    _id,
    address,
    city,
    houseName,
    image,
    availability,
    ownerName,
    price,
  } = house;
  return (
    <>
      <Link to={`/houses/${_id}`}>
        <div className="card w-full bg-base-100 shadow-xl font-semibold">
          <figure className="h-[256px] w-full overflow-hidden">
            <img
              src={image}
              alt="house"
              className="h-full w-full object-cover object-center lg:hover:scale-125 lg:transition lg:duration-300"
            />
          </figure>
          <div className="card-body">
            <p className="text-lg">{houseName}</p>
            <h2 className="card-title">
              {address}, {city}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p className="text-gray-500 text-lg">Stay with {ownerName}!</p>
            <p className="text-gray-500">{availability}</p>
            <div className="flex gap-x-1 items-center w-8">
              <p>5</p>
              <FaStar />
            </div>
            <p className="font-bold">
              ${price}
              <span className="font-normal tracking-tighter">/per month</span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default House;
