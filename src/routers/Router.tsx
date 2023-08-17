import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../components/Pages/Home";
import Login from "../components/Pages/Login/Login";
import Register from "../components/Pages/Register/Register";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts></MainLayouts>,
      children:[
        {
          path: '/',
          element: <Home />
        },
        {
          path:'/login',
          element:<Login></Login>
      },
      {
          path:'/register',
          element:<Register></Register>
      },
      ]
    },
   
  ]);