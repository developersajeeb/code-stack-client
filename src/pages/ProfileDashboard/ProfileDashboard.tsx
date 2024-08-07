import { useQuery } from "@tanstack/react-query";
import { AiFillTwitterCircle, AiOutlineArrowDown } from "react-icons/ai";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { TbWorldLongitude } from "react-icons/tb";
import { AuthContext } from "../../Provider/AuthProvider";
import {useContext} from 'react'

const ProfileDashboard = () => {
    const authContext = useContext(AuthContext)
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
            <section>
                <h3 className='bg-indigo-50 px-5 py-2 text-gray-600 rounded-md font-medium text-lg inline-block'>About</h3>
                <p className="mt-4 text-sm text-gray-800 font-medium">{userData?.aboutMe || 'N/A'}</p>
            </section>
            <div className="divider text-color-second"><AiOutlineArrowDown size={40} /></div>
            <section className="my-6">
                <h3 className='bg-indigo-50 px-5 py-2 text-gray-600 rounded-md font-medium text-lg inline-block'>Personal Information</h3>
                <div className="flex flex-wrap gap-14 mt-6">
                    <div>
                        <span className="text-gray-400 text-sm font-normal">Email</span>
                        <p className="text-sm text-gray-800 font-medium">{userData?.email}</p>
                    </div>
                    <div>
                        <span className="text-gray-400 text-sm font-normal">Your Age</span>
                        <p className="text-sm text-gray-800 font-medium">{userData?.age || 'N/A'}</p>
                    </div>
                    <div>
                        <span className="text-gray-400 text-sm font-normal">Gender</span>
                        <p className="text-sm text-gray-800 font-medium">{userData?.gender || 'N/A'}</p>
                    </div>
                    <div>
                        <span className="text-gray-400 text-sm font-normal">Country</span>
                        <p className="text-sm text-gray-800 font-medium">{userData?.country || 'N/A'}</p>
                    </div>
                    <div>
                        <span className="text-gray-400 text-sm font-normal">City</span>
                        <p className="text-sm text-gray-800 font-medium">{userData?.city || 'N/A'}</p>
                    </div>
                </div>
            </section>
            <div className="divider text-color-second"><AiOutlineArrowDown size={40} /></div>
            <section className="mb-6">
                <h3 className='bg-indigo-50 px-5 py-2 text-gray-600 rounded-md font-medium text-lg inline-block'>Skills</h3>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                    { userData?.selected ?
                        userData?.selected?.map((skill: any) => <p className="border-2 text-gray-500 inline-block py-1 px-3 rounded-full text-sm">{skill}</p>)
                        :
                        <p className="text-sm text-gray-800 font-medium">N/A</p>
                    }
                </div>
            </section>
            <div className="divider text-color-second mb-6"><AiOutlineArrowDown size={40} /></div>
            <section>
                <h3 className='bg-indigo-50 px-5 py-2 text-gray-600 rounded-md font-medium text-lg inline-block'>Social Account</h3>
                <ul className="flex flex-wrap items-center gap-6 mt-4 font-medium">
                    <li><a className="text-gray-600 hover:text-[#33B89F] duration-300 flex items-center gap-1" href={userData?.facebookURL}><BsFacebook size={25} /> Facebook</a></li>
                    <li><a className="text-gray-600 hover:text-[#33B89F] duration-300 flex items-center gap-1" href={userData?.githubURL}><BsGithub size={25} /> Github</a></li>
                    <li><a className="text-gray-600 hover:text-[#33B89F] duration-300 flex items-center gap-1" href={userData?.twitterURL}><AiFillTwitterCircle size={30} /> Twitter</a></li>
                    <li><a className="text-gray-600 hover:text-[#33B89F] duration-300 flex items-center gap-1" href={userData?.portfolioURL}><TbWorldLongitude size={28} /> Portfolio</a></li>
                </ul>
            </section>
        </main>
    );
};

export default ProfileDashboard;