import Hamburger from 'hamburger-react';
import { useState, useContext } from 'react';
import logo from '../../assets/logo-codeStack.png'

import { BiSearchAlt, BiHomeAlt, BiBookmarkAlt, BiLogInCircle } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";
import { TbUserQuestion, TbTags } from "react-icons/tb";
import { BsPersonAdd } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const NavBar = () => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const authContext   = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user, logOut } = authContext;

    return (
        <nav className='shadow-md px-2 py-3 md:px-8 lg:px-32 border-t-4 border-[#5138EE] flex items-center gap-4 md:gap-10 bg-transparent bg-white'>
            <div className='flex items-center gap-4'>
                <span onClick={() => { setOpen(!isOpen) }}><Hamburger size={25}></Hamburger></span>
                <ul className={`drop-shadow-xl grid font-medium text-gray-600 bg-white px-8 py-6 rounded-md absolute w-60 duration-300 border-2 border-dashed ${isOpen ? 'left-4 lg:left-32 top-20' : 'top-20 -left-60'}`}>
                    <NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 mb-5' : ' text-gray-500 flex items-center gap-2 mb-5'} to='/'><BiHomeAlt /> Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 mb-5' : ' text-gray-500 flex items-center gap-2 mb-5'} to='/main/news-feed'><FaRegNewspaper /> News Feed</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 mb-5' : ' text-gray-500 flex items-center gap-2 mb-5'} to='/main/ask-question'><TbUserQuestion /> Ask Question</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 mb-5' : ' text-gray-500 flex items-center gap-2 mb-5'} to='/main/tags'><TbTags /> Tags</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 mb-5' : ' text-gray-500 flex items-center gap-2 mb-5'} to='/main/users'><FiUsers /> Users</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 mb-5' : ' text-gray-500 flex items-center gap-2 mb-5'} to='/main/badges'><BiBookmarkAlt /> Badges</NavLink>
                    {
                        user ?
                            <>
                                <figure className='w-10 h-10 mb-5'>
                                    <Link to={`/my-profile/user-dashboard/${user?.email}`}>
                                        <img className='rounded-full' src={user?.photoURL} alt="" />
                                    </Link>
                                </figure>
                                <button className='small-btn transparent-button-small w-12' onClick={logOut}><BiLogInCircle /></button>
                            </>
                            :
                            <>
                                <NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2 mb-5' : ' text-gray-500 flex items-center gap-2 mb-5'} to='/login'><BiLogInCircle /> Login</NavLink>
                                <NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/register'><BsPersonAdd /> Register</NavLink>
                            </>
                    }
                </ul>
                <figure>
                    <Link to='/'>
                        <img className='w-96 md:w-60' src={logo} alt="" />
                    </Link>
                </figure>
            </div>
            <form className='relative w-full'>
                <input type="text" name="search" id="search" className='bg-gray-100 border-0 px-5 py-2 rounded-full w-full' />
                <span className='text-gray-500 absolute right-3 top-2 cursor-pointer'><BiSearchAlt size={25} /></span>
            </form>
            <div>
                {
                    user ?
                        <div className='hidden md:block'>
                            <div className='flex items-center gap-3 border-2 p-2 bg-white shadow-sm rounded-full'>
                                <figure className='w-9 h-9'>
                                    <Link to={`/my-profile/user-dashboard/${user?.email}`}>
                                        <img className='rounded-full' src={user?.photoURL} alt="" />
                                    </Link>
                                </figure>
                                <button className='transparent-button-small' onClick={logOut}><BiLogInCircle /></button>
                            </div>
                        </div>
                        :
                        <div className='flex items-center gap-2'>
                            <div className='hidden md:block'>
                                <Link to='/login'>
                                    <button className='bg-button-small'>Login <BiLogInCircle /></button>
                                </Link>
                            </div>
                            <div className='hidden md:block'>
                                <Link to='register'>
                                    <button className='bg-button-small'>SingUp <BsPersonAdd /></button>
                                </Link>
                            </div>
                        </div>
                }
            </div>
        </nav>
    );
};

export default NavBar;