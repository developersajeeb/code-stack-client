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
import logImg from '../../assets/others/loginpage.png';
import { Dialog } from 'primereact/dialog';

interface IFormInput {
    email: string;
    password: string;
    resetEmail: string;
}

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/news-feed';
    const [isLoginFormBtnLoading, setIsLoginFormBtnLoading] = useState<boolean>(false);
    const [isResetFormBtnLoading, setIsResetFormBtnLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('');
    const [isGoogleEmailError, setGoogleEmailError] = useState<string>('');
    const [emailResetError, setEmailResetError] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [resetEmail, setResetEmail] = useState<string>('');

    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { signIn, ResetPassword } = authContext;

    const { register: loginRegister, handleSubmit: handleLoginSubmit, control: loginControl, formState: { errors: loginErrors } } = useForm<IFormInput>();
    const { handleSubmit: handleResetSubmit, control: resetControl, formState: { errors: resetErrors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => {
        setIsLoginFormBtnLoading(true);
        setLoginError('');
        setGoogleEmailError('');

        const emailCheckUrl = `http://localhost:5000/users/google/${data.email}`;

        fetch(emailCheckUrl)
            .then(response => response.json())
            .then(userData => {
                if (userData.entryPoint === 'google') {
                    setGoogleEmailError('This account uses Google sign-in. Please use the Google login option.');
                    setIsLoginFormBtnLoading(false);
                } else {
                    signIn(data.email, data.password)
                        .then(() => {
                            Swal.fire(
                                'Login Successful!',
                                'You have successfully logged in.',
                                'success'
                            );
                            setIsLoginFormBtnLoading(false);
                            navigate(from, { replace: true });
                        })
                        .catch(() => {
                            setIsLoginFormBtnLoading(false);
                            if (data.email && data.password) {
                                setLoginError("The credentials don't match.");
                            }
                        });
                }
            })
            .catch(() => {
                setIsLoginFormBtnLoading(false);
                setLoginError('Error checking email.');
            });
    };

    const handleResetPass = async () => {
        if (!resetEmail) {
            setEmailResetError('Please provide your email for reset!');
            return;
        }
        setIsResetFormBtnLoading(true);

        try {
            const res = await fetch(`http://localhost:5000/user?email=${resetEmail}`);

            if (!res.ok) {
                setIsResetFormBtnLoading(false);
                Swal.fire('Error', 'Failed to fetch user data.', 'error');
                setEmailResetError('');
                return;
            }

            const text = await res.text();
            const userData = text ? JSON.parse(text) : null;

            if (!userData || userData.length === 0) {
                setIsResetFormBtnLoading(false);
                setEmailResetError('There are no accounts with this email!');
                return;
            } else {
                ResetPassword(resetEmail)
                    .then(() => {
                        setIsResetFormBtnLoading(false);
                        setEmailResetError('success: Password Reset Email Sent! Please check your email for instructions.');
                    })
                    .catch(() => {
                        setIsResetFormBtnLoading(false);
                    });
            }
        } catch (error) {
            setIsResetFormBtnLoading(false);
            Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
            setEmailResetError('');
        }
    };

    const handleDialogSubmit = (data: IFormInput) => {
        setResetEmail(data.resetEmail);
        handleResetPass();
    };

    return (
        <main className='grid md:grid-cols-2 max-w-[1320px] mx-auto px-4' data-aos="fade-up">
            <div className="py-10 md:py-16 lg:py-20 md:pr-5 xl:pr-20">
                <form className="space-y-6" onSubmit={handleLoginSubmit(onSubmit)}>
                    <div>
                        <h5 className="text-3xl font-semibold text-gray-900">LogIn</h5>
                        <p className='text-gray-500 mt-1'>We are glad to see you again!</p>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium text-gray-900">Your email</label>
                        <InputText
                            {...loginRegister('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                            className='!w-full'
                        />
                        <ErrorMessage errors={loginErrors} name="email" as={<p className="text-red-500 text-sm" />} />
                        {isGoogleEmailError && <p className="text-red-500 text-sm">{isGoogleEmailError}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 font-medium text-gray-900">Your password</label>
                        <div>
                            <Controller
                                name="password"
                                control={loginControl}
                                rules={{ required: 'Password is required' }}
                                render={({ field }) => (
                                    <Password
                                        {...field}
                                        feedback={false}
                                        toggleMask
                                    />
                                )}
                            />
                            <ErrorMessage errors={loginErrors} name="password" as={<p className="text-red-500 text-sm" />} />
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
                        <span className="ml-auto text-sm color-one hover:underline cursor-pointer" onClick={() => setVisible(true)}>Lost Password?</span>
                    </div>
                    <Button
                        type="submit"
                        label="Log In"
                        icon="pi-sign-in"
                        iconPos="right"
                        disabled={isLoginFormBtnLoading}
                        loading={isLoginFormBtnLoading}
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
            <Dialog header="Reset Password" visible={visible} onHide={() => { if (!visible) return; setVisible(false); }} className='!w-[600px] !max-w-[600px] !mx-4'>
                <form onSubmit={handleResetSubmit(handleDialogSubmit)}>
                    <div className='mb-5'>
                        <label htmlFor="resetEmail" className="block mb-2 font-medium text-gray-900">Your email</label>
                        <Controller
                            name="resetEmail"
                            control={resetControl}
                            defaultValue=""
                            rules={{
                                required: 'Email is required',
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
                            }}
                            render={({ field }) => (
                                <InputText
                                    {...field}
                                    value={resetEmail}
                                    onChange={(e) => {
                                        setResetEmail(e.target.value);
                                        field.onChange(e);
                                    }}
                                    className='!w-full'
                                    placeholder='Enter your email for reset password.'
                                />
                            )}
                        />
                        <ErrorMessage errors={resetErrors} name="resetEmail" as={<p className="text-red-500 text-sm" />} />
                        {emailResetError && (
                            emailResetError.startsWith('success:') ? (
                                <p className="text-green-500 text-sm">{emailResetError.replace('success: ', '')}</p>
                            ) : (
                                <p className="text-red-500 text-sm">{emailResetError}</p>
                            )
                        )}
                    </div>
                    <Button
                        type="submit"
                        label="Send Reset Link"
                        icon="pi-sign-in"
                        iconPos="right"
                        disabled={isResetFormBtnLoading}
                        loading={isResetFormBtnLoading}
                        className='w-full cs-button'
                    />
                </form>
            </Dialog>
        </main>
    );
};

export default Login;
