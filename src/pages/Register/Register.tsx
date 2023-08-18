import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "../../components/SocialLogin/SocialLogin";


const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;
        const facebookURL = form.facebookURL.value;
        const githubURL = form.githubURL.value;
        const role = 'normalUser';

        createUser(email, password)
            .then(() => {

                updateUserProfile(email, password)
                    .then(() => {

                        const saveUser = { name, email, password, photo, facebookURL, githubURL, role }
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
    return (
        <main className='py-20 px-4 md:px-0 bg-gray-50' data-aos="fade-up">
            <div className="w-full max-w-sm p-4 border bg-white border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto">
                <form className="space-y-6" onSubmit={handleRegister}>
                    <div>
                        <h5 className="text-2xl border-b-2 w-28 pb-3 mx-auto border-[#3DB166] font-bold text-center text-gray-900">Register</h5>
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 font-medium text-gray-900">Your Name</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" placeholder="your name" required></input>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium text-gray-900">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" placeholder="name@mail.com" required></input>
                    </div>
                    <div>
                        <label htmlFor="photo" className="block mb-2 font-medium text-gray-900">Your Photo URL</label>
                        <input type="url" name="photo" id="photo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" placeholder="your photo url" required></input>
                    </div>
                    <div>
                        <label htmlFor="facebookURL" className="block mb-2 font-medium text-gray-900">Facebook Profile URL</label>
                        <input type="url" name="facebookURL" id="facebookURL" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" placeholder="your facebook profile url" required></input>
                    </div>
                    <div>
                        <label htmlFor="githubURL" className="block mb-2 font-medium text-gray-900">GitHub Profile URL</label>
                        <input type="url" name="githubURL" id="githubURL" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" placeholder="your facebook profile url" required></input>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 font-medium text-gray-900">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-3" required></input>
                    </div>
                    {/* {
                        logError && <p className="text-red-500 text-center text-sm">{logError}</p>
                    } */}
                    <button type="submit" className="w-full text-white primary-bg duration-300 hover:bg-[#319ac6] font-medium rounded-md px-5 py-2.5 text-center">Register to your account</button>
                    <h4 className='text-center text-lg font-semibold text-gray-700'>Or SingUp With</h4>
                    <SocialLogin></SocialLogin>
                    <Link to='/login'>
                        <div className="font-medium text-gray-500 dark:text-gray-300 mt-4 text-center text-sm">
                            Already have an account? <span className="color-one hover:underline">Login</span>
                        </div>
                    </Link>
                </form>
            </div>
        </main>
    );
};

export default Register;