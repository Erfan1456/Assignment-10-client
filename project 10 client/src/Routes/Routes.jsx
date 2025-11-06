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
import PrivateRoutes from "./PrivateRoutes";
import Loader from "../Utilities/Loader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          try {
            // Fetch all three JSON files in parallel
            const [bannerRes, calendarRes, ecoRes] = await Promise.all([
              fetch("/assets/banner-info.json"),
              fetch("/assets/calender-Info.json"),
              fetch("/assets/eco-info.json"),
            ]);

            // Check if all responses are okay
            if (!bannerRes.ok || !calendarRes.ok || !ecoRes.ok) {
              throw new Error("One or more JSON files failed to load");
            }

            // Convert all responses to JSON
            const [bannerInfo, calenderInfo, ecoInfo] = await Promise.all([
              bannerRes.json(),
              calendarRes.json(),
              ecoRes.json(),
            ]);

            // Return all data to your Home component
            return { bannerInfo, calenderInfo, ecoInfo };
          } catch (error) {
            console.error("Error loading JSON data:", error);
            // Return fallback empty data to avoid breaking the app
            return { bannerInfo: [], calenderInfo: [], ecoInfo: [] };
          }
        },
        hydrateFallbackElement: <Loader />,
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
        element: (
          <PrivateRoutes>
            <ShareTips />
          </PrivateRoutes>
        ),
      },
      {
        path: "/browseTips",
        element: <BrowseTips />,
      },
      {
        path: "/tipsDetails/:id",
        element: (
          <PrivateRoutes>
            <TipsDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/gardeners",
        element: <Gardeners />,
      },
      {
        path: "/myTips",
        element: (
          <PrivateRoutes>
            <MyTips />
          </PrivateRoutes>
        ),
      },
      {
        path: "/updateTip/:id",
        element: <UpdateTips />,
      },
    ],
  },
]);
