import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SpecificHouse = () => {
  const { id } = useParams();
  const [house, setHouse] = useState({});
  const {
    _id,
    address,
    city,
    houseName,
    bedRooms,
    bathRooms,
    roomSize,
    image,
    description,
    phone,
    ownerEmail,
    availability,
    ownerName,
    price,
  } = house;

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`http://localhost:5000/houses/${id}`);
      const data = await res.json();
      console.log(data);
      setHouse(data);
    };
    loadData();
  }, [id]);
  return (
    <>
      <section className="min-h-screen  py-8 lg:py-20 px-4 md:px-8 lg:px-0 lg:w-1/2 lg:mx-auto">
        {house && (
          <div className="grid grid-cols-1 gap-y-10 font-semibold">
            <div>
              <img
                src={image}
                alt=""
                className="rounded-2xl shadow-lg shadow-primary"
              />
            </div>
            <div className="divide-y-2 space-y-4">
              <div>
                <p className="text-2xl text-blue-900 font-bold">{houseName}</p>
                <p>
                  {address}, {city}
                </p>
                <p className="text-gray-500 text-lg">Stay with {ownerName}!</p>
              </div>
              <div className="pt-4">
                <p>{description}</p>
              </div>
              <div className="pt-4">
                <p>Bedrooms: {bedRooms}</p>
                <p>Bathrooms: {bathRooms}</p>
                <p>Room size: {roomSize}</p>
                <p>Available: {availability}</p>
              </div>
              <div className="pt-4 text-gray-600">
                <p>Owner Name: {ownerName}</p>
                <p>Owner Email: {ownerEmail}</p>
                <p>Phone: {phone}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default SpecificHouse;
