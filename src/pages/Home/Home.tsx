import headerImage from '../../assets/others/hero-three.jpg'
import { FaUser, FaUsers, FaStar, FaRegLightbulb, FaCheckCircle, FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineVideoCameraAdd, AiFillAndroid, AiOutlineComment } from "react-icons/ai";
import headerBannerImg from '../../assets/others/header-main-bg.jpg'
import CountUp from '../../components/CountUp/CountUp';
import bg from '../../assets/others/bg-dots.png';
import webPhoto from '../../assets/others/web.png';
import aboutUs from '../../assets/others/about-two.png'
import UiSlider from '../../components/UiSlider/UiSlider';
import logo1 from '../../assets/sponsor/phero.png'
import logo2 from '../../assets/sponsor/ollyo.png'
import logo3 from '../../assets/sponsor/codersBucket.png'
import logo4 from '../../assets/sponsor/DS-logo.png'
import logo5 from '../../assets/sponsor/BS-Logo-Blue_Hr.svg'

const Home = () => {

    return (
        <>
            <main>
                <header>
                    <section className='px-4 py-12 md:px-8 md:py-32 lg:px-32 grid md:grid-cols-2 gap-10 items-center bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${headerBannerImg})` }}>
                        <div>
                            <h1 className="text-4xl text-center md:text-start lg:text-5xl md:text-4xl font-semibold text-gray-800">Best Website For Your Programming Or Code Solution.</h1>
                            <p className="text-gray-500 pt-4 pb-8 text-center md:text-start">CodeStack is a widely recognized platform where developers of all levels gather to ask questions, share knowledge, and find solutions to coding problems. The community-driven nature ensures a vast array of answers and discussions on a wide range of programming languages and technologies.</p>
                            <div className='flex flex-wrap gap-6 justify-center md:justify-start'>
                                <button className='bg-button'>Get Start <FaArrowRight size={15} /></button>
                                <button className='transparent-button'>Take A Tour <FaArrowRight size={15} /></button>
                            </div>
                        </div>
                        <div>
                            <img className='w-full' src={headerImage} alt="" />
                        </div>
                    </section>
                </header>

                <section className='px-4 py-28 md:px-8 lg:px-32 grid md:grid-cols-3 gap-12 bg-[#202942] bg-cover bg-no-repeat' style={{ backgroundImage: `url(${bg})` }}>
                    <div className='text-center'>
                        <span className='text-color'><FaUser size={45} className='mx-auto' /></span>
                        <h3 className='text-white text-6xl font-bold mb-2 mt-4'><CountUp from={0} to={1789} duration={3500} />+</h3>
                        <span className='text-white text-xl font-normal'>Total Users</span>
                    </div>
                    <div className='text-center'>
                        <span className='text-color'><FaStar size={45} className='mx-auto' /></span>
                        <h3 className='text-white text-6xl font-bold mb-2 mt-4'><CountUp from={0} to={1454} duration={3500} />+</h3>
                        <span className='text-white text-xl font-normal'>Positive Reviews</span>
                    </div>
                    <div className='text-center'>
                        <span className='text-color'><FaUsers size={45} className='mx-auto' /></span>
                        <h3 className='text-white text-6xl font-bold mb-2 mt-4'><CountUp from={0} to={1200} duration={6500} />+</h3>
                        <span className='text-white text-xl font-normal'>Daily Active Users</span>
                    </div>
                </section>

                <section className='px-4 py-24 md:px-8 md:py-32 lg:px-32 grid md:grid-cols-2 gap-14'>
                    <figure>
                        <img src={webPhoto} alt="" />
                    </figure>
                    <div>
                        <span className='bg-indigo-50 px-5 py-2 text-color rounded-md font-medium'>Key Features</span>
                        <h2 className='text-4xl font-semibold text-gray-800 mt-6 mb-10'>Enhancing Experiences with Our Key Features</h2>
                        <ul className='grid gap-10'>
                            <li className='flex gap-4'>
                                <div>
                                    <span className='bg-indigo-50 p-5 rounded-full flex'><FaRegLightbulb size={35} /></span>
                                </div>
                                <div>
                                    <h3 className='text-xl font-semibold text-color'>Posting Questions and Answers</h3>
                                    <p className='font-light mt-2 text-gray-600'>Our app supports all major credit cards and cryptocurrency wallets, allowing you to control all kinds of finances.</p>
                                </div>
                            </li>
                            <li className='flex gap-4'>
                                <div>
                                    <span className='bg-indigo-50 p-5 rounded-full flex'><BiSearchAlt size={35} /></span>
                                </div>
                                <div>
                                    <h3 className='text-xl font-semibold text-color'>Discover with Search Functionality</h3>
                                    <p className='font-light mt-2 text-gray-600'>Our app supports all major credit cards and cryptocurrency wallets, allowing you to control all kinds of finances.</p>
                                </div>
                            </li>
                            <li className='flex gap-4'>
                                <div>
                                    <span className='bg-indigo-50 p-5 rounded-full flex'><AiOutlineVideoCameraAdd size={35} /></span>
                                </div>
                                <div>
                                    <h3 className='text-xl font-semibold text-color'>Engaging Video Tutorials for Solutions</h3>
                                    <p className='font-light mt-2 text-gray-600'>Our app supports all major credit cards and cryptocurrency wallets, allowing you to control all kinds of finances.</p>
                                </div>
                            </li>
                        </ul>
                        <div>
                            <button className='flex items-center gap-4 bg-green-100 px-4 py-2 rounded-full hover:bg-green-100 mt-12 mx-auto md:mx-0'>
                                <span className='text-green-500'><AiFillAndroid size={30} /></span>
                                <div className='text-center'>
                                    <span className='text-sm font-medium block'>Available our</span>
                                    <span className='font-semibold'>ANDROID APP</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </section>

                <section className='px-4 md:px-8 lg:px-32 grid md:grid-cols-2 gap-14'>
                    <div>
                        <span className='bg-indigo-50 px-5 py-2 text-color rounded-md font-medium'>About Us</span>
                        <h2 className='text-4xl font-semibold text-gray-800 my-6 leading-snug'>Architects of Tomorrow's Tech CodeStack's Odyssey Unveiled</h2>
                        <p className='leading-7 text-gray-500'>CodeStack is a widely recognized platform where developers of all levels gather to ask questions, share knowledge, and find solutions to coding problems. The community-driven nature ensures a vast array of answers and discussions on a wide range of programming languages and technologies.</p>
                        <div className='md:flex items-center gap-6 mt-6'>
                            <p className='flex items-center gap-2 text-xl font-semibold text-gray-700'><span className='text-orange-400'><FaCheckCircle size={23} /></span> Tags and Categories</p>
                            <p className='flex items-center gap-2 text-xl font-semibold text-gray-700'><span className='text-color'><FaCheckCircle size={23} /></span> Leader-board & Badges</p>
                        </div>
                        <button className='transparent-button mt-10'>Get Start<FaArrowRight size={15} /></button>
                    </div>
                    <figure>
                        <img className='w-full' src={aboutUs} alt="" />
                    </figure>
                </section>

                <section className='px-4 py-24 md:px-8 md:py-32 lg:px-32'>
                    <div className='text-center'>
                        <span className='bg-indigo-50 px-5 py-2 text-color rounded-md font-medium'>Web Introduction</span>
                        <h2 className='text-4xl font-semibold text-gray-800 leading-snug mb-2 mt-4'>Watch A Details Tutorial</h2>
                        <p className='leading-7 text-gray-500'>Embark on a Comprehensive Video Tutorial to Discover the Intricacies of Our Portal</p>
                    </div>
                    <div>
                        <img className='w-full h-[600px] mt-16 object-cover' src="https://t4.ftcdn.net/jpg/03/32/54/93/360_F_332549362_Y2Nkokepqc6AbUfVvyAhrL1CjA9QpZND.jpg" alt="" />
                    </div>
                </section>

                <section>
                    <div className='text-center px-4'>
                        <span className='bg-indigo-50 px-5 py-2 text-color rounded-md font-medium'>Application Screenshot</span>
                        <h2 className='text-4xl font-semibold text-gray-800 leading-snug mb-2 mt-4'>Let’s See Our Software UI Design Screenshot</h2>
                        <p className='leading-7 text-gray-500'>Embark on a Comprehensive Video Tutorial to Discover the Intricacies of Our Portal</p>
                    </div>
                    <div className='mt-16'>
                        <UiSlider></UiSlider>
                    </div>
                </section>

                <section className='px-4 py-20 md:px-8 md:py-28 lg:px-32 my-12 md:my-28 bg-gray-50 grid md:grid-cols-3 gap-6'>
                    <div>
                        <div>
                            <span className='bg-indigo-50 px-5 py-2 text-color rounded-md font-medium'>Latest News & Blog</span>
                            <h2 className='text-4xl font-semibold text-gray-800 leading-snug my-6'>Get Our Every Single Update Latest News and Blog</h2>
                        </div>
                        <button className='transparent-button'>View More News <FaArrowRight size={15} /></button>
                    </div>
                    <div className='bg-white p-8 grid gap-4 rounded-lg border-dashed border-2'>
                        <div className='flex items-center gap-6'>
                            <p className='flex items-center gap-2'><FaRegCalendarAlt/> 25 March 2022</p>
                            <p className='flex items-center gap-2'><AiOutlineComment/> Com (5)</p>
                        </div>
                        <h2 className='text-[28px] font-medium leading-snug'>Smashin Podcast Episode Web Frameworks Solve Vanilla</h2>
                        <p className='leading-7'>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized the charms of pleasure</p>
                        <span className='flex items-center gap-2 text-color cursor-pointer'>Read More <FaArrowRight size={15} /></span>
                    </div>
                    <div className='bg-white p-8 grid gap-4 rounded-lg border-dashed border-2'>
                        <div className='flex items-center gap-6'>
                            <p className='flex items-center gap-2'><FaRegCalendarAlt/> 25 March 2022</p>
                            <p className='flex items-center gap-2'><AiOutlineComment/> Com (5)</p>
                        </div>
                        <h2 className='text-[28px] font-medium leading-snug'>Smashin Podcast Episode Web Frameworks Solve Vanilla</h2>
                        <p className='leading-7'>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized the charms of pleasure</p>
                        <span className='flex items-center gap-2 text-color cursor-pointer'>Read More <FaArrowRight size={15} /></span>
                    </div>
                </section>

                <section className='px-4 pb-20 md:px-8 md:pb-28 lg:px-32 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-12'>
                    <img className='w-full' src={logo1} alt="" />
                    <img className='w-full' src={logo2} alt="" />
                    <img className='w-full' src={logo3} alt="" />
                    <img className='w-full' src={logo4} alt="" />
                    <img className='w-full' src={logo5} alt="" />
                </section>
            </main>
        </>
    );
};

export default Home;