import { BiHomeAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Lottie from 'lottie-react'
import error from '../../assets/animation/404.json'

const ErrorPage = () => {
    return (
        <main className="px-4 py-12 md:px-8 md:py-32 lg:px-32 h-screen">
            <section className='grid md:grid-cols-2 items-center gap-10'>
                <div className="md:relative">
                    <div className='text-center md:relative'>
                        <h1 className='text-[236px] text-black -z-10 font-extralight'>OOPS!</h1>
                        <p className='md:absolute bg-white px-4 py-2 bottom-20 md:right-[70px] z-10 text-3xl font-light text-black'>404 - THE PAGE CAN'T BE FOUND</p>
                    </div>
                    <Link to='/'>
                        <button className="bg-button md:absolute bottom-0 md:left-[250px]">GO TO HOME <BiHomeAlt size={20} /></button>
                    </Link>
                </div>
                <div>
                    <Lottie animationData={error} loop={true} />
                </div>
            </section>
        </main>
    );
};

export default ErrorPage;