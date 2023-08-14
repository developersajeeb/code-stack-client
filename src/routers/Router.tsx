import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../pages/Home/Home";
import Loading from "../components/Loading/Loading";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        path: '/',
        element: <Home></Home>

      },
      {
        path: 'loading',
        element: <Loading></Loading>

      },
    ]
  }

]);