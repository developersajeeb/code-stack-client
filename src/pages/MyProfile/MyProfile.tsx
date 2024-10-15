import { NavLink, Outlet } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { FaRegNewspaper } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { TbDeviceIpadHorizontalQuestion, TbUserEdit, TbUserQuestion } from "react-icons/tb";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BiBookmarkAlt } from "react-icons/bi";
import notUser from '../../assets/icons/user-not.png';
import { useQuery } from "@tanstack/react-query";
import { LuLayoutDashboard } from "react-icons/lu";
import bgImage from '../../assets/others/user-profile-bg.jpg';

const MyProfile = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;

    const { data: userData = [] } = useQuery([user?.email], async () => {
        const res = await fetch(`http://localhost:5000/user?email=${user?.email}`);
        const data = await res.json();
        return data;
    });

    return (
        <main>
            <div className="bg-no-repeat bg-cover bg-center h-40 lg:h-64 px-4 py-4" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="max-w-[1320px] mx-auto h-full flex items-end">
                    <figure className="flex items-center gap-5 text-white">
                        <img className="w-24 md:w-32 max-w-[128px] h-24 md:h-32 max-h-[128px] rounded-full object-cover border-4 border-indigo-100 bg-white" src={userData?.imgURL || notUser} alt="" />
                        <figcaption>
                            <h4 className="font-medium text-xl md:text-2xl mt-2">{userData?.name}</h4>
                            <p className="text-gray-400 text-sm word-break">@{userData?.username}</p>
                        </figcaption>
                    </figure>
                </div>
            </div>
            <section className="px-4 py-8 lg:py-20 max-w-[1320px] mx-auto">
                <div className="flex">
                    <div className="min-w-[250px] hidden lg:block mr-8">
                        <ul className="grid gap-4 px-4 py-8 lg:py-0 text-base-content text-center bg-white">
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to={`/my-profile`} end><LuLayoutDashboard size={18} /> User Dashboard</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to='/my-profile/answers'><IoChatbubblesOutline size={18} /> Answers</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to='/my-profile/questions'><TbDeviceIpadHorizontalQuestion size={18} /> Questions</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to='/my-profile/saves'><BiBookmarkAlt size={18} /> Saves</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to={`/my-profile/edit-profile`}><TbUserEdit size={18} /> Edit Profile</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to='/news-feed'><FaRegNewspaper size={18} /> News Feed</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 font-medium' : 'text-gray-500 flex items-center gap-2 font-medium'} to='/ask-question'><TbUserQuestion size={18} /> Ask Question</NavLink></li>
                        </ul>
                    </div>
                    <div className="w-full">
                        <Outlet></Outlet>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default MyProfile;