import Hamburger from "hamburger-react";
import { useState, useContext } from "react";
import logo from "../../assets/logo-codeStack.png";
import notUser from "../../assets/icons/user-not.png";
import {
  BiSearchAlt,
  BiBookmarkAlt,
  BiLogInCircle,
} from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";
import { TbUserQuestion, TbTags } from "react-icons/tb";
import { BsPersonAdd } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAdmin from "./../../hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";

const NavBar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const authContext = useContext(AuthContext);
  const { isAdmin } = useAdmin();
  if (!authContext) {
    return <p>Loading...</p>;
  }
  const { user, logOut } = authContext;

  const { data: userData = [] } = useQuery([user?.email], async () => {
    if (!user?.email) return [];
    const res = await fetch(`http://localhost:5000/user?email=${user?.email}`);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const text = await res.text();
    if (!text) {
      return [];
    }
    try {
      const data = JSON.parse(text);
      return data;
    } catch (error) {
      throw new Error('Failed to parse JSON');
    }
  });  

  return (
    <nav className="shadow-md px-2 py-3 md:px-8 lg:px-32 border-t-4 border-[#33B89F] flex items-center gap-4 md:gap-10 bg-transparent bg-white">
      <div className="flex items-center gap-4">
        <span onClick={() => { setOpen(!isOpen) }}>
          <Hamburger size={25}></Hamburger>
        </span>
        <ul className={`drop-shadow-xl grid font-medium text-gray-600 bg-white px-8 py-6 rounded-md absolute w-60 duration-300 border-2 border-dashed z-50 ${isOpen ? "left-4 lg:left-32 top-20" : "top-20 -left-60"}`}>
          <NavLink className={({ isActive }) =>
            isActive
              ? "text-color flex items-center gap-2 mb-5"
              : " text-gray-500 flex items-center gap-2 mb-5"
          } to="/news-feed"
          >
            <FaRegNewspaper /> News Feed
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-color flex items-center gap-2 mb-5"
                : " text-gray-500 flex items-center gap-2 mb-5"
            } to="/ask-question"
          >
            <TbUserQuestion /> Ask Question
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-color flex items-center gap-2 mb-5"
                : " text-gray-500 flex items-center gap-2 mb-5"
            } to="/tags"
          >
            <TbTags /> Tags
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-color flex items-center gap-2 mb-5"
                : " text-gray-500 flex items-center gap-2 mb-5"
            } to="/users"
          >
            <FiUsers /> Users
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-color flex items-center gap-2 mb-5"
                : " text-gray-500 flex items-center gap-2 mb-5"
            } to="/badges"
          >
            <BiBookmarkAlt /> Badges
          </NavLink>
          {user ? (
            <>
              <figure className="mb-5">
                <Link to={`/my-profile`}>
                  <img
                    className="rounded-full w-10 h-10 object-cover border-2"
                    src={userData?.imgURL || notUser}
                    alt="User Image"
                  />
                </Link>
              </figure>
              <button
                className="small-btn transparent-button-small w-12"
                onClick={logOut}
              >
                <BiLogInCircle />
              </button>
            </>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-color flex items-center gap-2 mb-5"
                    : " text-gray-500 flex items-center gap-2 mb-5"
                }
                to="/login"
              >
                <BiLogInCircle /> Login
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-color flex items-center gap-2"
                    : " text-gray-500 flex items-center gap-2"
                }
                to="/register"
              >
                <BsPersonAdd /> Register
              </NavLink>
            </>
          )}
        </ul>
        <figure>
          <Link to={user?.email ? '/news-feed' : '/'}>
            <img className="w-96 md:w-60" src={logo} alt="" />
          </Link>
        </figure>
      </div>
      <form className="relative w-full">
        <input type="text" name="search" id="search" className="bg-gray-100 border-0 px-5 py-2 rounded-full w-full"/>
        <span className="text-gray-500 absolute right-3 top-2 cursor-pointer">
          <BiSearchAlt size={25} />
        </span>
      </form>
      <div>
        {isAdmin && (
          <div className="hidden md:block">
            <div className="flex items-center gap-3 border-2 p-2 bg-white shadow-sm rounded-full">
              <figure className="w-9 h-9">
                <Link to='/dashboard'>
                  <img
                    className="rounded-full w-9 h-9 object-cover border"
                    src={userData?.imgURL || notUser}
                    alt=""
                  />
                </Link>
              </figure>
              <button className="transparent-button-small" onClick={logOut}>
                <BiLogInCircle />
              </button>
            </div>
          </div>
        )}
        {user ? (!isAdmin &&
          <div className="hidden md:block">
            <div className="flex items-center gap-3 border-2 p-2 bg-white shadow-sm rounded-full">
              <figure className="w-9 h-9">
                <Link to={`/my-profile`}>
                  <img
                    className="rounded-full w-9 h-9 object-cover border"
                    src={userData?.imgURL || notUser}
                    alt=""
                  />
                </Link>
              </figure>
              <button className="transparent-button-small" onClick={logOut}>
                <BiLogInCircle />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Link to="/login">
                <button className="bg-button-small">
                  Login <BiLogInCircle />
                </button>
              </Link>
            </div>
            <div className="hidden md:block">
              <Link to="register">
                <button className="bg-button-small">
                  SingUp <BsPersonAdd />
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
