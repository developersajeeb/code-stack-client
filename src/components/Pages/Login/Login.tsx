import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react'
import login from '../../../assets/107385-login.json'

import { FaGoogle } from "react-icons/fa";
import {  toast } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';
const Login = () => {

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const { singIn, googleProvider, gitProvider } = useContext(AuthContext)

const navigate=useNavigate();
const location=useLocation();
let from=location.state?.from?.pathname || '/';
    const handleSingIn = (e) => {
        e.preventDefault();
        setSuccess('')
        setError('')
        const form = e.target;
        const password = form.password.value
        const email = form.email.value
        // console.log( email, password)
        singIn(email, password)
            .then((result) => {
                const loggedUser = result.user
                setError('')
                setSuccess(toast("User has created successfully"))
                form.reset()
                console.log(loggedUser);
                navigate(from,{replace:true})

            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })
    }

    const handleGoogleSing= () => {
        googleProvider()
            .then((result) => {
                const loggedInUser = result.user;
                console.log(loggedInUser)
                navigate(from,{replace:true})

            })
            .catch((error) => {
                console.log(error.message)
            })

    }


    // const handleGitHubSing = () => {
    //     gitProvider()
    //         .then((result) => {

    //             const loggedInUser = result.user
    //             console.log(loggedInUser)
    //             navigate(from,{replace:true})
                
    //         })
    //         .catch((error) => {
    //             console.log('error', error)
    //         })
    // }


    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left ml-2">
                        <h1 className="text-5xl font-bold ml-2 mb-3">Login now!</h1>
                        <div className=''>
                            <div className=''>
                                <Lottie animationData={login} loop={true} />
                            </div>
                        </div>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSingIn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <p className='text-yellow-400 text-center mb-2 px-4 font-bold text-xl'>{error}</p>
                            <p className='text-green-600 px-4 text-center mb-2 font-bold text-xl'>{success}</p>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>

                            <p className='text-center'>Do not have an Account? <Link to='/register'><span className='text-green-500'>Register</span></Link></p>


                        </form >

                        <div className="form-control mt-6">
                            <button className="btn btn-outline btn-success" onClick={handleGoogleSing}> <FaGoogle className='mr-1'></FaGoogle> Login With Google</button>
                        </div>
                        {/* <div className="form-control mt-2 py-2">
                            <button className="btn btn-outline btn-success" onClick={handleGitHubSing}> <FaGithub className='mr-1'></FaGithub> Login With GitHub</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;