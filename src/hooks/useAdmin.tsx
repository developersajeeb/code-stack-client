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

  if (!user || !user.email || loading) {
    return {
      isAdmin: false,
      isAdminLoading: true,
    };
  }

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    enabled: !loading,
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        return res.data.admin;
      } catch (error) {
        console.error("Error fetching isAdmin:", error);
        return false;
      }
    },
  });

  return { isAdmin, isAdminLoading };
};

export default useAdmin;