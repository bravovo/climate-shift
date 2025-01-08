const { Router } = require("express");
const axios = require("axios");

const { getCoords } = require("../middleware/climateRouteMiddleware");

const BASE_URL = "https://power.larc.nasa.gov/api/temporal";

const router = Router();

router.get("/daily/point", getCoords, async (request, response) => {
    const { lat, lng } = request.decodedPlace.geometry;

    // T2M_RANGE --- Різниця між мінімальною та максимальною погодинною температурою повітря (за сухим термометром)
    // на висоті 2 метри над поверхнею землі в період, що цікавить. (C)

    // SNODP --- Глибина снігу на поверхні землі. (см)

    // CLRSKY_DAYS --- Кількість днів з ясним небом, якщо денна хмарність становить менше 10 відсотків. (день)

    // PRECSNO --- The snow precipitation at the surface of the earth. (мм/день)

    const PARAMETERS =
        "T2M,T2M_MAX,T2M_MIN,PRECTOT,WS2M,RH2M,PS,CLOUD_AMT,TS,FROST_DAYS";

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

        console.log("Climate Data ------------------------ \n", result.data);
        if (result.data) {
            return response.status(200).send({ ...result.data });
        } else {
            return response
                .status(204)
                .send({ message: "No data for request found" });
        }
    } catch (error) {
        console.error("Error fetching climate data:", error.message);
        return response
            .status(500)
            .send({ message: "Error getting climate data" });
    }
});

module.exports = router;
