const { Router } = require("express");
const axios = require("axios");

const { getCoords } = require("../middleware/climateRouteMiddleware");
const { requestPendingTime, convertPressure, formatDate } = require("../utils/utils");

const BASE_URL = "https://power.larc.nasa.gov/api/temporal";
const PARAMETERS = "T2M,T2M_MAX,T2M_MIN,PRECTOTCORR,WS2M,RH2M,PS,TS,FROST_DAYS";

const router = Router();

const climate = {
    parameters: {
        ukr: {
            "temp": {
                "units": "°C",
                "longname": "Температура повітря"
            },
            "surfaceTemp": {
                "units": "°C",
                "longname": "Температура поверхні"
            },
            "precipitation": {
                "units": "мм/день",
                "longname": "Кількість опадів"
            },
            "windSpeed": {
                "units": "м/с",
                "longname": "Швидкість вітру"
            },
            "humidity": {
                "units": "%",
                "longname": "Вологість"
            },
            "pressure": {
                "units": "мм.рт.ст",
                "longname": "Атмосферний тиск"
            },
            "frostDays": {
                "units": "дні",
                "longname": "Морозні дні"
            },
            "metrics": {
                "max": "Максимум",
                "min": "Мінімум",
                "avg": "В середньому",
            },
        },
        eng: {
            "temp": {
                "units": "°C",
                "longname": "Temperature"
            },
            "surfaceTemp": {
                "units": "°C",
                "longname": "Surface temperature"
            },
            "precipitation": {
                "units": "mm/day",
                "longname": "Precipitation"
            },
            "windSpeed": {
                "units": "m/s",
                "longname": "Wind speed"
            },
            "humidity": {
                "units": "%",
                "longname": "Humidity"
            },
            "pressure": {
                "units": "mm Hg",
                "longname": "Surface Pressure"
            },
            "frostDays": {
                "units": "days",
                "longname": "Frost Days"
            },
            "metrics": {
                "max": "Maximum",
                "min": "Minimum",
                "avg": "Average",
            },
        },
    },
};

router.get("/daily", getCoords, async (request, response) => {
    const { lat, lng } = request.decodedPlace.geometry;
    const { startTime } = request.startTime;

    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthStart = lastMonth
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");
    const lastMonthEnd = new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth() + 1,
        0
    )
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");

    try {
        const result = await axios.get(`${BASE_URL}/daily/point`, {
            params: {
                start: lastMonthStart,
                end: lastMonthEnd,
                latitude: lat,
                longitude: lng,
                parameters: PARAMETERS,
                community: "AG",
                format: "JSON",
            },
        });

        if (!result.data) {
            const pendingTime = requestPendingTime(startTime);

            return response
                .status(204)
                .send({
                    message: "No data for request found",
                    time: { type: "seconds", value: pendingTime },
                });
        }

        let {
            properties: { parameter },
        } = result.data;

        let maxPrec = { date: "", value: -Infinity };
        let maxTempMax = { date: "", value: -Infinity };
        let maxWindSpeed = { date: "", value: -Infinity };
        let maxSurfaceTemp = { date: "", value: -Infinity };

        let minTempMin = { date: "", value: Infinity };
        let minSurfaceTemp = { date: "", value: Infinity };

        let frostDays = 0;

        let t2mSum = 0;
        let tsSum = 0;
        let ws2mSum = 0;
        let psSum = 0;
        let rh2mSum = 0;

        const convertedPressure = convertPressure(parameter.PS);

        parameter = { ...parameter, PS: convertedPressure };

        for (const [paramName, paramData] of Object.entries(parameter)) {
            for (const [date, value] of Object.entries(paramData)) {
                switch (paramName) {
                    case "PRECTOTCORR":
                        if (value > maxPrec.value) {
                            maxPrec = { date, value };
                        }
                        break;
                    case "T2M":
                        t2mSum = t2mSum + value;
                        break;
                    case "T2M_MAX":
                        if (value > maxTempMax.value) {
                            maxTempMax = { date, value };
                        }
                        break;
                    case "T2M_MIN": {
                        if (value < minTempMin.value) {
                            minTempMin = { date, value };
                        }
                        break;
                    }
                    case "WS2M":
                        ws2mSum = ws2mSum + value;
                        if (value > maxWindSpeed.value) {
                            maxWindSpeed = { date, value };
                        }
                        break;
                    case "TS":
                        tsSum = tsSum + value;
                        if (value > maxSurfaceTemp.value) {
                            maxSurfaceTemp = { date, value };
                        }
                        if (value < minSurfaceTemp.value) {
                            minSurfaceTemp = { date, value };
                        }
                        break;
                    case "FROST_DAYS":
                        frostDays = frostDays + value;
                        break;
                    case "PS":
                        psSum = psSum + value;
                        break;
                    case "RH2M":
                        rh2mSum = rh2mSum + value;
                        break;
                }
            }
        }

        const averageT2M = t2mSum / Object.keys(parameter.T2M).length;
        const averageTS = tsSum / Object.keys(parameter.TS).length;
        const averageWS2M = ws2mSum / Object.keys(parameter.WS2M).length;
        const averagePS = psSum / Object.keys(parameter.PS).length;
        const averageRH2M = rh2mSum / Object.keys(parameter.RH2M).length;

        climate.info = { ...parameter };
        
        climate.info.MAX = {
            PRECTOTCORR: maxPrec,
            T2M: maxTempMax,
            WS2M: maxWindSpeed,
            TS: maxSurfaceTemp,
        };

        climate.info.MIN = {
            T2M: minTempMin,
            TS: minSurfaceTemp,
        };

        climate.info.frostDays = frostDays;

        climate.info.AVERAGES = {
            T2M: parseFloat(averageT2M.toFixed(2)),
            TS: parseFloat(averageTS.toFixed(2)),
            WS2M: parseFloat(averageWS2M.toFixed(2)),
            PS: parseFloat(averagePS.toFixed(2)),
            RH2M: parseFloat(averageRH2M.toFixed(2)),
        };

        climate.info.MAX = formatDate(climate.info.MAX);
        climate.info.MIN = formatDate(climate.info.MIN);

        if (climate.info) {
            const pendingTime = requestPendingTime(startTime);

            return response.status(200).send({
                ...climate,
                time: { type: "seconds", value: pendingTime },
            });
        }
    } catch (error) {
        console.error("Error fetching climate data:", error.message);

        const pendingTime = requestPendingTime(startTime);

        return response
            .status(500)
            .send({
                message: "Error getting climate data",
                time: { type: "seconds", value: pendingTime },
            });
    }
});

router.get("/years", getCoords, async (request, response) => {
    const { lat, lng } = request.decodedPlace.geometry;
    const { startTime } = request.startTime;

    // Кліматичні дані доступні лише до 31 грудня 2023 року станом на 10.01.2025
    // const today = new Date();
    // const currentYear = new Date(today.getFullYear(), today.getMonth());

    // const startYear = new Date(currentYear.getFullYear() - 7, currentYear.getMonth());
    // const endYear = new Date(currentYear.getFullYear() - 2, currentYear.getMonth());

    // const start = startYear.toISOString().split('-')[0];
    // const end = endYear.toISOString().split('-')[0];

    try {
        const monthlyResult = await axios.get(`${BASE_URL}/monthly/point`, {
            params: {
                start: 2014,
                end: 2023,
                latitude: lat,
                longitude: lng,
                parameters: PARAMETERS,
                community: "AG",
                format: "JSON",
            },
        });

        if (!monthlyResult.data) {
            const pendingTime = requestPendingTime(startTime);

            return response
                .status(204)
                .send({
                    message: "No data for request found",
                    time: { type: "seconds", value: pendingTime },
                });
        }

        // Кліматологічні дані, де наведені середні значення за певну кількість років (5 у цьому випадку)
        // const climatologyResult = await axios.get(`${BASE_URL}/climatology/point`, {
        //     params: {
        //         start: 2018,
        //         end: 2023,
        //         latitude: lat,
        //         longitude: lng,
        //         parameters: PARAMETERS,
        //         community: "AG",
        //         format: "JSON",
        //     },
        // });

        const {
            properties: { parameter },
        } = monthlyResult.data;

        let averages = {};

        for (const [paramName, paramData] of Object.entries(parameter)) {
            for (const [date, value] of Object.entries(paramData)) {
                if (date.toString().substring(4).includes("13")) {
                    averages[paramName] = {
                        ...averages[paramName],
                        [date]: value,
                    };
                }
            }
        }

        const convertedPressure = convertPressure(averages.PS);

        averages = { ...averages, PS: convertedPressure };
        console.log("AVERAGES ---", averages);

        monthlyResult.data.properties.parameter.AVERAGES = { ...averages };

        if (monthlyResult.data) {
            const pendingTime = requestPendingTime(startTime);

            return response
                .status(200)
                .send({
                    ...monthlyResult.data,
                    time: { type: "seconds", value: pendingTime },
                });
        }
    } catch (error) {
        console.error("Error fetching climate data:", error.message);

        const pendingTime = requestPendingTime(startTime);

        return response
            .status(500)
            .send({
                message: "Error getting climate data",
                time: { type: "seconds", value: pendingTime },
            });
    }
});

module.exports = router;
