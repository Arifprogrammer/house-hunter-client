import { Link } from "react-router-dom";

const House = ({ house }) => {
  const { address, city, image, availability, ownerName, price } = house;
  return (
    <>
      <Link>
        <div className="card w-full bg-base-100 shadow-xl font-semibold">
          <figure className="h-[256px] w-full overflow-hidden">
            <img
              src={image}
              alt="house"
              className="h-full w-full object-cover object-center lg:hover:scale-125 lg:transition lg:duration-300"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {address}, {city}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p className="text-gray-500 text-lg">Stay with {ownerName}!</p>
            <p className="text-gray-500">{availability}</p>
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
