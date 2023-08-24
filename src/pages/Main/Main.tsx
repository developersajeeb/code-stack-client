import { BiBookmarkAlt } from "react-icons/bi";
import { FaArrowLeft, FaRegNewspaper } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { TbTags, TbUserQuestion } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

const Main = () => {
    return (
        <main className="px-5 py-4 md:py-10 md:px-12 lg:px-32">
            <section>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="mt-6 relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-gray-200 rounded hover:bg-white group drawer-button lg:hidden">
                            <span className="w-48 h-48 rounded rotate-[-40deg] bg-two absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white flex items-center gap-2"><FaArrowLeft /> Side Menu</span>
                        </label>
                        <main className="lg:ml-12 mt-8 lg:mt-0 grid md:grid-cols-4">
                            <section className="md:col-span-3">
                                <Outlet></Outlet>
                            </section>
                            <main className="md:col-span-1 bg-red-300">
                                <p>RightSide</p>
                            </main>
                        </main>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu text-base px-4 py-8 lg:py-0 h-full text-base-content text-center bg-white font-medium">
                            {/* Sidebar content here */}
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/main/news-feed'><FaRegNewspaper /> News Feed</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/main/ask-question'><TbUserQuestion /> Ask Question</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/main/tags'><TbTags /> Tags</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/main/users'><FiUsers /> Users</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/main/badges'><BiBookmarkAlt /> Badges</NavLink></li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Main;