import Hamburger from 'hamburger-react';
import { useState, useContext } from 'react';
import logo from '../../assets/logo-codeStack.png'
import { BiSearchAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const NavBar = () => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const { user, logOut } = useContext(AuthContext);

    return (
        <nav className='shadow-md px-3 py-3 md:px-8 lg:px-32 border-t-4 border-[#0278AE] flex items-center gap-4 md:gap-10 bg-transparent'>
            <div className='flex items-center gap-4'>
                <span onClick={() => { setOpen(!isOpen) }}><Hamburger size={25}></Hamburger></span>
                <figure>
                    <Link to='/'>
                        <img className='w-96 md:w-56' src={logo} alt="" />
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
                        <div className='flex'>
                            <Link to='/news-feed'>
                                <div className='hidden md:block'>
                                    <button className='small-btn'>News</button>
                                    <button className='small-btn' onClick={logOut}>LogOut</button>
                                </div>
                            </Link>
                        </div>
                        :
                        <div className='flex items-center gap-2'>
                            <div className='hidden md:block'>
                                <Link to='/login'>
                                    <button className='small-btn'>Login</button>
                                </Link>
                            </div>
                            <div className='hidden md:block'>
                                <Link to='register'>
                                    <button className='small-btn'>SingUp</button>
                                </Link>
                            </div>
                        </div>
                }
            </div>
        </nav>
    );
};

export default NavBar;