import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaLocationArrow, FaMailBulk } from "react-icons/fa";
import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className="hero min-h-screen  mt-10 ">
            <div className="hero-content flex-col lg:flex-row rounded gap-20 ">
                
                <div className=' bg-purple-100 '>
                    <h2 className="mt-6 text-3xl ">Contact Information</h2>
                    <p className="mt-6  ">Fill Up the form and Our Team, will get back to you within 24 hours</p>
                    <div className="mt-9 flex gap-3 "><p><FaPhoneAlt size={20} /></p><p >+8801734565--</p></div>
                    <div className="mt-9 flex gap-3 "> <p><FaMailBulk size={20} /></p> <p>infocodestack@gmail.com</p></div>
                    <div className="mt-9 flex gap-3 "><p><FaLocationArrow size={20} /></p> <p>102 street 1290</p></div>

                    <div className="flex gap-7 mt-10 ">
                        <p className="mt-10"><FaFacebook size={20} /></p>
                        <p className="mt-10"><FaTwitter size={20} /></p>
                        <p className="mt-10"><FaInstagram size={20} /></p>
                        <p className="mt-10"><FaLinkedin size={20} /></p>

                        <div className="circle primary-bg  w-52 h-52 ms-auto "></div>
                        <div className=" box  absolute w-28 h-28 second-bg mb-80 btn-circle ms-52 opacity-60 "></div>
                    </div>
                </div>
                <div className='space-y-5  '>
                    <div className="grid grid-cols-2">
                        <div>
                            <label htmlFor="username" className="block mb-2 font-medium text-gray-900">FullName<span className="text-red-500"> *</span></label>
                            <input type="text" name="username" id="username" className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" placeholder="your username" required></input>
                            <p className="text-sm ml-0.5"></p>
                        </div>
                        <div>
                            <label htmlFor="Website URL" className="block mb-2 font-medium text-gray-900">Website URL</label>
                            <input type="text" name="name" id="name" className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" placeholder="Website URL"></input>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium text-gray-900">Your Email<span className="text-red-500"> *</span></label>
                        <input type="email" name="email" id="email" className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" placeholder="name@mail.com" required></input>
                    </div>

                    <div>
                        <label htmlFor="Phone Number" className="block mb-2 font-medium text-gray-900">Phone Number<span className="text-red-500"> *</span></label>
                        <input type="Phone Number" name="Phone Number" id="Phone Number" className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" placeholder="+88017...." required></input>
                    </div>
                    <div>
                        <label htmlFor="Message" className="block mb-2 font-medium text-gray-900">Message<span className="text-red-500"> *</span></label>
                        <input type="Message" name="Messager" id="Message" className="border h-32 border-gray-300 text-gray-900  rounded-md block w-full p-3" placeholder="" ></input>
                    </div>

                    <div className="flex items-start mb-6 text-center">
                        <div className="flex items-center h-5">
                            <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                    </div>

                    <button type="submit" className="bg-button w-full flex justify-center" >

                        Send Massege

                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;