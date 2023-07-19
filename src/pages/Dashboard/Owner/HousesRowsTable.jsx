import { useState } from "react";
import EditHouseModal from "../../../components/EditHouseModal";

const HousesRowsTable = ({ house, index, handleDeleteData }) => {
  const { _id, houseName, image, address, city, price, ownerName, phone } =
    house;
  //*hooks
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr className="font-bold">
        <th>{index + 1}</th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={image} alt="class picture" />
              </div>
            </div>
          </div>
        </td>
        <td>{houseName}</td>
        <td>{address}</td>
        <td>{city}</td>
        <td>$ {price}</td>
        <td>{ownerName}</td>
        <td>{phone}</td>
        <td>
          <button
            className="px-3 border-2 border-blue-700 text-blue-700 hover:text-white hover:bg-blue-700 rounded-3xl"
            onClick={() => setOpen(true)}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            className="px-3 border-2 border-red-700 text-red-700 hover:text-white hover:bg-red-700 rounded-3xl"
            onClick={() => handleDeleteData(_id)}
          >
            Delete
          </button>
        </td>
      </tr>
      <EditHouseModal open={open} setOpen={setOpen} house={house} />
    </>
  );
};

export default HousesRowsTable;
