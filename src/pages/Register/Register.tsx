//TODO: Implement Formik Form Validation

import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { ImSpinner10 } from "react-icons/im";
import bg from '../../assets/others/logreg.jpg'
import { BsPersonAdd } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from 'lottie-react'
import animation from '../../assets/animation/reg.json'
import { InputText } from "primereact/inputtext";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Password } from "primereact/password";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from "primereact/button";

interface IFormInput {
    username: string;
    name: string;
    email: string;
    password: string;
}

const image_hosting_token = import.meta.env.VITE_Problem_Image_Name;

const Register = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { createUser, updateUserProfile, loading } = authContext;
    const navigate = useNavigate();
    const [isUsernameValid, setIsUsernameValid] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
    const [isFormBtnLoading, setIsFormBtnLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleUsernameChange = async (newUsername: string) => {
        try {
            const response = await fetch(`http://localhost:5000/check-username?username=${newUsername}`);
            const data = await response.json();

            setMessage(data.message);
            setIsUsernameValid(data.message);
        } catch (error) {
            console.error("Error checking username:", error);
        }
    };

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value;
        setIsTyping(true);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            handleUsernameChange(newUsername);
            setIsTyping(false);
        }, 500)
    };

    const { register, control, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsFormBtnLoading(true);
        setLoginError('');

        const { username, name, email, password } = data;
        const role = 'normalUser';
        const entryPoint = 'manually';

        try {
            await createUser(email, password);
            await updateUserProfile(email, password);

            if (image) {
                const formData = new FormData();
                formData.append('image', image);

                const response = await fetch(img_hosting_url, {
                    method: 'POST',
                    body: formData
                });

                const imgResponse = await response.json();
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const saveUser = { name, username, email, imgURL, password, role, entryPoint };

                    const result = await fetch('http://localhost:5000/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(saveUser)
                    });

                    await result.json();
                    Swal.fire(
                        'Successful Register!',
                        'You have successfully registered.',
                        'success'
                    );
                    navigate('/news-feed');
                }
            } else {
                Swal.fire(
                    'Successful Register!',
                    'You have successfully registered.',
                    'success'
                );
                navigate('/news-feed');
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginError('Registration failed');
        } finally {
            setIsFormBtnLoading(false);
        }
    };

    // const handleRegister = (event: { preventDefault: () => void; target: any; }) => {
    //     event.preventDefault();
    //     const form = event.target;
    //     const username = form.username.value;
    //     const name = form.name.value;
    //     const email = form.email.value;
    //     const password = form.password.value;
    //     const role = 'normalUser';
    //     const entryPoint = 'manually';


    //     createUser(email, password)
    //         .then(() => {

    //             updateUserProfile(email, password)
    //                 .then(async () => {

    //                     if (image) {
    //                         const formData = new FormData();
    //                         formData.append('image', image);

    //                         try {
    //                             const response = await fetch(img_hosting_url, {
    //                                 method: 'POST',
    //                                 body: formData
    //                             });

    //                             const imgResponse = await response.json();
    //                             if (imgResponse.success) {
    //                                 const imgURL = imgResponse.data.display_url;
    //                                 console.log(imgURL, role);
    //                                 const saveUser = { name, username, email, imgURL, password, role, entryPoint }
    //                                 fetch('http://localhost:5000/users', {
    //                                     method: 'POST',
    //                                     headers: {
    //                                         'content-type': 'application/json'
    //                                     },
    //                                     body: JSON.stringify(saveUser)
    //                                 })
    //                                     .then(result => result.json())
    //                                     .then(() => {
    //                                         Swal.fire(
    //                                             'Successful Register!',
    //                                             'You have successfully Register.',
    //                                             'success'
    //                                         )
    //                                         navigate('/ news-feed');
    //                                     })
    //                             }
    //                         } catch (error) {
    //                             console.error("Error uploading image:", error);
    //                         }
    //                     }
    //                 })
    //         })
    //         .catch(() => {

    //         })
    // }

    return (
        <main className='grid md:grid-cols-2' data-aos="fade-up">
            <div className="py-16 lg:py-28 px-4 lg:px-32">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h5 className="text-3xl font-semibold text-gray-900">Registration</h5>
                        <p className='text-gray-500 mt-1'>Solve your problems and errors from this beautiful community!</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="username" className="block mb-2 font-medium text-gray-900">Username<span className="text-red-500"> *</span></label>
                            <Controller
                                name="username"
                                control={control}
                                rules={{ required: 'Username is required' }}
                                render={({ field }) => (
                                    <>
                                        <InputText
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                onUsernameChange(e);
                                            }}
                                            id="username"
                                            className={`!border !border-gray-300 !text-gray-900 !text-sm !rounded-md !block !w-full !px-3 !py-4 !h-[41px]`}
                                            placeholder="Your username"
                                        />
                                        {!isTyping && field.value && (
                                            <p className={`${isUsernameValid ? 'text-green-500' : 'text-red-500'} text-sm ml-0.5`}>{message}</p>
                                        )}
                                        <ErrorMessage errors={errors} name="username" as={<p className="text-red-500 text-sm" />} />
                                    </>
                                )}
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-2 font-medium text-gray-900">Your Name<span className="text-red-500"> *</span></label>
                            <InputText
                                {...register('name', { required: 'Your name is required' })} placeholder="Name"
                                className='!w-full'
                            />
                            <ErrorMessage errors={errors} name="name" as={<p className="text-red-500 text-sm" />} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium text-gray-900">Your Email<span className="text-red-500"> *</span></label>
                        <InputText
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                            className='!w-full'
                        />
                        <ErrorMessage errors={errors} name="email" as={<p className="text-red-500 text-sm" />} />
                    </div>
                    <div>
                        <label htmlFor="profilePhoto" className="block mb-2 font-medium text-gray-900">Upload Your Photo</label>
                        <input className="cursor-pointer file:cursor-pointer relative m-0 block w-full min-w-0 rounded-md border py-3 px-5 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] hover:file:bg-[#5138EE] hover:file:text-white border-gray-300 file:bg-indigo-50 file:font-medium file:rounded-md" type="file" name="profilePhoto" id="profilePhoto"
                            accept="image/*"
                            onChange={(e) => {
                                const selectedFile = e.target.files?.[0];
                                if (selectedFile) {
                                    setImage(selectedFile);
                                }
                            }} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 font-medium text-gray-900">Your Password<span className="text-red-500"> *</span></label>
                        <div>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: 'Password is required' }}
                                render={({ field }) => (
                                    <Password
                                        {...field}
                                        feedback={true}
                                        toggleMask
                                        promptLabel="Choose a password" weakLabel="Too simple" mediumLabel="Average complexity" strongLabel="Complex password"
                                    />
                                )}
                            />
                            <ErrorMessage errors={errors} name="password" as={<p className="text-red-500 text-sm" />} />
                            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                        </div>
                    </div>
                    <Button
                        type="submit"
                        label="Register to your account"
                        icon="pi-user-plus"
                        iconPos="right"
                        disabled={isFormBtnLoading}
                        loading={isFormBtnLoading}
                        className='w-full cs-button'
                    />
                    <h4 className='text-center text-lg font-semibold text-gray-700'>Or SignUp With</h4>
                    <SocialLogin></SocialLogin>
                    <Link to='/login'>
                        <div className="font-medium text-gray-500 dark:text-gray-300 mt-4 text-center text-sm">
                            Already have an account? <span className="text-color hover:underline">Login</span>
                        </div>
                    </Link>
                </form>
            </div>
            <div className='bg-cover py-20 px-4 md:p-6 lg:px-24 lg:py-28' style={{ backgroundImage: `url(${bg})` }}>
                <div className='backdrop-blur-lg bg-white/25 rounded-lg h-full border-2 border-gray-200 flex items-center'>
                    <Lottie className='w-full' animationData={animation} loop={true} />
                </div>
            </div>
        </main>
    );
};

export default Register;