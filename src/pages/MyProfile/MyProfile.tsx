import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";

import { FaArrowLeft, FaRegNewspaper } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { RiProfileLine } from "react-icons/ri";
import { TbBrandGoogleAnalytics, TbDeviceIpadHorizontalQuestion, TbUserEdit } from "react-icons/tb";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BiBookmarkAlt } from "react-icons/bi";
import { LuTags } from "react-icons/lu";

const MyProfile = () => {
    const {user} = useContext(AuthContext);

    return (
        <main className="px-5 py-4 md:py-20 md:px-32">
            <section className="">
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="mt-6 relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-gray-200 rounded hover:bg-white group drawer-button lg:hidden">
                            <span className="w-48 h-48 rounded rotate-[-40deg] bg-two absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white flex items-center gap-2"><FaArrowLeft /> Side Menu</span>
                        </label>
                        <main className="lg:ml-12 mt-8 lg:mt-0">
                            <Outlet></Outlet>
                        </main>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu px-4 py-8 lg:py-0 h-full text-base-content text-center bg-white">
                            {/* Sidebar content here */}
                            <figure className="flex items-center gap-2 mb-10">
                                <img className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-indigo-100" src={user?.photoURL} alt="" />
                                <div>
                                    <h4 className="font-medium text-3xl text-start">{user?.displayName}</h4>
                                    <p className="text-gray-500 text-start">{user?.email}</p>
                                </div>
                            </figure>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to={`/my-profile/user-dashboard/${user?.email}`}><RiProfileLine size={18} /> User Dashboard</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to='/my-profile/summery'><TbBrandGoogleAnalytics size={18} /> Summery</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to='/my-profile/'><IoChatbubblesOutline size={18} /> Answers</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to='/my-profile/'><TbDeviceIpadHorizontalQuestion size={18} /> Questions</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to='/my-profile/'><LuTags size={18} /> Tags</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to='/my-profile/'><BiBookmarkAlt size={18} /> Saves</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to={`/my-profile/edit-profile/${user?.email}`}><TbUserEdit size={18} /> Edit Profile</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to='/main/news-feed'><FaRegNewspaper size={18} /> News Feed</NavLink></li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default MyProfile;