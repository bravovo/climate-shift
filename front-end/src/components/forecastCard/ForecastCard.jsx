import {
    CardContainer,
    CardDateContainer,
    ForecastContainer,
} from "./ForecastCard.styles";
import { IconImageStyles } from "../../assets/styles/SharedStyles.styles";
import { getWeatherIcon } from "../../utils/weatherIcons";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CardParam from "../cardParam/CardParam";
import CardDate from "../cardDate/CardDate";

const langPref = {
    eng: {
        temp: "Temperature",
        humidity: "Humidity",
        wind: {
            speed: "Wind speed",
            direction: "Wind direction",
            unit: "m/s",
        },
    },
    ukr: {
        temp: "Температура",
        humidity: "Вологість",
        wind: {
            speed: "Швидкість вітру",
            direction: "Напрямок вітру",
            unit: "м/с",
        },
    },
};

const ForecastCard = () => {
    const weather = useSelector((state) => state.weather);
    const lang = useSelector((state) => state.dataLang);

    return (
        <ForecastContainer>
            {Object.entries(weather.forecast.data)
                .filter((_, index) => index !== 0)
                .map(([key, data]) => (
                    <CardContainer key={key}>
                        <CardDateContainer>
                            <CardDate
                                date={data.date}
                                icon={
                                    <IconImageStyles
                                        src={getWeatherIcon(`${data.icon}.png`)}
                                        alt={data.dominantWeather}
                                    />
                                }
                                desc={data.dominantWeather
                                    .charAt(0)
                                    .toUpperCase() +
                                    data.dominantWeather.slice(1)}
                                small={true}
                            />
                        </CardDateContainer>
                        <CardParam
                            title={langPref[lang].temp}
                            value={data.avgTemp}
                            unit="°C"
                            small={true}
                        />
                        <CardParam
                            title={langPref[lang].humidity}
                            value={data.avgHumidity}
                            small={true}
                        />
                        <CardParam
                            title={langPref[lang].wind.speed}
                            value={data.avgWindSpeed}
                            unit={langPref[lang].wind.unit}
                            small={true}
                        />
                        <CardParam
                            title={langPref[lang].wind.direction}
                            value={
                                <FaArrowLeftLong
                                    style={{
                                        transform: `rotate(${data.avgWindDirection}deg)`,
                                    }}
                                />
                            }
                            small={true}
                        />
                    </CardContainer>
                ))}
        </ForecastContainer>
    );
};

export default ForecastCard;
