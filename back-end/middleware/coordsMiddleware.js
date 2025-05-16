const axios = require("axios");

const OPENCAGE_API = process.env.OPENCAGE_API_KEY;

const getCoords = async (request, response, next) => {
    const { city, lat, lng } = request.body;

    if (lat && lng) {
        request.body.lat = lat;
        request.body.lng = lng;
        try {
            const opencageResponse = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API}`
            );

            if (
                opencageResponse.data.status.code === 200 &&
                opencageResponse.data.results.length > 0
            ) {
                const place = opencageResponse.data.results[0];
                request.body.city = place.components.city;
            } else {
                return response.status(404).send({
                    message: "Міста із заданими координатами не знайдено",
                });
            }
        } catch (error) {
            if (error.response.status.code === 402) {
                return response.status(402).send({ message: 'Зараз неможливо дізнатись місто за координатами' });
            }
            return response.status(500).send({ message: 'Помилка на сервері' });
        }
        return next();
    }

    try {
        const opencageResponse = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${OPENCAGE_API}`
        );

        if (
            opencageResponse.data.status.code === 200 &&
            opencageResponse.data.results.length > 0
        ) {
            const place = opencageResponse.data.results[0];
            request.body.lat = place.geometry.lat;
            request.body.lng = place.geometry.lng;

            return next();
        } else {
            return response.status(404).send({ message: "Міста із заданою назвою не знайдено" });
        }
    } catch (error) {
        if (error.response.status.code === 402) {
            return response.status(402).send({ message: 'Зараз неможливо дізнатись координати за назвою міста' });
        }
        return response.status(500).send({ message: 'Помилка на сервері' });
    }
};

module.exports = { getCoords };