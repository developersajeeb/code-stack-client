import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Starmind from "../components/Starmind/Starmind";
import Discover from "../components/Discover/Discover";

const MainLayouts = () => {
    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Starmind></Starmind>
            <Discover></Discover>
        </>
    );
};

export default MainLayouts;