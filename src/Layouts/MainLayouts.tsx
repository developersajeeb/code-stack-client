import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const MainLayouts = () => {
    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </>
    );
};

export default MainLayouts;