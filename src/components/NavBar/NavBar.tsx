import Hamburger from 'hamburger-react';
import { useState } from 'react';
import logo from '../../assets/logo-codeStack.png'
import { BiSearchAlt } from "react-icons/bi";

const NavBar = () => {
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <nav className='shadow-lg px-3 py-3 md:px-32 md:py-3 border-t-4 border-[#0278AE] flex items-center gap-4 md:gap-10'>
            <div className='flex items-center gap-4'>
                <span onClick={() => { setOpen(!isOpen) }}><Hamburger size={25}></Hamburger></span>
                <figure>
                    <img className='w-96 md:w-56' src={logo} alt="" />
                </figure>
            </div>
            <form className='relative w-full'>
                <input type="text" name="search" id="search" className='bg-gray-100 border-0 px-5 py-2 rounded-full w-full' />
                <span className='text-gray-500 absolute right-3 top-2 cursor-pointer'><BiSearchAlt size={25} /></span>
            </form>
            <div className='flex items-center gap-2'>
                <div className='hidden md:block'>
                    <button className='small-btn'>Login</button>
                </div>
                <div className='hidden md:block'>
                    <button className='small-btn'>SingUp</button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;