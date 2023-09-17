import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
<<<<<<< HEAD
import NewsProtal from "../components/NewsProtral/NewsProtal";
=======
>>>>>>> 76e8e2b8879a6af9ac1aee0726ecfbfd9a9e367e

const MainLayouts = () => {
    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
<<<<<<< HEAD
            <NewsProtal></NewsProtal>
            <Footer></Footer>

=======
            <Footer></Footer>
            
>>>>>>> 76e8e2b8879a6af9ac1aee0726ecfbfd9a9e367e
        </>
    );
};

export default MainLayouts;