import { BiBookmarkAlt } from "react-icons/bi";
import { FaArrowLeft, FaRegNewspaper } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
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
                        <main className="lg:ml-12 mt-8 lg:mt-0 grid md:grid-cols-4 gap-10">
                            <section className="md:col-span-3">
                                <Outlet></Outlet>
                            </section>
                            <main className="md:col-span-1">
                                <section>
                                    <div className="relative">
                                        <h2 className="text-8xl font-medium text-gray-100">top</h2>
                                        <h3 className="font-medium text-2xl text-gray-500 absolute bottom-0 left-0">Tags</h3>
                                    </div>
                                    <ul className="mt-6 grid gap-6">
                                        <li className="flex items-center justify-between"><span className="bg-indigo-50 px-3 text-sm py-1 text-color rounded-md font-medium cursor-pointer">javascript</span> <span className="font-medium text-gray-600">572653</span></li>
                                        <li className="flex items-center justify-between"><span className="bg-indigo-50 px-3 text-sm py-1 text-color rounded-md font-medium cursor-pointer">html</span> <span className="font-medium text-gray-600">572653</span></li>
                                        <li className="flex items-center justify-between"><span className="bg-indigo-50 px-3 text-sm py-1 text-color rounded-md font-medium cursor-pointer">css</span> <span className="font-medium text-gray-600">572653</span></li>
                                        <li className="flex items-center justify-between"><span className="bg-indigo-50 px-3 text-sm py-1 text-color rounded-md font-medium cursor-pointer">react.js</span> <span className="font-medium text-gray-600">572653</span></li>
                                        <li className="flex items-center justify-between"><span className="bg-indigo-50 px-3 text-sm py-1 text-color rounded-md font-medium cursor-pointer">next.js</span> <span className="font-medium text-gray-600">572653</span></li>
                                    </ul>
                                    <p className="text-color text-sm text-center mt-7 underline cursor-pointer font-medium hover:text-gray-600 duration-300">More related tags</p>
                                </section>

                                <section className="mt-4">
                                    <div className="relative">
                                        <h2 className="text-8xl font-medium text-gray-100">hot</h2>
                                        <h3 className="font-medium text-2xl text-gray-500 absolute bottom-0 left-0">Questions</h3>
                                    </div>
                                    <ul className="mt-6 grid gap-4">
                                        <li className="flex items-center justify-between gap-4 hover:text-[#5138EE] cursor-pointer duration-200 hover:underline">Insert Json Array Request to Database <span><MdKeyboardArrowRight size={25}/></span></li>
                                        <li className="flex items-center justify-between gap-4 hover:text-[#5138EE] cursor-pointer duration-200 hover:underline">How do i add an event listener that closes the dropdown?" <span><MdKeyboardArrowRight size={25}/></span></li>
                                        <li className="flex items-center justify-between gap-4 hover:text-[#5138EE] cursor-pointer duration-200 hover:underline">Error message \"error:0308010C:digital envelope routines::unsupported\ <span><MdKeyboardArrowRight size={25}/></span></li>
                                        <li className="flex items-center justify-between gap-4 hover:text-[#5138EE] cursor-pointer duration-200 hover:underline">How do I conditionally add attributes to React components? <span><MdKeyboardArrowRight size={25}/></span></li>
                                        <li className="flex items-center justify-between gap-4 hover:text-[#5138EE] cursor-pointer duration-200 hover:underline">React-router URLs don't work when refreshing or writing manually <span><MdKeyboardArrowRight size={25}/></span></li>
                                    </ul>
                                </section>
                            </main>
                        </main>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu text-base px-4 py-8 lg:py-0 h-full text-base-content text-center bg-white font-medium">
                            {/* Sidebar content here */}
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/news-feed'><FaRegNewspaper /> News Feed</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/ask-question'><TbUserQuestion /> Ask Question</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/tags'><TbTags /> Tags</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/users'><FiUsers /> Users</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/badges'><BiBookmarkAlt /> Badges</NavLink></li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Main;