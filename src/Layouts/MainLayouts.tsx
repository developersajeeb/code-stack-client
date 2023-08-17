import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MainLayouts = () => {
    return (
        <>
         <ToastContainer></ToastContainer>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </>
    );
};

export default MainLayouts;