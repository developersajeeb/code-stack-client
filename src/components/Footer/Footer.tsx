import logo from '../../assets/logo-codeStack-white.png';
import { AiOutlineArrowRight, AiOutlineHome, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <section className='bg-[#202942] bg-divider'>
            <div className='max-w-[1320px] mx-auto '>
                <footer className='grid md:grid-cols-3'>
                    <div className='px-4 pt-20 pb-14 md:py-32 md:col-span-2 bg-[#202942] grid md:grid-cols-2 gap-10'>
                        <div className='md:border-r md:pr-10 border-gray-700 text-center md:text-start'>
                            <img src={logo} alt="CodeStack" className='w-60 mx-auto md:mx-0' />
                            <p className='text-gray-400 my-6'>CodeStack is a widely recognized platform where developers of all levels gather to ask questions, share knowledge, and find solutions to coding problems</p>
                            <form className='relative'>
                                <input className='bg-[#283353] py-3 px-5 w-full border border-dashed border-gray-600 rounded-md text-white' type="email" name="email" id="email" placeholder='Your Email' />
                                <span className='text-color absolute top-3 right-3 cursor-pointer'><AiOutlineArrowRight size={25} /></span>
                            </form>
                        </div>
                        <div className='grid md:grid-cols-2'>
                            <div>
                                <h3 className='text-white text-2xl font-normal'>Quick LInk</h3>
                                <ul className='text-gray-400 mt-6 grid gap-3'>
                                    <li className='flex items-center hover:text-white duration-300 cursor-pointer'><FaAngleRight /> Home</li>
                                    <Link to="/aboutus"> <li className='flex items-center hover:text-white duration-300 cursor-pointer'><FaAngleRight /> About Us</li></Link>
                                    <li className='flex items-center hover:text-white duration-300 cursor-pointer'><FaAngleRight /> Company History</li>
                                    <li className='flex items-center hover:text-white duration-300 cursor-pointer'><FaAngleRight /> Features</li>
                                    <li className='flex items-center hover:text-white duration-300 cursor-pointer'><FaAngleRight /> Blog Page</li>
                                    <li className='flex items-center hover:text-white duration-300 cursor-pointer'><FaAngleRight /> Login</li>
                                </ul>
                            </div>
                            <div className='mt-10 md:mt-0'>
                                <h3 className='text-white text-2xl font-normal'>Other Link</h3>
                                <ul className='text-gray-400 mt-6 grid gap-3'>
                                    <li className='flex items-center hover:text-white duration-300 cursor-pointer'><FaAngleRight /> Profile</li>
                                    <li className='flex items-center hover:text-white duration-300 cursor-pointer'><FaAngleRight /> Dynamic Feed</li>
                                    <Link to="/trams-and-conditions"><li className='flex items-center hover:text-white duration-300 cursor-pointer'><FaAngleRight /> Trams & Conditions</li></Link>
                                    <Link to="/disclaimer">
                                        <li className='flex items-center hover:text-white duration-300 cursor-pointer'><FaAngleRight /> Disclaimer</li>
                                    </Link>
                                    <Link to="/contact-us">  <li className='flex items-center hover:text-white duration-300 cursor-pointer'><FaAngleRight /> Contact Us</li></Link>
                                    <li className='flex items-center hover:text-white duration-300 cursor-pointer'><FaAngleRight /> Sing Up</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='px-4 md:px-8 md:py-10 lg:pr-32 rounded-xl my-auto lg:pl-12 bg-[#283353]'>
                        <div>
                            <h3 className='text-white text-2xl font-normal'>Contact Info</h3>
                            <ul className='text-gray-400 mt-6 grid gap-5'>
                                <li className='flex items-center hover:text-white duration-300 gap-4'>
                                    <span className='bg-[#3e4868] p-3 rounded-full text-white border border-dashed border-gray-800'><AiOutlineHome size={18} /></span>
                                    Address: <br /> 5919 Trussville Crossings Pkwy, Birmingham
                                </li>
                                <li className='flex items-center hover:text-white duration-300 gap-4'>
                                    <span className='bg-[#3e4868] p-3 rounded-full text-white border border-dashed border-gray-800'><AiOutlineMail size={18} /></span>
                                    Email: <br /> info@codestack.com
                                </li>
                                <li className='flex items-center hover:text-white duration-300 gap-4'>
                                    <span className='bg-[#3e4868] p-3 rounded-full text-white border border-dashed border-gray-800'><AiOutlinePhone size={18} /></span>
                                    Phone: <br /> +12345678900
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
                <section className='px-4 py-8 text-gray-400 md:col-span-2 bg-[#202942] border-t border-gray-700'>
                    <div className='text-center md:text-start text-sm'><p>© Copyright {new Date().getFullYear()}. All Rights Reserved by <span className='text-color duration-200 hover:text-[#02B1FC] cursor-pointer font-medium'>CodeStack</span></p></div>
                </section>
            </div>
        </section>
    );
};

export default Footer;