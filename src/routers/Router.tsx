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
import Main from "../pages/Main/Main";
import QuestionsDetails from "../components/QuestionsDetails/QuestionsDetails";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
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
        path: 'disclaimer',
        element: <Disclaimer></Disclaimer>
      },
      {
        path: 'trams-and-conditions',
        element: <TramsConditions></TramsConditions>
      },
      {
        path: 'contact-us',
        element: <ContactUs></ContactUs>
      },
      {
        path: 'my-profile',
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
            path: '/my-profile',
            element: <ProfileDashboard></ProfileDashboard>,
          },
          {
            path: 'summery',
            element: <Summery></Summery>
          },
          {
            path: 'edit-profile',
            element: <EditProfile></EditProfile>,
          },
          {
            path: 'answers',
            element: <Answers></Answers>
          },
          {
            path: 'questions',
            element: <Questions></Questions>
          },
          {
            path: 'saves',
            element: <Saves></Saves>
          },
        ]
      },
      {
        path: 'main',
        element: <PrivateRoute><Main></Main></PrivateRoute>,
        children: [
          {
            path: 'news-feed',
            element: <NewsFeed></NewsFeed>,
            loader: () => fetch('http://localhost:5000/questions')
          },
          {
            path: 'news-feed/:id',
            element: <QuestionsDetails></QuestionsDetails>,
            loader: ({ params }) => fetch(`http://localhost:5000/question-details/${params.id}`)
          },
          {
            path: 'ask-question',
            element: <AddQuestions></AddQuestions>,
          },
          {
            path: 'tagged',
            element: <TagQuestions></TagQuestions>,
            loader: () => fetch('http://localhost:5000/questions')
          },
          {
            path: 'user/:email',
            element: <SingleUser></SingleUser>,
            loader: ({ params }) => fetch(`http://localhost:5000/user?email=${params.email}`)
          },
          {
            path: 'tags',
            element: <Tag></Tag>,
            loader: () => fetch('http://localhost:5000/questions')
          },
          {
            path: 'users',
            element: <Users></Users>,
          },
          {
            path: 'edit-question/:id',
            element: <EditQuestion></EditQuestion>,
            loader: ({ params }) => fetch(`http://localhost:5000/question-details/${params.id}`)
          },
        ]
      },
      {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
          {
            path: '/dashboard',
            element: <AdminHome></AdminHome>
          },
          {
            path: "allUsers",
            element: <AllUsers></AllUsers>
          },

        ]
      },
    ]
  },
])
