const { Router } = require("express");
const axios = require("axios");

const {
    requestPendingTime,
    convertPressure,
    formatDate,
    formatYearDate,
} = require("../utils/utils");

const BASE_URL = "https://power.larc.nasa.gov/api/temporal";
const PARAMETERS = "T2M,T2M_MAX,T2M_MIN,PRECTOTCORR,WS2M,RH2M,PS,TS,FROST_DAYS";

const router = Router();

const { climate } = require("../assets/variables");

router.get("/daily", async (request, response) => {
    const startTime = Date.now();
    const { lat, lng } = request.query;

    const today = new Date();

    const lastMonthStart = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
    )
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");

    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    lastMonthEnd.setDate(lastMonthEnd.getDate() - 3);

    const lastMonthEndFormatted = lastMonthEnd
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");

    try {
        const result = await axios.get(`${BASE_URL}/daily/point`, {
            params: {
                start: lastMonthStart,
                end: lastMonthEndFormatted,
                latitude: lat,
                longitude: lng,
                parameters: PARAMETERS,
                community: "AG",
                format: "JSON",
            },
        });

        if (!result.data.properties) {
            return response.status(204);
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
                point: { lat: lat, lng: lng },
                time: { type: "seconds", value: pendingTime },
            });
        }
    } catch (error) {
        const pendingTime = requestPendingTime(startTime);

        return response.status(500).send({
            message: "Помилка на сервері під час виконання запиту",
            time: { type: "seconds", value: pendingTime },
        });
    }
});

router.get("/years", async (request, response) => {
    const startTime = Date.now();
    const { lat, lng } = request.query;

    try {
        const monthlyResult = await axios.get(`${BASE_URL}/monthly/point`, {
            params: {
                start: 2015,
                end: 2024,
                latitude: lat,
                longitude: lng,
                parameters: `${PARAMETERS}`,
                community: "AG",
                format: "JSON",
            },
        });

        if (!monthlyResult.data) {
            return response.status(204);
        }

        const {
            properties: { parameter },
        } = monthlyResult.data;

        let averages = {};

        parameter.PS = convertPressure(parameter.PS);

        for (const [paramName, paramData] of Object.entries(parameter)) {
            for (const [date, value] of Object.entries(paramData)) {
                if (date.toString().substring(4).includes("13")) {
                    averages[paramName] = {
                        ...averages[paramName],
                        [date.substring(0, 4)]: value,
                    };
                }
            }
        }

        climate.info = { ...parameter };

        climate.info = formatYearDate(climate.info);

        climate.info.AVERAGES = { ...averages };

        if (climate.info) {
            const pendingTime = requestPendingTime(startTime);

            return response.status(200).send({
                ...climate,
                point: { lat: lat, lng: lng },
                time: { type: "seconds", value: pendingTime },
            });
        }
    } catch (error) {
        const pendingTime = requestPendingTime(startTime);

        return response.status(500).send({
            message: "Помилка на сервері під час виконання запиту",
            time: { type: "seconds", value: pendingTime },
        });
    }
});

module.exports = router;
