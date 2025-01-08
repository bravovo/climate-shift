import { createBrowserRouter } from "react-router-dom";
import ClimateReport from "../pages/climateReport/ClimateReport";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Hello world</h1>,
    },
    {
        path: "/climate",
        element: <ClimateReport/>,
    },
]);
