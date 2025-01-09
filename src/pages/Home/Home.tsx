import { FaUser, FaUsers, FaStar, FaRegLightbulb, FaArrowRight, FaRegCalendarAlt, FaCheck, FaPlay } from "react-icons/fa";
import { BiLike, BiSearchAlt } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import headerBannerImg from '../../assets/others/leanding-hero-bg.webp'
import CountUp from '../../components/CountUp/CountUp';
import bg from '../../assets/others/bg-dots.png';
import logo1 from '../../assets/logos/1.png'
import logo2 from '../../assets/logos/2.png'
import logo3 from '../../assets/logos/3.png'
import logo4 from '../../assets/logos/4.png'
import logo5 from '../../assets/logos/5.png'
import logo6 from '../../assets/logos/6.png'
import logo7 from '../../assets/logos/7.png'
import logo8 from '../../assets/logos/8.png'
import { Link } from 'react-router-dom';
import heroImg from '../../assets/uiImages/hero-img.png';
import { TbUsersGroup } from "react-icons/tb";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useEffect } from "react";
import regSectionImg from '../../assets/uiImages/reg-section-img.png';
import newsFeedImg from '../../assets/uiImages/newsfeed.png';
import videoThumb from '../../assets/uiImages/video-thum.png';
import teamMember1 from '../../assets/sajeeb-debnath.jpg';
import teamMember2 from '../../assets/member-5.jpg';
import teamMember3 from '../../assets/member-3.jpg';
import teamMember4 from '../../assets/member-2.png';
import teamMember5 from '../../assets/member-4.jpg';
import overviewBg from '../../assets/uiImages/overview-bg.svg';
import { BsLinkedin } from "react-icons/bs";
import { TfiWorld } from "react-icons/tfi";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <main>
                <header>
                    <section className='bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${headerBannerImg})` }}>
                        <div className='px-4 pb-20 md:pb-48 lg:pb-[270px] pt-52 lg:pt-48 max-w-[1320px] mx-auto text-center'>
                            <h1 className="text-[30px] leading-[44px] md:text-4xl lg:text-5xl md:leading-snug lg:leading-snug font-bold text-gray-800 max-w-[640px] lg:max-w-[840px] mx-auto">The Best Platform for <span className='text-color'>Programming</span> and Code Solutions</h1>
                            <p className="text-gray-700 text-lg font-medium pt-4 pb-8 max-w-[500px] mx-auto">A community-driven platform for developers to share knowledge and solve coding challenges.</p>
                            <Link to='/login' className='inline-block'>
                                <button className='bg-[#02B1FC] hover:bg-[#3b9dc7] duration-300 text-white font-medium py-3.5 px-8 rounded-full'>It's Totally Free!</button>
                            </Link>
                        </div>
                    </section>
                    <div className='max-w-[1320px] mx-auto hidden md:block -mt-[120px] lg:-mt-[150px] xl:-mt-[170px] z-10'>
                        <img className="px-3" src={heroImg} alt="ui" />
                    </div>
                </header>

                <section className='md:-mt-[150px] lg:-mt-[175px] xl:-mt-[177px] px-4 pt-16 md:pt-52 lg:pt-60 xl:pt-[270px] pb-16 md:pb-24 lg:pb-32 bg-[#F6F6F6]'>
                    <div className="max-w-[1320px] mx-auto">
                        <div className="text-center max-w-xl mx-auto mb-14">
                            <h2 className='text-[30px] leading-[44px] md:text-[36px] md:leading-[48px] lg:text-[38px] lg:leading-[52px] font-bold text-gray-800 mb-4'>Enhancing Experiences with Our <span className="text-color">Key Features</span></h2>
                            <p className="text-base md:text-lg text-[#7f7f7f] font-medium">Explore a suite of features designed to enhance user engagement, streamline interactions, and foster collaboration.</p>
                        </div>

                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-10'>
                            <div className="text-center lg:text-start">
                                <div className='second-bg text-white w-[75px] h-[75px] mx-auto lg:mx-0 rounded-2xl flex justify-center items-center'><FaRegLightbulb size={35} /></div>

                                <h3 className='text-xl text-gray-800 font-semibold mt-6 mb-3'>Posting Questions and Answers</h3>
                                <p className='text-[#7f7f7f]'>Authenticated users can post questions with details and answers to any question.</p>
                            </div>
                            <div className="text-center lg:text-start">
                                <div className='second-bg text-white w-[75px] h-[75px] mx-auto lg:mx-0 rounded-2xl flex justify-center items-center'><BiSearchAlt size={35} /></div>

                                <h3 className='text-xl text-gray-800 font-semibold mt-6 mb-3'>Discover with Search Functionality</h3>
                                <p className='text-[#7f7f7f]'>A search bar allows authenticated users to search for questions by title or tag.</p>
                            </div>
                            <div className="text-center lg:text-start">
                                <div className='second-bg text-white w-[75px] h-[75px] mx-auto lg:mx-0 rounded-2xl flex justify-center items-center'><BiLike size={35} /></div>

                                <h3 className='text-xl text-gray-800 font-semibold mt-6 mb-3'>Vote and Like Questions Easily</h3>
                                <p className='text-[#7f7f7f]'>Users can upvote or like questions, with real-time updates reflecting across the platform.</p>
                            </div>
                            <div className="text-center lg:text-start">
                                <div className='second-bg text-white w-[75px] h-[75px] mx-auto lg:mx-0 rounded-2xl flex justify-center items-center'><TbUsersGroup size={35} /></div>

                                <h3 className='text-xl text-gray-800 font-semibold mt-6 mb-3'>Browse Registered Users and Profiles</h3>
                                <p className='text-[#7f7f7f]'>A page that lists all registered users. Clicking on a user’s card navigates to their public profile.</p>
                            </div>
                        </div>
                        <div className="md:col-span-2 lg:col-span-4 mt-14 flex justify-center">
                            <Link to='/login' className="inline-block">
                                <button className='bg-[#33B89F] hover:bg-[#269782] duration-300 text-white font-medium py-3.5 px-8 rounded-full flex items-center gap-2 mx-auto'>Explore More <IoIosArrowDroprightCircle size={20} /></button>
                            </Link>
                        </div>
                        {/* <div>
                            <button className='flex items-center gap-4 bg-green-100 px-4 py-2 rounded-full hover:bg-green-100 mt-12 mx-auto md:mx-0'>
                                <span className='text-green-500'><AiFillAndroid size={30} /></span>
                                <div className='text-center'>
                                    <span className='text-sm font-medium block'>Available our</span>
                                    <span className='font-semibold'>ANDROID APP</span>
                                </div>
                            </button>
                        </div> */}
                    </div>
                </section>

                <section className=' bg-[#202942] bg-cover bg-no-repeat' style={{ backgroundImage: `url(${bg})` }}>
                    <div className='px-4 py-28 grid md:grid-cols-3 gap-12 max-w-[1320px] mx-auto'>
                        <div className='text-center'>
                            <span className='text-color'><FaUser size={45} className='mx-auto' /></span>
                            <h3 className='text-white text-5xl font-bold mb-2 mt-4'><CountUp from={0} to={1789} duration={3500} />+</h3>
                            <span className='text-white text-xl font-normal'>Total Users</span>
                        </div>
                        <div className='text-center'>
                            <span className='text-color'><FaStar size={45} className='mx-auto' /></span>
                            <h3 className='text-white text-5xl font-bold mb-2 mt-4'><CountUp from={0} to={1454} duration={3500} />+</h3>
                            <span className='text-white text-xl font-normal'>Positive Reviews</span>
                        </div>
                        <div className='text-center'>
                            <span className='text-color'><FaUsers size={45} className='mx-auto' /></span>
                            <h3 className='text-white text-5xl font-bold mb-2 mt-4'><CountUp from={0} to={1200} duration={6500} />+</h3>
                            <span className='text-white text-xl font-normal'>Daily Active Users</span>
                        </div>
                    </div>
                </section>

                <section className="grid md:grid-cols-2 gap-7 md:gap-10 items-start lg:items-center max-w-[1320px] mx-auto px-4 py-16 md:py-24 lg:py-32">
                    <div>
                        <h2 className="text-[30px] leading-[44px] md:text-[36px] md:leading-[48px] lg:text-[38px] lg:leading-[52px] font-bold text-gray-800 mb-5">User <span className="text-color">Authentication</span> (with Google and GitHub integration)</h2>
                        <p className="text-base md:text-lg text-[#7f7f7f] ">With Google and GitHub streamlines sign-up and login, making it easier for users to join and engage. Social logins reduce friction and improve user retention by bypassing manual registration.</p>
                        <ul className="my-6">
                            <li className="flex items-center gap-3 mb-3 text-lg font-medium"><span className="text-color"><FaCheck size={18} /></span>Google Sign Up</li>
                            <li className="flex items-center gap-3 mb-3 text-lg font-medium"><span className="text-color"><FaCheck size={18} /></span>GitHub Sign Up</li>
                            <li className="flex items-center gap-3 text-lg font-medium"><span className="text-color"><FaCheck size={18} /></span>Manually Sign Up</li>
                        </ul>
                        <Link to='/login' className="inline-block mt-6">
                            <button className='bg-[#33B89F] hover:bg-[#269782] duration-300 text-white font-medium py-3.5 px-8 rounded-full flex items-center gap-2'>Explore More <IoIosArrowDroprightCircle size={20} /></button>
                        </Link>
                    </div>

                    <div>
                        <img src={regSectionImg} alt="Registration Pages" />
                    </div>
                </section>

                <section className="grid md:grid-cols-2 gap-7 md:gap-10 items-start lg:items-center max-w-[1320px] mx-auto px-4 pb-16 md:pb-24 lg:pb-32">
                    <div className="order-2 md:order-none">
                        <img src={newsFeedImg} alt="Registration Pages" />
                    </div>

                    <div>
                        <h2 className="text-[30px] leading-[44px] md:text-[36px] md:leading-[48px] lg:text-[38px] lg:leading-[52px] font-bold text-gray-800 mb-5">Dynamic News Feed with <span className="text-color">Ajax Loading</span> and <span className="text-color">Real-Time</span> Activity Updates</h2>
                        <p className="text-base md:text-lg text-[#7f7f7f]">The dynamic Newsfeed with Ajax Load More ensures seamless browsing. Real-time updates for votes, answers, and views, along with the dynamic display of Top 5 Tags and Questions, enhance user engagement.</p>
                        <ul className="my-6">
                            <li className="flex items-center gap-3 mb-3 text-lg font-medium"><span className="text-color"><FaCheck size={18} /></span>Question Card</li>
                            <li className="flex items-center gap-3 mb-3 text-lg font-medium"><span className="text-color"><FaCheck size={18} /></span>Real-Time Activity Updates</li>
                            <li className="flex items-center gap-3 text-lg font-medium"><span className="text-color"><FaCheck size={18} /></span>Top 5 Tags & Questions</li>
                        </ul>
                        <Link to='/news-feed' className="inline-block mt-6">
                            <button className='bg-[#33B89F] hover:bg-[#269782] duration-300 text-white font-medium py-3.5 px-8 rounded-full flex items-center gap-2'>Explore More <IoIosArrowDroprightCircle size={20} /></button>
                        </Link>
                    </div>
                </section>

                <section className='px-4 max-w-[1320px] mx-auto'>
                    <div className="px-5 py-8 md:p-10 lg:p-16 xl:p-20 bg-gray-100 rounded-2xl grid md:grid-cols-2 gap-5 lg:gap-10 items-center bg-none bg-bottom" style={{ backgroundImage: `url(${overviewBg})` }}>
                        <div>
                            <span className="font-medium text-[#269782] inline-block mb-3">Discover the Bigger Picture</span>
                            <h2 className="text-[30px] leading-[44px] md:text-[36px] md:leading-[48px] lg:text-[38px] lg:leading-[52px] font-bold text-gray-800 mb-5">Get a Complete <span className="text-color-second">Overview</span> of Our App in Action</h2>
                            <p className="text-base md:text-lg text-[#7f7f7f]">Explore the full potential of our app with this in-depth review. Learn about its features, capabilities, and how it delivers a seamless experience tailored to your needs.</p>
                        </div>
                        <div className="h-72 md:h-96 relative">
                            <img className=" h-full object-cover rounded-2xl" src={videoThumb} alt="App overview" />
                            {/* <span className="w-20 h-20 flex justify-center items-center bg-white rounded-full absolute right-1/2 top-1/3 mt-4 -mr-11 animate-border-fade"><FaPlay className="-mr-1" size={25} /></span> */}
                            <div className="absolute right-1/2 top-1/3 mt-4 -mr-14">
                                <div className="relative w-24 h-24 flex justify-center items-center">
                                    <div className="absolute inset-0 border-spin-outer"></div>
                                    <div className="absolute inset-1 border-spin-inner"></div>
                                    <span className="w-20 h-20 bg-white rounded-full flex justify-center items-center">
                                        <FaPlay className="-mr-1" size={25} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="max-w-[1320px] mx-auto px-4 pt-16 md:pt-24 lg:pt-32">
                    <div className="text-center max-w-xl mx-auto mb-14">
                        <h2 className='text-[30px] leading-[44px] md:text-[36px] md:leading-[48px] lg:text-[38px] lg:leading-[52px] font-bold text-gray-800 mb-4'>Meet Our <span className="text-color">Developer</span> and Contributors</h2>
                        <p className="text-base md:text-lg text-[#7f7f7f] font-medium">Behind every feature and solution lies the passion and dedication of our exceptional developers and contributors.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-5 xl:gap-10">
                        <div className="sm:col-span-1 md:col-span-2 lg:col-span-4">
                            <img className="rounded-2xl w-full" src={teamMember1} alt="Sajeeb Debnath" />
                            <div className="p-5 bg-white rounded-2xl mx-4 xl:mx-8 cs-box-shadow -mt-14 relative">
                                <div className="flex items-start justify-between gap-4">
                                    <h4 className="text-xl font-semibold">Sajeeb Debnath</h4>
                                    <div className="block md:hidden lg:block">
                                        <div className="flex items-center gap-3">
                                            <Link className="hover:text-[#33b89f] duration-300" to="https://www.linkedin.com/in/developersajeeb24/" target="_blank">
                                                <BsLinkedin size={24} />
                                            </Link>
                                            <Link className="hover:text-[#33b89f] duration-300" to="http://www.developersajeeb.com" target="_blank">
                                                <TfiWorld size={24} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm mt-1 text-[#7f7f7f] leading-[22px]">Full Stack Development <br /> Technical Project Management</p>
                                <div className="hidden md:block lg:hidden mt-4">
                                    <div className="flex items-center gap-3">
                                        <Link className="hover:text-[#33b89f] duration-300" to="https://www.linkedin.com/in/developersajeeb24/" target="_blank">
                                            <BsLinkedin size={24} />
                                        </Link>
                                        <Link className="hover:text-[#33b89f] duration-300" to="http://www.developersajeeb.com" target="_blank">
                                            <TfiWorld size={24} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-1 lg:col-span-2 relative">
                            <img className="h-full w-full object-cover rounded-2xl" src={teamMember2} alt="Member 2" />
                            <div className="bg-white p-3 rounded-2xl absolute m-3 text-center bottom-0 right-0 left-0">
                                <h4 className="text-sm font-medium">Mufizul islam Nirob</h4>
                            </div>
                        </div>
                        <div className="sm:col-span-1 lg:col-span-2 relative">
                            <img className="h-full w-full object-cover rounded-2xl" src={teamMember3} alt="Member 3" />
                            <div className="bg-white p-3 rounded-2xl absolute m-3 text-center bottom-0 right-0 left-0">
                                <h4 className="text-sm font-medium">Ali Nabi</h4>
                            </div>
                        </div>
                        <div className="sm:col-span-1 lg:col-span-2 relative">
                            <img className="h-full w-full object-cover rounded-2xl" src={teamMember4} alt="Member 4" />
                            <div className="bg-white p-3 rounded-2xl absolute m-3 text-center bottom-0 right-0 left-0">
                                <h4 className="text-sm font-medium">Md Fakhrul Hasan</h4>
                            </div>
                        </div>
                        <div className="sm:col-span-1 lg:col-span-2 relative">
                            <img className="h-full w-full object-cover rounded-2xl" src={teamMember5} alt="Member 5" />
                            <div className="bg-white p-3 rounded-2xl absolute m-3 text-center bottom-0 right-0 left-0">
                                <h4 className="text-sm font-medium">Bilkish Akther</h4>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='bg-gray-50'>
                    <div className='px-4 py-16 md:py-24 lg:py-32 mt-16 md:mt-24 lg:mt-32 bg-gray-50 grid lg:grid-cols-3 gap-6 max-w-[1320px] mx-auto'>
                        <div>
                            <div>
                                <span className='bg-indigo-50 px-5 py-2 text-color rounded-md font-medium'>Latest News & Blog</span>
                                <h2 className='text-[30px] leading-[44px] md:text-[36px] md:leading-[48px] lg:text-[38px] lg:leading-[52px] font-bold text-gray-800 my-6'>Get Our Every Single Update Latest News and Blog</h2>
                            </div>
                            <Link to='/blog' className="inline-block">
                                <button className='bg-[#33B89F] hover:bg-[#269782] duration-300 text-white font-medium py-3.5 px-8 rounded-full'>View More</button>
                            </Link>
                        </div>
                        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                            <div className='bg-white p-8 rounded-2xl border-dashed border-2'>
                                <div className='flex items-center gap-6 text-sm text-gray-500 mb-5'>
                                    <p className='flex items-center gap-1'><FaRegCalendarAlt /> 25 March 2022</p>
                                    <p className='flex items-center gap-1'><AiOutlineComment /> Com (5)</p>
                                </div>
                                <h2 className='text-[20px] font-semibold leading-snug mb-3'>Smashin Podcast Episode Web Frameworks Solve Vanilla</h2>
                                <p className='leading-7 text-gray-500 mb-5'>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized the charms of pleasure</p>
                                <span className='flex items-center gap-2 text-color cursor-pointer'>Read More <FaArrowRight size={15} /></span>
                            </div>
                            <div className='bg-white p-8 rounded-2xl border-dashed border-2'>
                                <div className='flex items-center gap-6 text-sm text-gray-500 mb-5'>
                                    <p className='flex items-center gap-1'><FaRegCalendarAlt /> 25 March 2022</p>
                                    <p className='flex items-center gap-1'><AiOutlineComment /> Com (5)</p>
                                </div>
                                <h2 className='text-[20px] font-semibold leading-snug mb-3'>Smashin Podcast Episode Web Frameworks Solve Vanilla</h2>
                                <p className='leading-7 text-gray-500 mb-5'>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized the charms of pleasure</p>
                                <span className='flex items-center gap-2 text-color cursor-pointer'>Read More <FaArrowRight size={15} /></span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="logo-slider">
                    <div className="slide-track">
                        <div className="slide">
                            <img src={logo1} height="100" width="220" alt="" />
                        </div>
                        <div className="slide">
                            <img src={logo2} height="100" width="220" alt="" />
                        </div>
                        <div className="slide">
                            <img src={logo3} height="100" width="220" alt="" />
                        </div>
                        <div className="slide">
                            <img src={logo4} height="100" width="220" alt="" />
                        </div>
                        <div className="slide">
                            <img src={logo5} height="100" width="220" alt="" />
                        </div>
                        <div className="slide">
                            <img src={logo6} height="100" width="220" alt="" />
                        </div>
                        <div className="slide">
                            <img src={logo7} height="100" width="220" alt="" />
                        </div>
                        <div className="slide">
                            <img src={logo8} height="100" width="220" alt="" />
                        </div>
                        <div className="slide">
                            <img src={logo1} height="100" width="220" alt="" />
                        </div>
                        <div className="slide">
                            <img src={logo2} height="100" width="220" alt="" />
                        </div>
                        <div className="slide">
                            <img src={logo3} height="100" width="220" alt="" />
                        </div>
                        <div className="slide">
                            <img src={logo4} height="100" width="220" alt="" />
                        </div>
                        <div className="slide">
                            <img src={logo5} height="100" width="220" alt="" />
                        </div>
                    </div>
                </section>

                {/* <section className='px-4 pb-20 md:pb-28 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-12 max-w-[1320px] mx-auto'>
                    <img className='w-full' src={logo1} alt="" />
                    <img className='w-full' src={logo2} alt="" />
                    <img className='w-full' src={logo3} alt="" />
                    <img className='w-full' src={logo4} alt="" />
                    <img className='w-full' src={logo5} alt="" />
                </section> */}
            </main>
        </>
    );
};

export default Home;