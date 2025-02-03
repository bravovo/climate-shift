import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCurrentWeather,
    fetchForecast,
    setFetchedFalse,
} from "../../state/weather/weatherSlice";
import { fetchCoords } from "../../state/coords/coordsSlice";
import { defaultCitiesAtom } from "../../atoms";
import { useAtomValue } from "jotai";
import { LoaderWrapper } from "../climateReport/ClimateReport.styles";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";

const WeatherReport = () => {
    const coords = useSelector((state) => state.coords);
    const weather = useSelector((state) => state.weather);
    const dispatch = useDispatch();
    const defaultCities = useAtomValue(defaultCitiesAtom);

    useEffect(() => {
        if (!weather.forecast.fetched && !coords.city) {
            const cityToFetch =
                defaultCities[parseInt(Math.random() * defaultCities.length)];
            fetchData(cityToFetch);
        } else if ((coords.lat && coords.lng) && (coords.lat != weather.forecast.city) && (coords.lng != weather.forecast.lng)) {
            dispatch(setFetchedFalse());
            dispatch(fetchCurrentWeather(coords));
            dispatch(fetchForecast(coords));
        }
    }, [coords]);

    const fetchData = (city) => {
        try {
            if (!weather.forecast.fetched) {
                dispatch(fetchCoords({ city: city, depth: 0 }));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            {!weather.forecast.fetched && (
                <LoaderWrapper>
                    <BounceLoader
                        className="loader"
                        color="#000000"
                        speedMultiplier={1}
                    />
                </LoaderWrapper>
            )}
            {weather.forecast.fetched && "May the force be with you"}
            <br />
            <Link to={"/climate"}>ClimateReport</Link>
        </div>
    );
};

export default WeatherReport;
