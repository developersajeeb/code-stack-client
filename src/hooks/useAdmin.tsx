import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAdmin = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return {
      isAdmin: false,
      isAdminLoading: true,
    };
  }
  const { user, loading } = authContext;
  const [axiosSecure] = useAxiosSecure();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery<boolean>({
    enabled: !loading && !!user,
    queryKey: ['isAdmin', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      return res.data.admin;
    }
  })
  return {
    isAdmin,
    isAdminLoading
  }
};

export default useAdmin;