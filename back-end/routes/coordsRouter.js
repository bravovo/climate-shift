const { Router } = require('express');
const axios = require('axios');

const OPENCAGE_API = process.env.OPENCAGE_API_KEY;

const { requestPendingTime } = require('../utils/utils');

const router = Router();

router.get("/coords", async (request, response) => {
    const startTime = Date.now();
    const { city, depth } = request.query;
    try {
        const opencageResponse = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${OPENCAGE_API}`
        );

        if (
            opencageResponse.data.status.code === 200 &&
            opencageResponse.data.results.length > 0
        ) {
            const resultsCount = opencageResponse.data.results.length;
            let place;
            if (depth > resultsCount - 1) {
                const pendingTime = requestPendingTime(startTime);
                return response.status(404).send({
                    message: "Більше схожих результатів не знайдено",
                    time: { type: "seconds", value: pendingTime },
                });
            } else {
                place = opencageResponse.data.results[depth];
            }
            console.log(
                "Requests remaining",
                opencageResponse.data.rate.remaining
            );
            console.log(place.formatted);
            const pendingTime = requestPendingTime(startTime);
            return response.status(200).send({
                geometry: place.geometry,
                country: place.components.country,
                city: city,
                results: { total: resultsCount, current: parseInt(depth) },
                time: { type: "seconds", value: pendingTime },
            });
        } else {
            console.log("Status", opencageResponse.data.status.message);
            console.log("total_results", opencageResponse.data.total_results);
            const pendingTime = requestPendingTime(startTime);
            return response.status(404).send({
                message: "Міста із заданою назвою не знайдено",
                time: { type: "seconds", value: pendingTime },
            });
        }
    } catch (error) {
        console.log(error.message);

        const endTime = Date.now();
        console.log(
            `Request duration: ${(endTime - startTime) / 1000} seconds`
        );

        if (error.response && error.response.status.code === 402) {
            console.log("hit free trial daily limit");
            return response.status(402).send({
                message: "Зараз неможливо дізнатись координати за назвою міста",
            });
        }
        return response.status(500).send({ message: "Помилка на сервері" });
    }
});

router.get("/city", async (request, response) => {
    const { lat, lng } = request.query;

    const startTime = Date.now();
    try {
        const opencageResponse = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API}`
        );

        if (
            opencageResponse.data.status.code === 200 &&
            opencageResponse.data.results.length > 0
        ) {
            const place = opencageResponse.data.results[0];
            console.log(
                "Requests remaining",
                opencageResponse.data.rate.remaining
            );
            console.log(place.components.city);
            const pendingTime = requestPendingTime(startTime);
            return response.status(200).send({
                city: place.components.city,
                country: place.components.country,
                results: { total: 1, current: 0 },
                time: { type: "seconds", value: pendingTime },
            });
        } else {
            console.log("Status", opencageResponse.data.status.message);
            console.log("total_results", opencageResponse.data.total_results);
            const pendingTime = requestPendingTime(startTime);
            return response.status(404).send({
                message: "Міста із заданими координатами не знайдено",
                time: { type: "seconds", value: pendingTime },
            });
        }
    } catch (error) {
        console.log(error.message);

        const endTime = Date.now();
        console.log(
            `Request duration: ${(endTime - startTime) / 1000} seconds`
        );

        if (error.response.status.code === 402) {
            console.log("hit free trial daily limit");
            return response.status(402).send({
                message: "Зараз неможливо дізнатись координати за назвою міста",
            });
        }
        return response.status(500).send({ message: "Помилка на сервері" });
    }
});

module.exports = router;