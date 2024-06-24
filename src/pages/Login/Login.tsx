import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import logImg from '../../assets/others/loginpage.png'

interface IFormInput {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/news-feed';
    const [isFormBtnLoading, setIsFormBtnLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('');
    const [emailResetError, setEmailResetError] = useState<string>('');

    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { signIn, ResetPassword, setLoading } = authContext;

    const { register, control, handleSubmit, formState: { errors }, watch } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => {
        setIsFormBtnLoading(true);
        setLoginError('');

        signIn(data.email, data.password)
            .then(() => {
                Swal.fire(
                    'Login Successful!',
                    'You have successfully logged in.',
                    'success'
                );
                setIsFormBtnLoading(false);
                navigate(from, { replace: true });
            })
            .catch(() => {
                setIsFormBtnLoading(false);
                setLoginError("The credentials don't match");
            });
    };

    const handleResetPass = async () => {
        const email = watch('email');
        if (!email) {
            setEmailResetError('Please provide your email for reset!');
            return;
        }
        setLoading(true);
    
        try {
            const res = await fetch(`http://localhost:5000/user?email=${email}`);
            
            if (!res.ok) {
                setLoading(false);
                Swal.fire('Error', 'Failed to fetch user data.', 'error');
                setEmailResetError('');
                return;
            }
    
            const text = await res.text();
            const userData = text ? JSON.parse(text) : null;
    
            if (!userData || userData.length === 0) {
                setLoading(false);
                Swal.fire({
                    title: "Oops :)",
                    text: "There are no accounts with this email!",
                    icon: "info"
                  });
                setEmailResetError('');
                return;
            } else {
                ResetPassword(email)
                    .then(() => {
                        setLoading(false);
                        Swal.fire(
                            'Password Reset Email Sent!',
                            'Please check your email for instructions.',
                            'success'
                        );
                        setEmailResetError('');
                    })
                    .catch(() => {
                        setLoading(false);
                    });
            }
        } catch (error) {
            setLoading(false);
            Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
            setEmailResetError('');
        }
    };

    return (
        <main className='grid md:grid-cols-2 max-w-[1320px] mx-auto px-4' data-aos="fade-up">
            <div className="py-10 md:py-16 lg:py-20 md:pr-5 xl:pr-20">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h5 className="text-3xl font-semibold text-gray-900">LogIn</h5>
                        <p className='text-gray-500 mt-1'>We are glad to see you again!</p>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium text-gray-900">Your email</label>
                        <InputText
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                            className='!w-full'
                        />
                        <ErrorMessage errors={errors} name="email" as={<p className="text-red-500 text-sm" />} />
                        {emailResetError && <p className="text-red-500 text-sm">{emailResetError}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 font-medium text-gray-900">Your password</label>
                        <div>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: 'Password is required' }}
                                render={({ field }) => (
                                    <Password
                                        {...field}
                                        feedback={false}
                                        toggleMask
                                    />
                                )}
                            />
                            <ErrorMessage errors={errors} name="password" as={<p className="text-red-500 text-sm" />} />
                            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 text-orange-500" />
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-500">Remember me</label>
                        </div>
                        <span className="ml-auto text-sm color-one hover:underline cursor-pointer" onClick={handleResetPass}>Lost Password?</span>
                    </div>
                    <Button
                        type="submit"
                        label="Log In"
                        icon="pi-sign-in"
                        iconPos="right"
                        disabled={isFormBtnLoading}
                        loading={isFormBtnLoading}
                        className='w-full cs-button'
                    />
                    <h4 className='text-center text-lg font-semibold text-gray-700'>Or SignIn with</h4>
                    <SocialLogin />
                    <Link to='/register'>
                        <div className="font-medium text-gray-400 mt-4 text-center text-sm">
                            Not registered? <span className="text-color hover:underline">Create account</span>
                        </div>
                    </Link>
                </form>
            </div>
            <div className="bg-gray-100 p-8 lg:p-16 my-5 md:my-10 rounded-xl flex justify-center items-center">
                <img className="w-full" src={logImg} alt="Login Image" />
            </div>
        </main>
    );
};

export default Login;