//TODO: Implement Formik Form Validation

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { ImSpinner10 } from "react-icons/im";
import bg from '../../assets/others/logreg.jpg'
import { BsPersonAdd } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { createUser, updateUserProfile, loading } = authContext;
    const navigate = useNavigate();

    const handleRegister = (event: { preventDefault: () => void; target: any; }) => {
        event.preventDefault();
        const form = event.target;
        const username = form.username.value;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const facebookURL = form.facebookURL.value;
        const githubURL = form.githubURL.value;
        const role = 'normalUser';

        createUser(email, password)
            .then(() => {

                updateUserProfile(email, password)
                    .then(() => {

                        const saveUser = { name, username, email, password, facebookURL, githubURL, role }
                        fetch('https://code-stack-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(result => result.json())
                            .then(() => {
                                Swal.fire(
                                    'Successful Register!',
                                    'You have successfully Register.',
                                    'success'
                                )
                                navigate('/');
                            })
                    })
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

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <main className='grid md:grid-cols-2' data-aos="fade-up">
            <div className="py-16 lg:py-28 px-4 lg:px-32">
                <form className="space-y-6" onSubmit={handleRegister}>
                    <div>
                        <h5 className="text-3xl font-semibold text-gray-900">Registration</h5>
                        <p className='text-gray-500 mt-1'>Solve your problems and errors from this beautiful community!</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="username" className="block mb-2 font-medium text-gray-900">Username<span className="text-red-500"> *</span></label>
                            <input type="text" name="username" id="username" className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" placeholder="your username" required></input>
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-2 font-medium text-gray-900">Your Name<span className="text-red-500"> *</span></label>
                            <input type="text" name="name" id="name" className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" placeholder="your name" required></input>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium text-gray-900">Your email<span className="text-red-500"> *</span></label>
                        <input type="email" name="email" id="email" className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" placeholder="name@mail.com" required></input>
                    </div>
                    <div>
                        <label htmlFor="profilePhoto" className="block mb-2 font-medium text-gray-900">Upload Your Photo</label>
                        <input className="cursor-pointer file:cursor-pointer relative m-0 block w-full min-w-0 rounded-md border py-3 px-5 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] hover:file:bg-[#5138EE] hover:file:text-white border-gray-300 file:bg-indigo-50 file:font-medium file:rounded-md" type="file" name="profilePhoto" id="profilePhoto" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 font-medium text-gray-900">Your password<span className="text-red-500"> *</span></label>
                        <div className='flex items-center'>
                            <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="••••••••" className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" required></input>
                            <span className="-ml-8 cursor-pointer text-gray-500" onClick={handleTogglePassword}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="bg-button w-full flex justify-center">
                        {loading ? (
                            <ImSpinner10 className='m-auto animate-spin' size={24} />
                        ) : (
                            <p className='flex items-center gap-2'>Register to your account <BsPersonAdd size={18} /></p>
                        )}
                    </button>
                    <h4 className='text-center text-lg font-semibold text-gray-700'>Or SingUp With</h4>
                    <SocialLogin></SocialLogin>
                    <Link to='/login'>
                        <div className="font-medium text-gray-500 dark:text-gray-300 mt-4 text-center text-sm">
                            Already have an account? <span className="text-color hover:underline">Login</span>
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

export default Register;