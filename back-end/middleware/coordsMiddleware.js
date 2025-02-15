const axios = require("axios");

const OPENCAGE_API = process.env.OPENCAGE_API_KEY;

const getCoords = async (request, response, next) => {
    const { city, lat, lng } = request.body;

    if (lat && lng) {
        request.body.lat = lat;
        request.body.lng = lng;
        console.log('COORDS HERE...');
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
            console.log('Requests remaining', opencageResponse.data.rate.remaining);
            console.log(place.formatted);
            console.log("LAT ---", place.geometry.lat);
            request.body.lat = place.geometry.lat;
            request.body.lng = place.geometry.lng;

            return next();
        } else {
            console.log("Status", opencageResponse.data.status.message);
            console.log("total_results", opencageResponse.data.total_results);
            return response.status(404).send({ message: "Міста із заданою назвою не знайдено" });
        }
    } catch (error) {
        console.log(error.message);

        if (error.response.status.code === 402) {
            console.log("hit free trial daily limit");
            return response.status(402).send({ message: 'Зараз неможливо дізнатись координати за назвою міста' });
        }
        return response.status(500).send({ message: 'Помилка на сервері' });
    }
};

module.exports = { getCoords };