import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/codestack-logo.png";
import notUser from "../../assets/icons/user-not.png";
import {
  BiSearchAlt,
  BiBookmarkAlt,
} from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";
import { TbUserQuestion, TbTags, TbDeviceIpadHorizontalQuestion, TbUserEdit } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";

import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAdmin from "./../../hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { LuUser2 } from "react-icons/lu";
import { OverlayPanel } from "primereact/overlaypanel";
import { IoChatbubblesOutline, IoLogOutOutline } from "react-icons/io5";
import { Sidebar } from "primereact/sidebar";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const authContext = useContext(AuthContext);
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  // const [emptyError, setEmptyError] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const opDesktop = useRef<OverlayPanel>(null);
  const opMobile = useRef<OverlayPanel>(null);
  const [visible, setVisible] = useState<boolean>(false);

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

  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // setEmptyError(false);
    if (!searchQuery) {
      // setEmptyError(true);
      return;
    }
    // setEmptyError(false);
    navigate(`/news-feed?search_query=${searchQuery}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`bg-white fixed top-0 right-0 left-0 transition-all duration-300 z-50 px-4 ${isScrolled ? "shadow-md py-3" : "py-4"}`}>
        <div className="max-w-[1320px] grid grid-cols-3 lg:grid-cols-6 gap-5 xl:gap-10 items-center mx-auto">
          <div className={`${isScrolled ? '-mt-24 lg:mt-0' : 'mt-0'} duration-300 block lg:hidden`}>
            <HiOutlineMenuAlt1 size={32} onClick={() => setVisible(true)} />
          </div>

          {isScrolled}
          <figure className={`grid justify-center lg:justify-start duration-300 ${isScrolled ? '-mt-24 lg:mt-0' : 'mt-0'}`}>
            <Link to={user?.email ? '/news-feed' : '/'}>
              <img className="max-w-[165px]" src={logo} alt="" />
            </Link>
          </figure>

          <div className={`${isScrolled ? '-mt-24 lg:mt-0' : 'mt-0'} duration-300 block lg:hidden`}>
            <div className="grid justify-end">
              <div onClick={(e) => opMobile.current && opMobile.current.toggle(e)} className="inline-block cursor-pointer"><LuUser2 size={30} className="text-gray-800" /></div>
              <OverlayPanel ref={opMobile}>
                {isAdmin && (
                  <>
                    <Link to='/dashboard'>
                      <img
                        className="rounded-full w-10 h-10 object-cover border-2 border-indigo-50"
                        src={userData?.imgURL || notUser}
                        alt="User"
                      />
                    </Link>
                    <button className="text-sm flex items-center gap-1 mt-3" onClick={logOut}>
                      <IoLogOutOutline size={22} /> Log Out
                    </button>
                  </>
                )}
                {user ? (!isAdmin &&
                  <>
                    <Link to={`/my-profile`} className="inline-block mb-3">
                      <img
                        className="rounded-full w-10 h-10 object-cover border-2 border-indigo-50"
                        src={userData?.imgURL || notUser}
                        alt="User"
                      />
                    </Link>
                    <NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-1 text-sm font-medium mb-2' : 'flex items-center gap-1 text-sm font-medium mb-3'} to='/my-profile/answers'><IoChatbubblesOutline size={18} /> Answers</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-1 text-sm font-medium mb-2' : 'flex items-center gap-1 text-sm font-medium mb-3'} to='/my-profile/questions'><TbDeviceIpadHorizontalQuestion size={18} /> Questions</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-1 text-sm font-medium mb-2' : 'flex items-center gap-1 text-sm font-medium mb-3'} to='/my-profile/saves'><BiBookmarkAlt size={18} /> Saves</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-1 text-sm font-medium mb-2' : 'flex items-center gap-1 text-sm font-medium mb-3'} to={`/my-profile/edit-profile`}><TbUserEdit size={18} /> Edit Profile</NavLink>
                    <button className="text-sm flex items-center gap-1 font-medium" onClick={logOut}>
                      <IoLogOutOutline size={22} /> Log Out
                    </button>
                  </>
                ) : (
                  <div className="grid gap-3">
                    <NavLink className={({ isActive }) =>
                      isActive
                        ? "lg:py-2 lg:px-5 xl:py-3.5 xl:px-8 rounded-full lg:bg-[#269782] duration-300"
                        : "lg:py-2 lg:px-5 xl:py-3.5 xl:px-8 rounded-full lg:bg-[#33B89F] hover:bg-[#269782] duration-300"
                    } to="/login"
                    >
                      <button className=" lg:text-white text-base font-medium">Login</button>
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                      isActive
                        ? "lg:py-2 lg:px-5 xl:py-3.5 xl:px-8 rounded-full lg:bg-[#269782] duration-300"
                        : " lg:py-2 lg:px-5 xl:py-3.5 xl:px-8 rounded-full lg:bg-[#33B89F] hover:bg-[#269782] duration-300"
                    } to="/register"
                    >
                      <button className=" lg:text-white text-base font-medium">SingUp</button>
                    </NavLink>
                  </div>
                )}
              </OverlayPanel>
            </div>
          </div>

          <div className="col-span-5 hidden lg:block">
            <div className="flex items-center gap-5 xl:gap-9 justify-end">
              <div className="flex w-full items-center justify-end gap-4">
                <NavLink className={({ isActive }) =>
                  isActive
                    ? "text-color font-medium text-sm hover:text-primary-color duration-300"
                    : " text-gray-600 font-medium text-sm hover:text-primary-color duration-300"
                } to="/news-feed"
                >
                  News Feed
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-color font-medium text-sm hover:text-primary-color duration-300"
                      : " text-gray-600 font-medium text-sm hover:text-primary-color duration-300"
                  } to="/ask-question"
                >
                  Ask Question
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-color font-medium text-sm hover:text-primary-color duration-300"
                      : " text-gray-600 font-medium text-sm hover:text-primary-color duration-300"
                  } to="/tags"
                >
                  Tags
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-color font-medium text-sm hover:text-primary-color duration-300"
                      : " text-gray-600 font-medium text-sm hover:text-primary-color duration-300"
                  } to="/users"
                >
                  Users
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-color font-medium text-sm hover:text-primary-color duration-300"
                      : " text-gray-600 font-medium text-sm hover:text-primary-color duration-300"
                  } to="/level"
                >
                  Level
                </NavLink>
              </div>

              <form className="w-full max-w-[260px] xl:max-w-xs" onSubmit={handleSearch}>
                <div className="bg-white flex px-1 py-1 rounded-full border border-[#33B89F] overflow-hidden ml-auto">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search with title and tags...'
                    className="w-full outline-none bg-white pl-4 pr-2 text-sm" />

                  <button type='submit'
                    className="bg-[#33B89F] hover:bg-[#269782] duration-300 text-white text-sm rounded-full w-full max-w-[46px] h-11 flex justify-center items-center"><BiSearchAlt size={22} /></button>
                </div>
              </form>

              <div>
                {isAdmin && (
                  <div className="hidden md:block">
                    <Link to='/dashboard'>
                      <img
                        className="rounded-full w-10 h-10 object-cover border-2 border-indigo-50"
                        src={userData?.imgURL || notUser}
                        alt="User"
                      />
                    </Link>
                    <button className="text-sm flex items-center gap-1 mt-3" onClick={logOut}>
                      <IoLogOutOutline size={22} /> Log Out
                    </button>
                  </div>
                )}
                {user ? (!isAdmin &&
                  <div className="hidden md:block">
                    <div onClick={(e) => opDesktop.current && opDesktop.current.toggle(e)} className="inline-block cursor-pointer"><LuUser2 size={30} className="text-gray-800" /></div>
                    <OverlayPanel ref={opDesktop}>
                      <figure className="w-9 h-9">
                        <Link to={`/my-profile`}>
                          <img
                            className="rounded-full w-9 h-9 object-cover border"
                            src={userData?.imgURL || notUser}
                            alt=""
                          />
                        </Link>
                      </figure>
                      <button className="text-sm font-medium flex items-center gap-1 mt-3" onClick={logOut}>
                        <IoLogOutOutline size={22} /> Log Out
                      </button>
                    </OverlayPanel>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="hidden md:block">
                      <NavLink className={({ isActive }) =>
                        isActive
                          ? "py-3.5 px-5 xl:py-3.5 xl:px-8 rounded-full bg-[#269782] duration-300"
                          : "py-3.5 px-5 xl:py-3.5 xl:px-8 rounded-full bg-[#33B89F] hover:bg-[#269782] duration-300"
                      } to="/login"
                      >
                        <button className=" text-white text-base font-medium">Login</button>
                      </NavLink>
                    </div>
                    <div className="hidden md:block">
                      <NavLink className={({ isActive }) =>
                        isActive
                          ? "py-3.5 px-5 xl:py-3.5 xl:px-8 rounded-full bg-[#269782] duration-300"
                          : " py-3.5 px-5 xl:py-3.5 xl:px-8 rounded-full bg-[#33B89F] hover:bg-[#269782] duration-300"
                      } to="/register"
                      >
                        <button className=" text-white text-base font-medium">SingUp</button>
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <form className={`${isScrolled ? "mt-0" : "mt-4"} w-full lg:hidden`} onSubmit={handleSearch}>
          <div className="flex bg-gray-50 rounded-full p-1">
            <input
              type="text"
              name="search"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search with title and tags...'
              className="w-full outline-none bg-gray-50 pl-4 pr-2 text-sm" />

            <button type='submit'
              className="bg-[#33B89F] hover:bg-[#269782] duration-300 text-white text-sm rounded-full w-full max-w-[46px] h-11 flex justify-center items-center"><BiSearchAlt size={22} /></button>
          </div>
        </form>
      </nav>

        <Sidebar visible={visible} onHide={() => setVisible(false)} className="!max-w-[250px]">
          <ul className="grid gap-4">
            <li><NavLink onClick={() => setVisible(false)} className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : 'font-medium flex items-center gap-2'} to='/news-feed'><FaRegNewspaper size={20} /> News Feed</NavLink></li>
            <li><NavLink onClick={() => setVisible(false)} className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : 'font-medium flex items-center gap-2'} to='/ask-question'><TbUserQuestion size={20} /> Ask Question</NavLink></li>
            <li><NavLink onClick={() => setVisible(false)} className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : 'font-medium flex items-center gap-2'} to='/tags'><TbTags size={20} /> Tags</NavLink></li>
            <li><NavLink onClick={() => setVisible(false)} className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : 'font-medium flex items-center gap-2'} to='/users'><FiUsers size={20} /> Users</NavLink></li>
            <li><NavLink onClick={() => setVisible(false)} className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : 'font-medium flex items-center gap-2'} to='/level'><BiBookmarkAlt size={20} /> Level</NavLink></li>
          </ul>
        </Sidebar>
    </>
  );
};

export default NavBar;