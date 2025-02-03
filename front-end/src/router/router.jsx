import { Navigate, createBrowserRouter } from "react-router-dom";
import ClimateReport from "../pages/climateReport/ClimateReport";
import WeatherReport from "../pages/weatherReport/WeatherReport";

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
        path: "*",
        element: (
            <h1>
                404 | Ви завітали на сторінку, якої не існує. Будь ласка виберіть іншу.
            </h1>
        ),
    },
]);
