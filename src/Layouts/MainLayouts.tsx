import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import NewsProtal from "../components/NewsProtral/NewsProtal";

const MainLayouts = () => {
    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <NewsProtal></NewsProtal>
            <Footer></Footer>

        </>
    );
};

export default MainLayouts;