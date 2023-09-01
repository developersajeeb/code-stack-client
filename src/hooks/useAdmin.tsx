import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const authContext = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  if (!authContext) {
    return {
      isAdmin: false,
      isAdminLoading: false,
    };
  }

  const { user, loading } = authContext;

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      console.log(res)
      return res.data.admin;
    },
  });

  return { isAdmin, isAdminLoading };
};

export default useAdmin;