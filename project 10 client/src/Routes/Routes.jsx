import { createBrowserRouter } from "react-router";
import HomeRoot from "../Root/HomeRoot";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import Register from "../Pages/Register";
import ShareTips from "../Pages/ShareTips";
import BrowseTips from "../Pages/BrowseTips";
import TipsDetails from "../Pages/TipsDetails";
import Gardeners from "../Pages/Gardeners";
import MyTips from "../Pages/MyTips";
import UpdateTips from "../Pages/UpdateTips";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: () => fetch("/app-info.json"),
        // hydrateFallbackElement: <Loader />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/shareTips",
        element: <ShareTips />,
      },
      {
        path: "/browseTips",
        element: <BrowseTips />,
      },
      {
        path: "/tipsDetails/:id",
        element: <TipsDetails />,
      },
      {
        path: "/gardeners",
        element: <Gardeners />,
      },
      {
        path: "/myTips",
        element: <MyTips />,
      },
      {
        path: "/updateTip/:id",
        element: <UpdateTips />,
      },
    ],
  },
]);
