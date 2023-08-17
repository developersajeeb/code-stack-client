import Hamburger from 'hamburger-react';
import { useContext, useState } from 'react';
import logo from '../../assets/logo-codeStack.png'
import { BiSearchAlt } from "react-icons/bi";
import { AuthContext } from '../Pages/Provider/AuthProvider';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log(error))  
    }
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
                {
                        user ? <>

                            <div className="navbar-end">
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
                                        <div className="w-10 rounded-full">
                                            <img data-toggle="tooltip"
                                                title={user && user.displayName} src={user && user.photoURL} />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-sky-200 text-black rounded-box w-52">
                                        <li><Link to='/login' className='font-bold' onClick={handleLogOut}>Logout</Link></li>
                                    </ul>
                                </div>
                            </div>

                        </> : <div className='navbar-end'>
      <li className='btn btn-accent btn-md text-black '> <NavLink to='/login' title='' className={({ isActive }) => isActive ? "text-blue-600" : ''}>
                                Login
                            </NavLink></li>

                        </div>
                    }
                </div>
                <div className='hidden md:block'>
                <Link to='/register'> <button className='small-btn'>SingUp</button></Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;