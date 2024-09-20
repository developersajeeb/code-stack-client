import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NewsFeed from "../pages/NewsFeed/NewsFeed";
import AddQuestions from "../pages/AddQuestions/AddQuestions";
import MyProfile from "../pages/MyProfile/MyProfile";
import PrivateRoute from "./PrivateRoute";
import ProfileDashboard from "../pages/ProfileDashboard/ProfileDashboard";
import Summery from "../pages/Summery/Summery";
import EditProfile from "../pages/EditProfile/EditProfile";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import Tag from "../pages/Tags/Tag";
import SingleUser from "../pages/SingleUser/SingleUser";
import TagQuestions from "../pages/TagQuestions/TagQuestions";
import Answers from "../pages/Answers/Answers";
import Questions from "../pages/Questions/Questions";
import Users from "../pages/Users/Users";
import Disclaimer from "../pages/Disclaimer/Disclaimer";
import TramsConditions from "../pages/TramsConditions/TramsConditions";
import ContactUs from "../pages/ContactUs/ContactUs";
import Saves from "../pages/Saves/Saves";
import EditQuestion from "../pages/EditQuestion/EditQuestion";
import AddPost from "../pages/Dashboard/AddPost/AddPost";
import AdminRoute from "./AdminRoute";
import Main from "../pages/Main/Main";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";
import QuestionsDetails from "../pages/QuestionsDetails/QuestionsDetails";
import Badges from "../pages/Badges/Badges";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <RedirectIfAuthenticated><Home/></RedirectIfAuthenticated>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'register',
        element: <Register/>
      },
      {
        path: 'disclaimer',
        element: <Disclaimer/>
      },
      {
        path: 'trams-and-conditions',
        element: <TramsConditions/>
      },
      {
        path: 'contact-us',
        element: <ContactUs/>
      },
      {
        path: 'my-profile',
        element: <PrivateRoute><MyProfile/></PrivateRoute>,
        errorElement: <ErrorPage/>,
        children: [
          {
            path: '/my-profile',
            element: <ProfileDashboard/>,
          },
          {
            path: 'summery',
            element: <Summery/>,
          },
          {
            path: 'edit-profile',
            element: <EditProfile/>,
          },
          {
            path: 'answers',
            element: <Answers/>
          },
          {
            path: 'questions',
            element: <Questions/>
          },
          {
            path: 'saves',
            element: <Saves/>
          },
        ]
      },
      {
        path: '/',
        element: <PrivateRoute><Main/></PrivateRoute>,
        children: [
          {
            path: 'news-feed',
            element: <NewsFeed/>,
            loader: () => fetch('http://localhost:5000/questions')
          },
          {
            path: 'news-feed/:id',
            element: <QuestionsDetails/>,
            loader: ({ params }) => fetch(`http://localhost:5000/question-details/${params.id}`)
          },
          {
            path: 'ask-question',
            element: <AddQuestions/>,
          },
          {
            path: 'tagged',
            element: <TagQuestions/>,
          },
          {
            path: 'user/:username',
            element: <SingleUser/>,
            loader: ({ params }) => fetch(`http://localhost:5000/user-by-username?username=${params.username}`)
          },
          {
            path: 'tags',
            element: <Tag/>,
          },
          {
            path: 'users',
            element: <Users/>,
          },
          {
            path: 'edit-question/:id',
            element: <EditQuestion/>,
            loader: ({ params }) => fetch(`http://localhost:5000/question-details/${params.id}`)
          },
          {
            path: '/badges',
            element: <Badges/>
          }
        ]
      },
      {
        path: 'dashboard',
        element: <PrivateRoute><AdminRoute><DashboardLayout/></AdminRoute></PrivateRoute>,
        children: [
          {
            path: '/dashboard',
            element: <AdminHome/>
          },
          {
            path: "allUsers",
            element: <AllUsers/>
          },
          {
            path: 'edit-profile',
            element: <EditProfile/>,
          },
          {
            path: 'add-post',
            element: <AddPost/>,
          }
        ]
      },
    ]
  },
])
