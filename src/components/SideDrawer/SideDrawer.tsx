import { useState } from "react";
import { BiHome } from "react-icons/bi";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { FaRegNewspaper } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { TbUserEdit } from "react-icons/tb";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative py-8 bg-gray-100 transition-all duration-300 ease-in ${isOpen ? "w-10 px-2" : "w-80 px-4"
        }`}
    >
      <button className="absolute top-4" onClick={toggleDrawer}>
        {isOpen ? (
          <CiCircleChevRight className="text-xl" />
        ) : (
          <CiCircleChevLeft className="text-xl" />
        )}
      </button>
      {isOpen ? (
        <div className="flex flex-col mt-6 gap-4">
          <Link
            to="/dashboard"
            className="w-full flex items-center gap-2"
          >
            <BiHome className="text-lg" />
          </Link>
          <Link to="/dashboard/allUsers" className="flex items-center gap-2">
            <FiUsers className="text-lg" />
          </Link>
          <Link
            to="/dashboard/edit-profile"
            className="w-full flex items-center gap-2"
          >
            <TbUserEdit className="text-lg" />
          </Link>
          <Link
            to="/main/news-feed"
            className="w-full flex items-center gap-2"
          >
            <FaRegNewspaper className="text-lg" />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col mt-6 gap-4">
          <Link
            to="/dashboard"
            className="w-full flex items-center gap-2 font-medium"
          >
            <BiHome className="text-lg" /> Admin Home
          </Link>
          <Link to="/dashboard/allUsers" className="flex items-center gap-2 font-medium">
            <FiUsers className="text-lg" /> All Users
          </Link>
          <Link
            to="/dashboard/edit-profile"
            className="w-full flex items-center gap-2 font-medium">
            <TbUserEdit className="text-lg" /> Edit Profile
          </Link>
          <Link
            to="/main/news-feed"
            className="w-full flex items-center gap-2 font-medium">
            <FaRegNewspaper className="text-lg" /> Main Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideDrawer;
