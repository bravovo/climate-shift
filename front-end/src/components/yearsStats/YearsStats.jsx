import { useSelector } from "react-redux";
import ClimateChart from "../climateChart/ClimateChart";

const YearsStats = () => {
    const yearsClimateData = useSelector((state) => state.yearsClimateData);

    return yearsClimateData.fetched && <div><ClimateChart/></div>;
}

export default YearsStats;