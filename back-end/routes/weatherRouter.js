const { Router } = require('express');
const axios = require('axios');

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

const router = Router();

router.get('/current', async (request, response) => { 
    const { lat, lng } = request.query;

    try {
        const openWeatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat: lat,
                lon: lng,
                units: "metric",
                lang: 'uk',
                appid: OPEN_WEATHER_API_KEY
            }
        });

        if (openWeatherResponse) {
            return response.status(200).send(openWeatherResponse.data);
        } else {
            return response.status(204);
        }
    } catch (error) {
        console.log(error.message);
        if (error.response) {
            return response(400).send({ message: error.response.message });
        } else {
            return response.status(500).send({ message: 'Internal server error' });
        }
    }
});

router.get('/forecast', async (request, response) => { 
    const { lat, lng } = request.query;

    try {
        const openWeatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                lat: lat,
                lon: lng,
                units: "metric",
                lang: 'uk',
                appid: OPEN_WEATHER_API_KEY,
            }
        });

        if (openWeatherResponse) {
            return response.status(200).send(openWeatherResponse.data);
        } else {
            return response.status(204);
        }
    } catch (error) {
        console.log(error.message);
        if (error.response) {
            return response(400).send({ message: error.response.message });
        } else {
            return response.status(500).send({ message: 'Internal server error' });
        }
    }
});

module.exports = router;