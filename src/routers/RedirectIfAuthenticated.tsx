import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user, loading } = authContext;

    if (loading) {
        return <div className='h-screen flex justify-center items-center'>
            <div className="w-12 h-12 rounded-full animate-spin border-x-8 border-solid border-[#33B89F] border-t-transparent"></div>
        </div>
      }

    if (user) {
        return <Navigate to="/news-feed" />;
    }
    return children;
};

export default RedirectIfAuthenticated;