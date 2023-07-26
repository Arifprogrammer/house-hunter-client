import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useBookedHouse = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const token = localStorage.getItem("user_access_token");
  const { data: bookedHouse = [], refetch } = useQuery({
    queryKey: ["booked", user?.email],
    enabled: !!user?.email && !!token,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/bookedhouse?email=${user.email}`
      );
      return res.data;
    },
  });
  return [bookedHouse, refetch];
};

export default useBookedHouse;
