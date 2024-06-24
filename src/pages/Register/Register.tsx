import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import regImg from '../../assets/others/regpage.png'
import { InputText } from "primereact/inputtext";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Password } from "primereact/password";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from "primereact/button";
import toast, { Toaster } from "react-hot-toast";
import { FirebaseError } from "firebase/app";

interface IFormInput {
    username: string;
    name: string;
    email: string;
    password: string;
}

const image_hosting_token = import.meta.env.VITE_Image_API;

const Register = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { createUser, updateUserProfile } = authContext;
    const navigate = useNavigate();
    const [isUsernameValid, setIsUsernameValid] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
    const [isFormBtnLoading, setIsFormBtnLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [emailUserError, setEmailUserError] = useState<string>('');

    const footer = (
        <>
            <p className="mt-2">Minimum 6 characters</p>
        </>)

    const handleUsernameChange = async (newUsername: string) => {
        try {
            const response = await fetch(`http://localhost:5000/check-username?username=${newUsername}`);
            const data = await response.json();

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
    
    function isFirebaseError(error: unknown): error is FirebaseError {
        return (error as FirebaseError).code !== undefined;
    }

    const { register, control, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsFormBtnLoading(true);
        setLoginError('');
        setEmailUserError('');

        const { username, name, email, password } = data;
        const role = 'normalUser';
        const entryPoint = 'manually';

        try {

            if (isUsernameValid === 'Username already exists!') {
                toast('Username already exists!', {
                    icon: '❌',
                });
                setIsFormBtnLoading(false);
                return;
            }

            await createUser(email, password);

            let imgURL = '';

            if (image) {
                const formData = new FormData();
                formData.append('image', image);

                const imgResponse = await fetch(img_hosting_url, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' },
                });

                const imgResult = await imgResponse.json();

                if (imgResult.success) {
                    imgURL = imgResult.data.display_url;
                } else {
                    throw new Error('Image upload failed');
                }
            }

            await updateUserProfile(name, imgURL || '');
            const saveUser = { name, username, email, imgURL, password, role, entryPoint };

            const userResponse = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saveUser),
            });

            const userResult = await userResponse.json();

            if (userResult.insertedId) {
                Swal.fire('Successful Register!', 'You have successfully registered.', 'success');
                navigate('/news-feed');
            } else {
                Swal.fire('Registration Failed', userResult.message || 'Something went wrong.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            if (isFirebaseError(error) && error.code === 'auth/email-already-in-use') {
                toast('Email already in use!', {
                    icon: '❌',
                });
                setEmailUserError('Email already in use!');
            } else {
                setLoginError('Registration failed');
                toast('Registration failed. Please try again.', {
                    icon: '❌',
                });
            }
        } finally {
            setIsFormBtnLoading(false);
        }
    };

    return (
        <main className='grid md:grid-cols-2 max-w-[1320px] mx-auto px-4' data-aos="fade-up">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="py-10 md:py-16 lg:py-20 md:pr-5 xl:pr-20">
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
                                            <p className={`${isUsernameValid === 'Username already exists!' ? 'text-red-500' : 'text-green-500'} text-sm ml-0.5`}>{isUsernameValid}</p>
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
                        {emailUserError && <p className="text-red-500 text-sm">{emailUserError}</p>}
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
                                        footer={footer}
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
            <div className="bg-gray-100 p-8 lg:p-16 my-5 md:my-10 rounded-xl flex justify-center items-center">
                <img className="w-full" src={regImg} alt="Register Image" />
            </div>
        </main>
    );
};

export default Register;