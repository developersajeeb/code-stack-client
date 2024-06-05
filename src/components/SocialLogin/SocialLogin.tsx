import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import googleLogo from '../../assets/icons/google-logo.png';
import githubLogo from '../../assets/icons/github-logo.png';


const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authContext   = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { googleSignIn, githubSignIn, setLoading } = authContext;

    const from = location.state?.from?.pathname || '/news-feed';

    const handleGoogleSingIn = () => {
        setLoading(true);
        googleSignIn()
            .then((result: { user: any; }) => {
                console.log(result.user);
    
                const loggedInUser = result.user;
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, role: 'normalUser', imgURL: loggedInUser.photoURL }
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(result => result.json())
                    .then(() => {
                        Swal.fire(
                            'Welcome Back!',
                            'You have successfully entered the website.',
                            'success'
                        )
                        navigate(from, { replace: true });
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error saving user:", error);
                        setLoading(false);
                    });
            })
            .catch((error) => {
                // if (error.code === 'auth/popup-closed-by-user') {
                    
                // } else {
                //     console.error("Error during Google sign-in:", error);
                // }
                setLoading(false);
            });
    }
    
    const handleGithubSingIn = () => {
        setLoading(true);
        githubSignIn()
            .then((result: { user: any; }) => {
                console.log(result.user);
    
                const loggedInUser = result.user;
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser?.email, role: 'user', photo: loggedInUser.photoURL }
                
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        Swal.fire(
                            'Welcome Back!',
                            'You have successfully entered the website',
                            'success'
                        )
                        navigate(from, { replace: true });
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error saving user:", error);
                        setLoading(false);
                    });
            })
            .catch((error) => {
                // if (error.code === 'auth/popup-closed-by-user') {
                //     console.log("Popup closed by user");
                // } else {
                //     console.error("Error during GitHub sign-in:", error);
                // }
                setLoading(false);
            });
    }
    
    return (
        <div className='flex gap-5 justify-center'>
            <img onClick={handleGoogleSingIn} className='w-8 cursor-pointer' src={googleLogo} alt="" />
            <img onClick={handleGithubSingIn} className='w-8 cursor-pointer' src={githubLogo} alt="" />
        </div>
    );
};

export default SocialLogin;