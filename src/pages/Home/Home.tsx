import headerImage from '../../assets/animation/mobile.png'

const Home = () => {

    return (
        <main>
            <header className="px-3 py-12 md:px-8 md:py-28 lg:px-32 grid md:grid-cols-2 gap-10 items-center bg-cover bg-no-repeat">
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
                    <img src={headerImage} alt="" />
                </div>
            </header>
        </main>
    );
};

export default Home;