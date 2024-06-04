import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";


const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authContext   = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { googleSignIn, githubSignIn } = authContext;

    const from = location.state?.from?.pathname || '/ news-feed';

    const handleGoogleSingIn = () => {
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
                    })
            })
    }

    const handleGithubSingIn = () => {
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
                    })
            })
    }
    return (
        <div className='flex gap-5 justify-center'>
            <img onClick={handleGoogleSingIn} className='w-8 cursor-pointer' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png" alt="" />
            <img onClick={handleGithubSingIn} className='w-8 cursor-pointer' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png" alt="" />
        </div>
    );
};

export default SocialLogin;