const { Router } = require("express");
const axios = require("axios");

const { getCoords } = require("../middleware/climateRouteMiddleware");

const BASE_URL = "https://power.larc.nasa.gov/api/temporal";

const router = Router();

const CONVERTION = 7.50063755419211;

router.get("/daily/point", getCoords, async (request, response) => {
    const { lat, lng } = request.decodedPlace.geometry;
    const { startTime } = request.startTime;

    // T2M_RANGE --- Різниця між мінімальною та максимальною погодинною температурою повітря (за сухим термометром)
    // на висоті 2 метри над поверхнею землі в період, що цікавить. (C)

    // SNODP --- Глибина снігу на поверхні землі. (см)

    // CLRSKY_DAYS --- Кількість днів з ясним небом, якщо денна хмарність становить менше 10 відсотків. (день)

    // PRECSNO --- The snow precipitation at the surface of the earth. (мм/день)

    const PARAMETERS = "T2M,T2M_MAX,T2M_MIN,PRECTOT,WS2M,RH2M,PS,TS,FROST_DAYS";

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

    console.log(`LAT --- ${lat}; LNG --- ${lng}`);

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
            return response
                .status(204)
                .send({ message: "No data for request found" });
        }

        console.log("Climate Data ------------------------ \n", result.data);

        const {
            properties: { parameter },
        } = result.data;

        let maxPrec = { date: "", value: -Infinity };
        let maxTempMax = { date: "", value: -Infinity };
        let maxWindSpeed = { date: "", value: -Infinity };
        let maxSurfaceTemp = { date: "", value: -Infinity };

        let minTempMin = { date: "", value: Infinity };
        let minSurfaceTemp = { date: "", value: Infinity };

        let convertedPressure = {};

        let frostDays = 0;

        let t2mSum = 0;
        let tsSum = 0;
        let ws2mSum = 0;
        let psSum = 0;
        let rh2mSum = 0;

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
                        convertedPressure[date] = value * CONVERTION;
                        psSum = psSum + value * CONVERTION;
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

        result.data.properties.parameter.PS = convertedPressure;

        result.data.properties.parameter.MAX = {
            PRECTOTCORR: maxPrec,
            T2M_MAX: maxTempMax,
            WS2M: maxWindSpeed,
            TS: maxSurfaceTemp,
        };

        result.data.properties.parameter.MIN = {
            T2M_MIN: minTempMin,
            TS: minSurfaceTemp,
        };

        result.data.properties.parameter.frostDays = frostDays;

        result.data.properties.parameter.AVERAGES = {
            T2M: averageT2M,
            TS: averageTS,
            WS2M: averageWS2M,
            PS: averagePS,
            RH2M: averageRH2M,
        };

        if (result.data) {
            const endTime = Date.now();
            console.log("Start", startTime);
            console.log("End", endTime);
            const time = (endTime - startTime) / 1000;
            console.log(
                `Request duration: ${time} seconds`
            );
            
            return response.status(200).send({ ...result.data, time: { type: 'seconds', value: time } });
        }
    } catch (error) {
        console.error("Error fetching climate data:", error.message);

        const endTime = performance.now();
        console.log(`Request duration: ${(endTime - startTime) / 1000 } seconds`);

        return response
            .status(500)
            .send({ message: "Error getting climate data" });
    }
});

module.exports = router;
