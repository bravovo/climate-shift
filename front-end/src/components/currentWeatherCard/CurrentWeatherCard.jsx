import { useSelector } from "react-redux";
import {
    IconImageStyles,
    ParametersContainer,
    StyledParametersContainer,
    Titleh3,
    ValueTitleh3,
    WeatherContainer,
    WeatherDescContainer,
} from "./CurrentWeatherCard.styles";

import { getWeatherIcon } from "../../utils/weatherIcons";
import { FaArrowLeftLong } from "react-icons/fa6";
import CurrentCardParam from "../currentCardParam/CurrentCardParam";

const PRESSURE_CONVERTION = 7.50063755419211 / 10;

const langPref = {
    eng: {
        humidity: "Humidity",
        feels_like: "Feels like",
        wind: {
            speed: "Wind speed",
            direction: "Wind direction",
            unit: "m/s",
        },
        pressure: {
            title: "Pressure",
            unit: "mm Hg",
        },
        sunrise: "Sunrise",
        sunset: "Sunset",
    },
    ukr: {
        humidity: "Вологість",
        feels_like: "Відчувається",
        wind: {
            speed: "Швидкість вітру",
            direction: "Напрямок вітру",
            unit: "м/с",
        },
        pressure: {
            title: "Атмосферний тиск",
            unit: "мм.рт.ст",
        },
        sunrise: "Схід Сонця",
        sunset: "Захід сонця",
    },
};

const CurrentWeatherCard = () => {
    const current = useSelector((state) => state.weather.current);
    const lang = useSelector((state) => state.dataLang);

    const convertPressure = (hPa) => {
        return (hPa * PRESSURE_CONVERTION).toFixed(2);
    };

    const convertTime = (unixValue) => {
        const millis = new Date(unixValue * 1000);
        return millis.toLocaleString("en-GB").split(",")[1];
    };

    return (
        <WeatherContainer>
            <WeatherDescContainer>
                <IconImageStyles
                    src={getWeatherIcon(`${current.weather[0].icon}.png`)}
                    alt={current.weather[0].main}
                />
                <Titleh3>
                    {current.weather[0].description.charAt(0).toUpperCase() +
                        current.weather[0].description.slice(1)}
                </Titleh3>
                <ValueTitleh3>{current.main.temp} °C</ValueTitleh3>
            </WeatherDescContainer>
            <StyledParametersContainer>
                <ParametersContainer>
                    <CurrentCardParam
                        title={langPref[lang].feels_like}
                        value={current.main.feels_like}
                        unit="°C"
                    />
                    <CurrentCardParam
                        title={langPref[lang].humidity}
                        value={current.main.humidity}
                    />
                </ParametersContainer>
                <ParametersContainer>
                    <CurrentCardParam
                        title={langPref[lang].wind.speed}
                        value={current.wind.speed}
                        unit={langPref[lang].wind.unit}
                    />
                    <CurrentCardParam
                        title={langPref[lang].wind.direction}
                        value={
                            <FaArrowLeftLong
                                style={{
                                    transform: `rotate(${current.wind.deg}deg)`,
                                    fontSize: "1.1em",
                                }}
                            />
                        }
                    />
                </ParametersContainer>
                <ParametersContainer>
                    <CurrentCardParam
                        title={langPref[lang].pressure.title}
                        value={convertPressure(current.main.pressure)}
                        unit={langPref[lang].pressure.unit}
                    />
                </ParametersContainer>
                <ParametersContainer>
                    <CurrentCardParam
                        title={langPref[lang].sunrise}
                        value={convertTime(current.sys.sunrise)}
                    />
                    <CurrentCardParam
                        title={langPref[lang].sunset}
                        value={convertTime(current.sys.sunset)}
                    />
                </ParametersContainer>
            </StyledParametersContainer>
        </WeatherContainer>
    );
};

export default CurrentWeatherCard;
