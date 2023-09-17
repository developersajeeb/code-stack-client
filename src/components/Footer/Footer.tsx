<<<<<<< HEAD
import React from 'react';

const Footer = () => {
    return (
        <div>


<footer className="footer p-10 bg-slate-200 text-base-content">
  <div>
    <span className="footer-title">Services</span> 
    <a className="link link-hover">Branding</a> 
    <a className="link link-hover">Design</a> 
    <a className="link link-hover">Marketing</a> 
    <a className="link link-hover">Advertisement</a>
  </div> 
  <div>
    <span className="footer-title">Company</span> 
    <a className="link link-hover">About us</a> 
    <a className="link link-hover">Contact</a> 
    <a className="link link-hover">Jobs</a> 
    <a className="link link-hover">Press kit</a>
  </div> 
  <div>
    <span className="footer-title">Legal</span> 
    <a className="link link-hover">Terms of use</a> 
    <a className="link link-hover">Privacy policy</a> 
    <a className="link link-hover">Cookie policy</a>
  </div> 
  <div>
    <span className="footer-title">Newsletter</span> 
    <div className="form-control w-80">
      <label className="label">
        <span className="label-text">Enter your email address</span>
      </label> 
      <div className="relative">
        <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-16" /> 
        <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
      </div>
    </div>
  </div>
</footer>











        </div>
=======
import logo from '../../assets/logo-codeStack-white.png';
import { AiOutlineArrowRight, AiOutlineHome, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className='grid md:grid-cols-3'>
                <div className='px-4 pt-20 pb-14 md:pl-8 md:py-32 lg:pl-32 md:col-span-2 bg-[#202942] grid md:grid-cols-2 gap-10'>
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
                <div className='px-4 py-12 md:px-8 md:py-32 lg:pr-32 lg:pl-12 bg-[#283353]'>
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
            <section className='grid md:grid-cols-3 bg-[#283353]'>
                <div className='px-4 py-8 md:px-8 lg:px-32 text-gray-400 md:col-span-2 bg-[#202942] border-t border-gray-700'>
                    <div className='text-center md:text-start text-sm'><p>© Copyright {new Date().getFullYear()}. All Rights Reserved by <span className='text-color duration-200 hover:text-[#02B1FC] cursor-pointer font-medium'>CodeStack</span></p></div>
                </div>
            </section>
        </>
>>>>>>> 76e8e2b8879a6af9ac1aee0726ecfbfd9a9e367e
    );
};

export default Footer;