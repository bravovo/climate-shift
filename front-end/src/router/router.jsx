import { Navigate, createBrowserRouter } from "react-router-dom";
import ClimateReport from "../pages/climateReport/ClimateReport";
import WeatherReport from "../pages/weatherReport/WeatherReport";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";

export const router = createBrowserRouter([
    {
        path: "/",
        index: true,
        element: <Navigate to={"/climate"} />,
    },
    {
        path: "/climate",
        element: <ClimateReport />,
    },
    {
        path: '/weather',
        element: <WeatherReport />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "*",
        element: (
            <h1>
                404 | Page not found
            </h1>
        ),
    },
]);
