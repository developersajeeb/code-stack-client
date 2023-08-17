import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Starmind from "../components/Starmind/Starmind";
import AddQuestion from "../components/Home/AddQuestion/AddQuestion";

const MainLayouts = () => {
    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Starmind></Starmind>
            <AddQuestion></AddQuestion>
        
        </>
    );
};

export default MainLayouts;