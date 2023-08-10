import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Starmind from "../components/Starmind/Starmind";

const MainLayouts = () => {
    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Starmind></Starmind>
        </>
    );
};

export default MainLayouts;