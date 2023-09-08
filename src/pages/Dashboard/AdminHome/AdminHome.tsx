import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AdminHome = () => {
    const [axiosSecure] = useAxiosSecure();

  const fetchStats = async () => {
    const res = await axiosSecure.get("/statistics");
    return res.data;
  };
  const {
    data: stats = [],
    isLoading,
    error,
    refetch,
  } = useQuery(["stats"], fetchStats);

  console.log(stats)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
    return (
        <div className="ml-10 mt-10 md:w-full mx-auto">
            <div className="flex flex-wrap gap-5">
                <div className="border rounded-lg shadow-lg p-4">
                    <h3 className="text-3xl font-semibold">All Registered User</h3>
                    <h1 className="text-4xl font-semibold text-center">{stats?.usersCount}</h1>
                </div>
                <div className="border rounded-lg shadow-lg p-4">
                    <h1 className="text-3xl font-semibold">Total Questions Posted</h1>
                    <p className="text-4xl font-semibold text-center">{stats?.questionsCount}</p>
                </div>
                <div className="border rounded-lg shadow-lg p-4">
                    <h1 className="text-3xl font-semibold">All Answers Given</h1>
                    <p className="text-4xl font-semibold text-center">{stats?.answersCount}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;