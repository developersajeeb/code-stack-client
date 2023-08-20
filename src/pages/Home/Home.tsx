import headerImage from '../../assets/others/hero-three.jpg'
import { FaUser, FaUsers, FaStar, FaRegLightbulb } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineVideoCameraAdd, AiFillAndroid } from "react-icons/ai";
import search from '../../assets/others/search.png'
import analyze from '../../assets/others/analyze.png'
import apply from '../../assets/others/apply.jpg'
import BlogSlider from '../../components/Home/BlogSlider';
import headerBannerImg from '../../assets/others/header-main-bg.jpg'
import CountUp from '../../components/CountUp/CountUp';
import bg from '../../assets/others/bg-dots.png';
import webPhoto from '../../assets/others/web.png'

const Home = () => {

    return (
        <>
            <main className=''>
                <header>
                    <section className='px-3 py-12 md:px-8 md:py-32 lg:px-32 grid md:grid-cols-2 gap-10 items-center bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${headerBannerImg})` }}>
                        <div>
                            <h1 className="text-4xl text-center md:text-start lg:text-5xl md:text-4xl font-semibold text-gray-800">Best Website For Your Programming Or Code Solution.</h1>
                            <p className="text-gray-500 pt-4 pb-8 text-center md:text-start">CodeStack is a widely recognized platform where developers of all levels gather to ask questions, share knowledge, and find solutions to coding problems. The community-driven nature ensures a vast array of answers and discussions on a wide range of programming languages and technologies.</p>
                            <div className='text-center md:text-start'>
                                <button className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all primary-bg rounded-full hover:bg-white group border-2 border-[#5138EE]">
                                    <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-200 transition-all border-white rounded-full"></span>
                                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-[#5138EE]">Get Start</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <img className='w-full' src={headerImage} alt="" />
                        </div>
                    </section>
                </header>

                <section className='px-3 py-28 md:px-8 lg:px-32 grid md:grid-cols-3 gap-12 bg-[#202942] bg-cover bg-no-repeat' style={{ backgroundImage: `url(${bg})` }}>
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

                <section className='px-3 py-24 md:px-8 md:py-28 lg:px-32 grid md:grid-cols-2 gap-14'>
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

                <section className="grid md:grid-cols-3 gap-10 px-3 pt-10 md:px-8 lg:px-32">
                    <div className='bg-slate-100 rounded-xl'>
                        <div className='flex items-center justify-between bg-orange-500 px-10 py-5 rounded-t-xl'>
                            <h3 className='text-4xl font-bold text-white'>Find</h3>
                            <img src={search} alt="" className='h-20' />
                        </div>
                        <div className='px-4 py-6 space-y-2'>
                            <h4 className='font-medium text-2xl'>How to deploy Next.js App...</h4>
                            <p>Introduction: Netlify is a development tool used by frontend developers to...</p>
                        </div>
                    </div>
                    <div className='bg-slate-100 rounded-xl'>
                        <div className='flex items-center justify-between bg-green-600 px-10 py-5 rounded-t-xl'>
                            <h3 className='text-4xl font-bold text-white'>Analyze</h3>
                            <img src={analyze} alt="" className='h-20' />
                        </div>
                        <div className='px-4 py-6 space-y-2'>
                            <h4 className='font-medium text-2xl'>Analyze all solutions</h4>
                            <p>Thoroughly examine various approaches to understand, evaluate, and select...</p>
                        </div>
                    </div>
                    <div className='bg-slate-100 rounded-xl'>
                        <div className='flex items-center justify-between bg-sky-600 px-10 py-5 rounded-t-xl'>
                            <h3 className='text-4xl font-bold text-white'>Apply</h3>
                            <img src={apply} alt="" className='h-20' />
                        </div>
                        <div className='px-4 py-6 space-y-2'>
                            <h4 className='font-medium text-2xl'>Applying optimal solutions</h4>
                            <p>Implement chosen code or options to address challenges effectively and...</p>
                        </div>
                    </div>
                </section>

                <section className='px-3 py-12 md:px-8 md:py-28 lg:px-32'>
                    <BlogSlider></BlogSlider>
                </section>
            </main>
        </>
    );
};

export default Home;