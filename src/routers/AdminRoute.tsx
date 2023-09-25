import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { ReactNode, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

interface PrivateRouteProps {
    children: ReactNode;
}

const AdminRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const authContext   = useContext(AuthContext);
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user, loading } = authContext;
    const {isAdmin, isAdminLoading} = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="h-screen flex justify-center items-center">
            <span className="loading loading-dots w-20"></span>
        </div>
    }
    if (user && isAdmin) {
        return children;
    }

    return <Navigate to='/404' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;