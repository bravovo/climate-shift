import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCurrentWeather,
    fetchForecast,
    setFetchedFalse,
} from "../../state/weather/weatherSlice";
import { fetchCoords } from "../../state/coords/coordsSlice";
import { defaultCitiesAtom } from "../../atoms";
import { useAtomValue } from "jotai";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";
import FindData from "../../components/findData/FindData";
import {
    StyledComponentContainerExtended,
    StyledErrorParagraph,
} from "./WeatherReport.styles";
import { LoaderWrapper, StyledComponentContainer, StyledContainer } from "../../assets/styles/SharedStyles.styles";
import LocationCard from "../../components/locationCard/LocationCard";
import UpButton from "../../components/upButton/UpButton";

const langPref = {
    eng: {
        coordsButton: "Use coords values fields",
        cityButton: "Use city value field",
        findDataButton: "Find weather data",
        cityField: "Type city name",
        coordsLat: "Type location latitude",
        coordsLng: "Type location longitude",
        nullCityError: "City name can`t be empty",
        nullCoordsError: "Coordinates fields can`t be empty",
        invalidCoords: "Invalid coordinates",
    },
    ukr: {
        coordsButton: "Використовувати поля для вводу координат",
        cityButton: "Використовувати поле для вводу назви міста",
        findDataButton: "Знайти погодні дані",
        cityField: "Введіть назву міста",
        coordsLat: "Введіть широту",
        coordsLng: "Введіть довготу",
        nullCityError: "Назва міста не може бути порожньою",
        nullCoordsError: "Поля для координат не можуть бути порожні",
        invalidCoords: "Невірно вказані координати",
    },
};

const WeatherReport = () => {
    const coords = useSelector((state) => state.coords);
    const weather = useSelector((state) => state.weather);
    const dispatch = useDispatch();
    const defaultCities = useAtomValue(defaultCitiesAtom);
    const [error, setError] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    useEffect(() => {
        if (!weather.forecast.fetched && !coords.city) {
            const cityToFetch =
                defaultCities[parseInt(Math.random() * defaultCities.length)];
            fetchData(cityToFetch);
        } else if (
            coords.lat &&
            coords.lng &&
            coords.lat != weather.lat &&
            coords.lng != weather.lng
        ) {
            dispatch(setFetchedFalse());
            dispatch(fetchCurrentWeather(coords));
            dispatch(fetchForecast(coords));
            setError("");
        } else {
            setError(coords.message || "");
        }
    }, [coords]);

    const fetchData = (city) => {
        try {
            if (!(city === coords.city) || !weather.forecast.fetched) {
                dispatch(fetchCoords({ city: city, depth: 0 }));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <StyledContainer>
            {weather.forecast.loading && (
                <LoaderWrapper>
                    <BounceLoader
                        className="loader"
                        color="#000000"
                        speedMultiplier={1}
                    />
                </LoaderWrapper>
            )}
            <StyledComponentContainerExtended>
                {error.length > 0 ? (
                    <StyledErrorParagraph>{error}</StyledErrorParagraph>
                ) : null}
                <FindData
                    langPref={langPref}
                    onError={(value) => setError(value)}
                    fetch={(city) => fetchData(city)}
                />
            </StyledComponentContainerExtended>
            <StyledComponentContainer>
                {weather.forecast.fetched && <LocationCard/>}
            </StyledComponentContainer>
            <UpButton />
            {weather.forecast.fetched && "May the force be with you"}
            <br />
            <Link to={"/climate"}>ClimateReport</Link>
        </StyledContainer>
    );
};

export default WeatherReport;
