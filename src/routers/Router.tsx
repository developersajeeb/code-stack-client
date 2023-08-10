import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import NewsProtal from "../components/NewsProtral/NewsProtal";
import Footer from "../components/Footer/Footer";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts></MainLayouts>,
    
    },

  ]);