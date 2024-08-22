import { useQuery } from "@tanstack/react-query";
import notUser from "../../assets/icons/user-not.png";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../../Provider/AuthProvider";

const Users = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;

    const { data: members = [] } = useQuery([], async () => {
        const res = await fetch(`http://localhost:5000/users`);
        const data = await res.json();
        return data;
    });
    
    if (!Array.isArray(members)) {
        return <p>Loading...</p>;
    }

    return (
        <main>
            <div>
                <span className='bg-indigo-50 px-5 py-2 text-color-second rounded-md font-medium'>Users</span>
                <h2 className='text-3xl font-semibold text-gray-700 leading-snug mb-2 mt-4'>Here are all users</h2>
            </div>
            <form className="relative mt-8 w-64">
                <input type="text" placeholder="Filter by users" name="search" id="search" className="bg-gray-100 border-0 px-5 py-2 rounded-md w-full" />
                <span className="text-gray-500 absolute right-3 top-2 cursor-pointer">
                    <BiSearchAlt size={25} />
                </span>
            </form>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
                {
                    members?.map((member: any) => <div key={member?._id} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl shadow-sm relative">
                        <span className="text-[10px] bg-gray-400 p-1 text-white rounded-full absolute -right-2 -top-2">Entry</span>
                        <figure>
                            <img className="w-14 h-14 object-cover rounded-full" src={member?.imgURL || notUser} alt="user image" />
                        </figure>
                        <div>
                            <Link to={user?.email === member?.email && `/my-profile` || `/user/${member?.username}`}>
                                <h3 className="font-medium text-base hover:text-[#33B89F] cursor-pointer text-gray-600 duration-300">{member?.name}</h3>
                                <p className="text-sm font-light text-gray-500 -mt-[2px]">{member?.username}</p>
                            </Link>
                            <p className="text-sm text-gray-400">{member?.country}</p>
                        </div>
                    </div>)
                }
            </section>
        </main>
    );
};

export default Users;