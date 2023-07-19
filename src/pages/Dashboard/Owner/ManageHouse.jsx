import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ClassesRowsTable from "./HousesRowsTable";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageHouse = () => {
  //* hooks
  const { user } = useContext(AuthContext);
  //* customhooks
  const [axiosSecure] = useAxiosSecure();
  const token = localStorage.getItem("user_access_token");
  const { data: myHouses = [], refetch } = useQuery({
    queryKey: ["my-houses", user?.email],
    enabled: !!user?.email && !!token,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/myhouses?email=${user?.email}`
      );
      return res.data;
    },
  });
  const reverseMyHouses = [...myHouses].reverse();

  //* functions
  const handleDeleteData = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteData = async () => {
          const res = await axiosSecure.delete(
            `/dashboard/selectedhouse/${id}`
          );
          refetch();
          if (res.data.deletedCount) {
            Swal.fire("Deleted!", "Deleted", "success");
          }
        };
        deleteData();
      }
    });
  };

  return (
    <>
      <div className="overflow-x-auto w-full px-20">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>House Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Price</th>
              <th>Owner Name</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reverseMyHouses &&
              reverseMyHouses?.map((house, index) => (
                <ClassesRowsTable
                  key={house._id}
                  house={house}
                  index={index}
                  handleDeleteData={handleDeleteData}
                />
              ))}
          </tbody>
        </table>
        {reverseMyHouses?.length === 0 && (
          <>
            <p className="mt-10 text-red-600 font-bold text-lg text-center">
              You have not add any classes yet !!!
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default ManageHouse;
