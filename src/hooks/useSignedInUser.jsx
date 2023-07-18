/* import { useQuery } from "@tanstack/react-query";

const useSignedInUser = () => {
    const {
        data: user = {},
        isLoading,
        refetch,
      } = useQuery("classes", async () => {
        const res = await fetch("https://athletex-com-server.vercel.app/classes");
        return res.json();
      });
      return [user, isLoading, refetch];
};

export default useSignedInUser; */
