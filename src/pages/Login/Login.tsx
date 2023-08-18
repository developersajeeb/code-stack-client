import { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef();
    const [resetError, setResetError] = useState('');
    const {singIn, ResetPassword} = useContext(AuthContext);

    const from = location.state?.from?.pathname;

    const handleLoginUser = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        
        singIn(email, password)
            .then(() => {
                Swal.fire(
                    'Login Successful!',
                    'You have successfully logged in.',
                    'success'
                )
                navigate(from, {replace: true});
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
        const email = emailRef.current.value;
        if(!email){
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


    return (
        <main className='py-20 px-4 md:px-0 bg-gray-50' data-aos="fade-up">
            <div className="w-full max-w-sm p-4 border bg-white border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto">
                <form className="space-y-6" onSubmit={handleLoginUser}>
                    <div>
                        <h5 className="text-2xl border-b-2 w-28 pb-3 mx-auto border-[#3DB166] font-bold text-center text-gray-900">LogIn</h5>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium text-gray-900">Your email</label>
                        <input ref={emailRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" placeholder="name@mail.com" required></input>
                        <p className='text-sm text-red-500'>{resetError}</p>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 font-medium text-gray-900">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" required></input>
                    </div>
                    {/* {
                        logError && <p className="text-red-500 text-center text-sm">{logError}</p>
                    } */}
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 text-orange-500"></input>
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <a href="#" className="ml-auto text-sm color-one hover:underline" onClick={handleResetPass}>Lost Password?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-two duration-300 hover:bg-[#62da8c] font-medium rounded-md px-5 py-2.5 text-center">Login to your account</button>
                    <h4 className='text-center text-lg font-semibold text-gray-700'>Or sing In with</h4>
                    <SocialLogin></SocialLogin>
                    <Link to='/register'>
                        <div className="font-medium text-gray-500 dark:text-gray-300 mt-4 text-center text-sm">
                            Not registered? <span className="color-one hover:underline">Create account</span>
                        </div>
                    </Link>
                </form>
            </div>
        </main>
    );
};

export default Login;