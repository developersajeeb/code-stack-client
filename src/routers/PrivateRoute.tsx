
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../components/Pages/Provider/AuthProvider';
import { useContext } from 'react';

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    let location=useLocation()

    if(loading){
        return <><div className='mt-10 text-center'><progress className="progress w-56 mt-10 text-center"></progress></div></>
     }

    if(user){
        return children
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;