import notUser from "../../assets/icons/user-not.png";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Provider/AuthProvider";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";

const Users = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [members, setMembers] = useState<any[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;

    const fetchMembers = async () => {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/users?skip=${skip}&limit=18`);
        const { users, total } = await res.json();
        setLoading(false);
    
        if (users.length > 0) {
            setMembers((prev) => {
                const newMembers = users.filter((newMember: any) => 
                    !prev.some((existingMember: any) => existingMember._id === newMember._id)
                );
                return [...prev, ...newMembers];
            });
            setSkip(skip + 18);
        }

        if (members.length + users.length >= total) {
            setHasMore(false);
        }
    };        

    useEffect(() => {
        fetchMembers();
    }, []);

    const filteredMembers = members.filter((member: any) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="px-0 lg:pl-6">
            <div>
                <span className='bg-indigo-50 px-5 py-2 text-color-second rounded-md font-medium'>Users</span>
                <h2 className='text-3xl font-semibold text-gray-700 leading-snug my-4'>Here are all users</h2>
            </div>
            <form className="relative max-w-sm" onSubmit={(e) => e.preventDefault()}>
                <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search users with name or username..." name="search" id="search" className="bg-gray-100 pl-5 pr-11 py-2 rounded-md w-full outline-none border focus:border-[#33B89F]" />
                <span className="text-gray-500 absolute right-3 top-2 cursor-pointer">
                    <BiSearchAlt size={25} />
                </span>
            </form>
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10 mt-8">
                {loading && !filteredMembers.length ? (
                    <>
                        <Skeleton height="5rem" width="100%"></Skeleton>
                        <Skeleton height="5rem" width="100%"></Skeleton>
                        <Skeleton height="5rem" width="100%"></Skeleton>
                    </>
                ) : (
                    filteredMembers.map((member: any) => (
                        <div key={member?._id} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl shadow-sm relative border-4 border-gray-50">
                            <span className="text-[10px] bg-gray-400 p-1 text-white rounded-full absolute -right-2 -top-2">Entry</span>
                            <figure>
                                <img className="w-14 h-14 object-cover rounded-full" src={member?.imgURL || notUser} alt="user image" />
                            </figure>
                            <div>
                                <Link to={user?.email === member?.email ? `/my-profile` : `/user/${member?.username}`}>
                                    <h3 className="font-medium text-base hover:text-[#33B89F] cursor-pointer text-gray-600 duration-300">{member?.name}</h3>
                                    <p className="text-sm font-light text-gray-500 -mt-[2px]">{member?.username}</p>
                                </Link>
                                <p className="text-sm text-gray-400">{member?.country}</p>
                            </div>
                        </div>
                    ))
                )}
            </section>
            {!hasMore && !loading && searchTerm === '' && (
                <p className="text-gray-500 font-medium text-lg mt-10 text-center">No more users here.</p>
            )}
            {hasMore && !loading && (
                <div className="text-center mt-10">
                    <Button
                        label="Load More"
                        disabled={loading}
                        loading={loading}
                        className='max-w-[250px] cs-button'
                        onClick={fetchMembers}
                    />
                </div>
            )}
        </main>
    );
};

export default Users;