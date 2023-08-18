import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import AddQuestion from "../components/Home/AddQuestion/AddQuestion";

const MainLayouts = () => {
    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <AddQuestion />
        </>
    );
};

export default MainLayouts;