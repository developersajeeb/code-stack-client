import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";


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
  } = useQuery(["stats"], fetchStats);

  console.log(stats)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  return (
    <main>
      <section className="grid md:grid-cols-3 gap-8">
        <div className="rounded-lg p-6 flex gap-3 items-center bg-slate-50">
          <span className="bg-indigo-100 text-gray-700 p-3 rounded-full"><PiUsersThree size={45} /></span>
          <div>
            <h5 className="font-medium text-gray-600">All Registered User</h5>
            <p className="text-2xl font-semibold">{stats?.usersCount}</p>
          </div>
        </div>
        <div className=" rounded-lg p-6 flex gap-3 items-center bg-yellow-50">
          <span className="bg-orange-100 text-gray-700 p-3 rounded-full"><TbMessageCircleQuestion size={45} /></span>
          <div>
            <h5 className="font-medium text-gray-600">Total Questions Posted</h5>
            <p className="text-2xl font-semibold">{stats?.questionsCount}</p>
          </div>
        </div>
        <div className="rounded-lg p-6 flex gap-3 items-center bg-purple-50">
          <span className="bg-purple-100 text-gray-700 p-3 rounded-full"><MdOutlineQuestionAnswer size={45} /></span>
          <div>
            <h5 className="font-medium text-gray-600">All Answers Given</h5>
            <p className="text-2xl font-semibold">{stats?.answersCount}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminHome;