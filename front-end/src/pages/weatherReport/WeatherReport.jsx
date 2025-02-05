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
    IconImageStyles,
    StyledComponentContainerExtended,
    StyledErrorParagraph,
    TemperatureContainer,
    Titleh3,
    WeatherContainer,
    WeatherDescContainer,
} from "./WeatherReport.styles";
import {
    LoaderWrapper,
    StyledComponentContainer,
    StyledContainer,
} from "../../assets/styles/SharedStyles.styles";
import LocationCard from "../../components/locationCard/LocationCard";
import UpButton from "../../components/upButton/UpButton";
import { getWeatherIcon } from "../../utils/weatherIcons";

const findDatalangPref = {
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

const langPref = {
    eng: {
        humidity: "Humidity",
        feels_like: "Feels like",
    },
    ukr: {
        humidity: "Вологість",
        feels_like: "Відчувається",
    },
};

const WeatherReport = () => {
    const coords = useSelector((state) => state.coords);
    const weather = useSelector((state) => state.weather);
    const lang = useSelector((state) => state.dataLang);
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
            (coords.lat &&
                coords.lng &&
                coords.lat != weather.lat &&
                coords.lng != weather.lng) ||
            lang !== weather.lang
        ) {
            dispatch(setFetchedFalse());
            dispatch(fetchCurrentWeather({ coordinates: coords, lang: lang }));
            dispatch(fetchForecast({ coordinates: coords, lang: lang }));
            setError("");
        } else {
            setError(coords.message || "");
        }
    }, [coords, lang]);

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
                    langPref={findDatalangPref}
                    onError={(value) => setError(value)}
                    fetch={(city) => fetchData(city)}
                />
            </StyledComponentContainerExtended>
            <StyledComponentContainer>
                {weather.forecast.fetched && <LocationCard />}
            </StyledComponentContainer>
            <UpButton />
            {weather.current.fetched && (
                <WeatherContainer>
                    <WeatherDescContainer>
                        <IconImageStyles
                            src={getWeatherIcon(
                                `${weather.current.weather[0].icon}.png`
                            )}
                            alt={weather.current.weather[0].main}
                        />
                        <Titleh3>
                            {weather.current.weather[0].description
                                .charAt(0)
                                .toUpperCase() +
                                weather.current.weather[0].description.slice(1)}
                        </Titleh3>
                        <Titleh3>{weather.current.main.temp}°C</Titleh3>
                    </WeatherDescContainer>
                    <TemperatureContainer>
                        <div>
                            <Titleh3>{langPref[lang].feels_like}</Titleh3>
                            <Titleh3>
                                {weather.current.main.feels_like}°C
                            </Titleh3>
                        </div>
                        <div>
                            <Titleh3>{langPref[lang].humidity}</Titleh3>
                            <Titleh3>{weather.current.main.humidity}</Titleh3>
                        </div>
                    </TemperatureContainer>
                </WeatherContainer>
            )}
            <br />
            <Link to={"/climate"}>ClimateReport</Link>
        </StyledContainer>
    );
};

export default WeatherReport;
