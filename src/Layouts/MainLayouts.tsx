import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
<<<<<<< HEAD
import AddQuestion from "../components/Home/AddQuestion/AddQuestion";
=======
import Footer from "../components/Footer/Footer";
>>>>>>> b43f3ed018745ba4f06e9ebcbd49f2be6247051e

const MainLayouts = () => {
    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
<<<<<<< HEAD
            <AddQuestion />
=======
            <Footer></Footer>
>>>>>>> b43f3ed018745ba4f06e9ebcbd49f2be6247051e
        </>
    );
};

export default MainLayouts;