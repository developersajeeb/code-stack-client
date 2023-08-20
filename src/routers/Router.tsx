import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../pages/Home/Home";
import Loading from "../components/Loading/Loading";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NewsFeed from "../pages/NewsFeed/NewsFeed";
import AddQuestions from "../pages/AddQuestions/AddQuestions";
import MyProfile from "../pages/MyProfile/MyProfile";
// import NewsFeed from "../pages/NewsFeed/NewsFeed";

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
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'my-profile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'news-feed',
        element: <NewsFeed></NewsFeed>,
        loader: () => fetch('https://code-stack-server.vercel.app/questions')
      },
      {
        path: 'add-questions',
        element: <AddQuestions></AddQuestions>
      },
    ]
  }

]);