import { useQuery } from "@tanstack/react-query";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import ChartDetails from "./ChartDetails";
import noUserImage from "../../../assets/icons/user-not.png";
import {useEffect,useState} from 'react'

interface UserType {
  _id: '';
  imgURL: '';
  name: '';
  email: '';
}

const AdminHome = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);

  const { data: allQuestions = [] } = useQuery([], async () => {
    const res = await fetch(`http://localhost:5000/questions`);
    const data = await res.json();
    return data;
  });

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
    .then(res => res.json())
    .then(data => setAllUsers(data))
  },[]);

  useEffect(() => {
    fetch(`http://localhost:5000/answers`)
    .then(res => res.json())
    .then(data => setAllAnswers(data))
  },[]);

  return (
    <main>
      <section className="grid md:grid-cols-3 gap-8">
        <div className="rounded-lg p-6 flex gap-3 items-center bg-slate-50">
          <span className="bg-indigo-100 text-gray-700 p-3 rounded-full"><PiUsersThree size={45} /></span>
          <div>
            <h5 className="font-medium text-gray-600">All Registered User</h5>
            <p className="text-2xl font-semibold">{allUsers?.length}</p>
          </div>
        </div>
        <div className=" rounded-lg p-6 flex gap-3 items-center bg-yellow-50">
          <span className="bg-orange-100 text-gray-700 p-3 rounded-full"><TbMessageCircleQuestion size={45} /></span>
          <div>
            <h5 className="font-medium text-gray-600">Total Questions Posted</h5>
            <p className="text-2xl font-semibold">{allQuestions?.length}</p>
          </div>
        </div>
        <div className="rounded-lg p-6 flex gap-3 items-center bg-purple-50">
          <span className="bg-purple-100 text-gray-700 p-3 rounded-full"><MdOutlineQuestionAnswer size={45} /></span>
          <div>
            <h5 className="font-medium text-gray-600">All Answers Given</h5>
            <p className="text-2xl font-semibold">{allAnswers?.length}</p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mt-10">
        <div className="md:col-span-2">
          <ChartDetails></ChartDetails>
        </div>
        <div>
          <h3 className="font-medium bg-indigo-50 px-5 py-2 text-color rounded-md inline-block">New Users</h3>
          <ul className="grid gap-3 mt-6">
            {
              allUsers?.slice(0,6).map((user: UserType) => <li key={user?._id} className="flex items-center gap-2">
                <figure>
                  <img className="rounded-full w-12 h-12 object-cover" src={user?.imgURL || noUserImage} alt="user image" />
                </figure>
                <figure>
                  <h4>{user?.name}</h4>
                  <small className="text-gray-500">{user?.email}</small>
                </figure>
              </li>)
            }
          </ul>
        </div>
      </section>
    </main>
  );
};

export default AdminHome;