import headerImage from '../../assets/others/header-image.png'
import { FaHtml5, FaCss3Alt, FaJava, FaReact, FaNodeJs } from "react-icons/fa";
import search from '../../assets/others/search.png'
import analyze from '../../assets/others/analyze.png'
import apply from '../../assets/others/apply.jpg'
import BlogSlider from '../../components/Home/BlogSlider';

const Home = () => {

    return (
        <>
            <main className=''>
                <header>
                    <section className='px-3 py-12 md:px-8 md:py-28 lg:px-32 grid md:grid-cols-2 gap-10 items-center'>
                        <div>
                            <h1 className="text-4xl text-center md:text-start lg:text-5xl md:text-4xl font-bold text-gray-800">Best Website For Your Programming Or Code Solution.</h1>
                            <p className="text-gray-500 pt-4 pb-8 text-center md:text-start">CodeStack is a widely recognized platform where developers of all levels gather to ask questions, share knowledge, and find solutions to coding problems. The community-driven nature ensures a vast array of answers and discussions on a wide range of programming languages and technologies.</p>
                            <div className='text-center md:text-start'>
                                <button className="px-6 py-3 relative rounded-full group overflow-hidden font-medium primary-bg text-white inline-block mr-4">
                                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-sky-50 group-hover:h-full opacity-90"></span>
                                    <span className="relative group-hover:text-[#0278AE]">Get Start</span>
                                </button>
                                <button className="px-6 py-3 relative rounded-full group overflow-hidden font-medium bg-sky-50 text-color inline-block">
                                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 primary-bg group-hover:h-full opacity-90"></span>
                                    <span className="relative group-hover:text-white">Take A Tour</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <img className='w-full' src={headerImage} alt="" />
                        </div>
                    </section>
                </header>

                <section className='px-3 md:px-8 lg:px-32 grid md:grid-cols-3 gap-8'>
                    <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 border-[rgb(197,230,245)] border-2'>
                        <figure>
                            <img className='w-24 mx-auto mt-2' src="https://i.ibb.co/v4ZH10M/images-1.png" alt="/" />
                        </figure>
                        <p className='text-center text-2xl text-blue-700'>Accelerate our R&D <br /> Development cycle</p>
                        <p className="text-center mt-3 tracking-wide">Apply existing knowledge <br /> dynamically to new problem in <br /> real time. </p>
                    </div>

                    <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 border-[#c5e6f5] border-2'>
                        <figure>
                            <img className='w-20 mx-auto mt-3 ' src="https://i.ibb.co/fdswGVp/image-2.png" alt="/" />
                        </figure>
                        <p className='text-center text-2xl text-blue-700 mt-2'>Improve business<br />agility</p>
                        <p className="text-center mt-3 tracking-wide">Stengthen connection among <br /> experts across your entrie <br /> opportunities for grouth. </p>
                    </div>

                    <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 border-2 border-[#c5e6f5]'>
                        <figure>
                            <img className='w-28 mx-auto mt-3 h-20' src="https://i.ibb.co/dWxGM6j/images-3.png" alt="/" />
                        </figure>
                        <p className='text-center text-2xl text-blue-700 mt-2'>Get the benefits of AI <br />with less risk</p>
                        <p className="text-center mt-3 tracking-wide">Enterprise-grade tech <br /> accelerates knowledge sharing  <br /> your organization IP.</p>
                    </div>
                </section>

                <section className='px-3 py-12 md:px-8 md:py-28 lg:px-32'>
                    <h1 className="text-4xl text-center text-gray-800 font-bold">Explore Something</h1>
                    <p className='text-center text-gray-500 font-medium mt-2'>Diving into Different Categories</p>
                    <div className='grid md:grid-cols-3 lg:grid-cols-5 gap-8 mt-16'>
                        <div className='shadow-2xl hover:scale-105 duration-300 flex justify-center items-center cursor-pointer rounded-lg py-12'>
                            <div className='text-center'>
                                <span className="text-6xl text-color"><FaHtml5></FaHtml5></span>
                                <h4 className="card-title text-color font-bold mt-2">HTML5</h4>
                            </div>
                        </div>

                        <div className='shadow-2xl hover:scale-105 duration-300 flex justify-center items-center cursor-pointer rounded-lg py-12'>
                            <div className='text-center'>
                                <span className="text-6xl text-color"><FaCss3Alt></FaCss3Alt></span>
                                <h4 className="card-title text-color font-bold mt-2">CSS3</h4>
                            </div>
                        </div>

                        <div className='shadow-2xl hover:scale-105 duration-300 flex justify-center items-center cursor-pointer rounded-lg py-12'>
                            <div className='text-center'>
                                <span className="text-6xl text-color"><FaJava></FaJava></span>
                                <h4 className="card-title text-color font-bold mt-2">JavaScript</h4>
                            </div>
                        </div>

                        <div className='shadow-2xl hover:scale-105 duration-300 flex justify-center items-center cursor-pointer rounded-lg py-12'>
                            <div className='text-center'>
                                <span className="text-6xl text-color"><FaReact></FaReact></span>
                                <h4 className="card-title text-color font-bold mt-2">React</h4>
                            </div>
                        </div>

                        <div className='shadow-2xl hover:scale-105 duration-300 flex justify-center items-center cursor-pointer rounded-lg py-12'>
                            <div className='text-center'>
                                <span className="text-6xl text-color"><FaNodeJs></FaNodeJs></span>
                                <h4 className="card-title text-color font-bold mt-2">Node JS</h4>
                            </div>
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