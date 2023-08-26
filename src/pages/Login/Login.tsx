//TODO: Implement Formik Form Validation

import { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { ImSpinner10 } from "react-icons/im";
import { BiLogInCircle } from 'react-icons/bi';
import bg from '../../assets/others/logreg.jpg'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef<HTMLInputElement>(null);
    const [resetError, setResetError] = useState('');
    const from = location.state?.from?.pathname;
    const [showPassword, setShowPassword] = useState(false);

    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { loading, signIn, ResetPassword } = authContext;

    const handleLoginUser = (event: { preventDefault: () => void; target: any; }) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(() => {
                Swal.fire(
                    'Login Successful!',
                    'You have successfully logged in.',
                    'success'
                )
                navigate(from, { replace: true });
                // setLogError('')
            })
            .catch(() => {
                // if (error.code === 'auth/wrong-password') {
                //     setLogError('Wrong password');
                // } else if (error.code === 'auth/user-not-found') {
                //     setLogError('User not found');
                // }
            })
    }

    const handleResetPass = () => {
        const email = emailRef.current?.value;
        if (!email) {
            setResetError('Please provide your email for reset!')
            return;
        }
        ResetPassword(email)
            .then(() => {
                console.log('done');
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <main className='grid md:grid-cols-2' data-aos="fade-up">
            <div className="py-16 lg:py-28 px-4 lg:px-32">
                <form className="space-y-6 bg-white rounded-lg sm:p-6 md:p-8" onSubmit={handleLoginUser}>
                    <div>
                        <h5 className="text-3xl font-semibold text-gray-900">LogIn</h5>
                        <p className='text-gray-500 mt-1'>We are glad to see you again!</p>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium text-gray-900">Your email</label>
                        <input ref={emailRef} type="email" name="email" id="email" className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" placeholder="name@mail.com" required></input>
                        <p className='text-sm text-red-500'>{resetError}</p>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 font-medium text-gray-900">Your password</label>
                        <div className='flex items-center'>
                            <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="••••••••" className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" required></input>
                            <span className="-ml-8 cursor-pointer text-gray-500" onClick={handleTogglePassword}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    {/* {
                        logError && <p className="text-red-500 text-center text-sm">{logError}</p>
                    } */}
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 text-orange-500"></input>
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-500">Remember me</label>
                        </div>
                        <a href="#" className="ml-auto text-sm color-one hover:underline" onClick={handleResetPass}>Lost Password?</a>
                    </div>
                    <button type="submit" className="bg-button w-full flex justify-center">
                        {loading ? (
                            <ImSpinner10 className='m-auto animate-spin' size={24} />
                        ) : (
                            <p className='flex items-center gap-2'>Login to your account <BiLogInCircle size={20} /></p>
                        )}
                    </button>
                    <h4 className='text-center text-lg font-semibold text-gray-700'>Or sing In with</h4>
                    <SocialLogin></SocialLogin>
                    <Link to='/register'>
                        <div className="font-medium text-gray-400 mt-4 text-center text-sm">
                            Not registered? <span className="text-color hover:underline">Create account</span>
                        </div>
                    </Link>
                </form>
            </div>
            <div className='bg-cover py-20 px-4 md:p-6 lg:px-24 lg:py-28' style={{ backgroundImage: `url(${bg})` }}>
                <div className='backdrop-blur-lg bg-white/25 rounded-lg p-6 md:p-12 lg:p-16 h-full border-2 border-gray-200'>
                    <h1 className='leading-snug md:leading-snug lg:leading-snug text-3xl md:text-4xl lg:text-5xl font-semibold text-white line-space'><span className='text-[#263358]'>CodeStack</span> Is A Platform For Programming Or Coding Solution</h1>
                    <p className='mt-6 text-[#263358] leading-7'>CodeStack is a widely recognized platform where developers of all levels gather to ask questions, share knowledge, and find solutions to coding problems. The community-driven nature ensures a vast array of answers and discussions on a wide range of programming languages and technologies.</p>
                </div>
            </div>
        </main>
    );
};

export default Login;