import { useState } from "react";
import { BiHome } from "react-icons/bi";
import { CiCircleChevLeft, CiCircleChevRight, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative py-4 h-[100vh] bg-gray-400 transition-all duration-300 ease-in ${isOpen ? "w-32 px-5" : "w-80 px-4"
        }`}
    >
      <button className="absolute top-3 right-2" onClick={toggleDrawer}>
        {isOpen ? (
          <CiCircleChevRight className="text-xl" />
        ) : (
          <CiCircleChevLeft className="text-xl" />
        )}
      </button>
      <h2 className={`font-medium ${isOpen && "hidden"}`}>Project</h2>
      {isOpen ? (
        <div className="flex flex-col mt-6 gap-4">
          <Link
            to="/dashboard"
            className="w-full flex items-center gap-2"
          >
            <BiHome /> Admin Home
          </Link>
          <Link
            to="/main/news-feed"
            className="w-full flex items-center gap-2"
          >
            <BiHome /> Main Home
          </Link>
          <Link to="/dashboard/allUsers" className="flex items-center gap-2">
            <CiUser /> All Users
          </Link>
        </div>
      ) : (
        <div className="flex flex-col mt-6 gap-4">
          <Link
            to="/dashboard"
            className="w-full flex items-center gap-2"
          >
            <BiHome /> Admin Home
          </Link>
          <Link
            to="/main/news-feed"
            className="w-full flex items-center gap-2"
          >
            <BiHome /> Main Home
          </Link>
          <Link to="/dashboard/allUsers" className="flex items-center gap-2">
            <CiUser /> All Users
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideDrawer;
