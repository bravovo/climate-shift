const axios = require("axios");

const OPENCAGE_API = process.env.OPENCAGE_API_KEY;

const getCoords = async (request, response, next) => {
    const { city } = request.query;
    try {
        const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${OPENCAGE_API}`
        );

        if (
            response.data.status.code === 200 &&
            response.data.results.length > 0
        ) {
            const place = response.data.results[0];
            console.log(place.formatted);
            request.decodedPlace = { ...place };
        } else {
            console.log("Status", response.data.status.message);
            console.log("total_results", response.data.total_results);
            request.decodedPlace = { ...place };
        }
    } catch (error) {
        console.log(error.message);

        if (error.status.code === 402) {
            console.log("hit free trial daily limit");
            return response.status(402).send({ message: 'Unable to get coordinates from city name' });
        }
        return response.status(500).send({ message: 'Internal server error' });
    }
    next();
};

module.exports = { getCoords };