
import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {

    const authContext   = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user, loading } = authContext;

    const location = useLocation()

    if (loading) {
        return <div className='h-screen flex justify-center items-center'>
            <div className="w-12 h-12 rounded-full animate-spin border-x-8 border-solid border-[#33B89F] border-t-transparent"></div>
        </div>
    }

    if (user) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;