import { createBrowserRouter } from "react-router";
import HomeRoot from "../Root/HomeRoot";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";

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
    ],
  },
]);
