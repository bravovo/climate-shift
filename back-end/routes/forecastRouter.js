const { Router } = require("express");
const axios = require("axios");
const { requestPendingTime } = require("../utils/utils");

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

const router = Router();

router.get("/", async (request, response) => {
    const startTime = Date.now();
    const { lat, lng, lang } = request.query;

    try {
        const openWeatherResponse = await axios.get(
            "https://api.openweathermap.org/data/2.5/forecast",
            {
                params: {
                    lat: lat,
                    lon: lng,
                    units: "metric",
                    lang: lang,
                    appid: OPEN_WEATHER_API_KEY,
                },
            }
        );

        if (!openWeatherResponse) {
            return response.sendStatus(204);
        }

        const dateForecast = {};

        for (const data of Object.values(openWeatherResponse.data.list)) {
            const date = data.dt_txt.split(" ")[0];

            if (!dateForecast[date]) {
                dateForecast[date] = {
                    temp: [],
                    humidity: [],
                    weatherDesc: {},
                    windSpeed: [],
                    windDirection: [],
                    icon: data.weather[0].icon,
                };
            }

            dateForecast[date].temp.push(data.main.temp);
            dateForecast[date].humidity.push(data.main.humidity);
            dateForecast[date].windSpeed.push(data.wind.speed);
            dateForecast[date].windDirection.push(data.wind.deg);

            const weatherMain = data.weather[0].description;

            dateForecast[date].weatherDesc[weatherMain] =
                (dateForecast[date].weatherDesc[weatherMain] || 0) + 1;
        }

        const forecast = Object.keys(dateForecast).map((date) => {
            const day = dateForecast[date];

            const avgTemp = (
                day.temp.reduce((sum, curr) => sum + curr, 0) / day.temp.length
            ).toFixed(1);

            const avgHumidity = (
                day.humidity.reduce((sum, curr) => sum + curr, 0) /
                day.humidity.length
            ).toFixed(1);

            const dominantWeather = Object.entries(day.weatherDesc).reduce(
                (max, curr) => (curr[1] > max[1] ? curr : max)
            )[0];

            const avgWindSpeed = (
                day.windSpeed.reduce((sum, curr) => sum + curr, 0) /
                day.windSpeed.length
            ).toFixed(1);

            const avgWindDirection = (
                day.windDirection.reduce((sum, curr) => sum + curr, 0) /
                day.windDirection.length
            ).toFixed();

            return {
                date,
                avgTemp,
                avgHumidity,
                dominantWeather,
                avgWindSpeed,
                avgWindDirection,
                icon: day.icon,
            };
        });

        const pendingTime = requestPendingTime(startTime);

        return response
            .status(200)
            .send({
                forecast: forecast,
                time: { type: "seconds", value: pendingTime },
            });
    } catch (error) {
        console.log(error.message);
        if (error.response) {
            return response
                .status(400)
                .send({ message: "Something went wrong" });
        } else {
            return response
                .status(500)
                .send({ message: "Internal server error" });
        }
    }
});

module.exports = router;
