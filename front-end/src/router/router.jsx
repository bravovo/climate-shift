import { Navigate, createBrowserRouter } from "react-router-dom";
import ClimateReport from "../pages/climateReport/ClimateReport";

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
        path: "*",
        element: (
            <h1>
                404 | Ви завітали на сторінку, якої не існує. Будь ласка виберіть іншу.
            </h1>
        ),
    },
]);
