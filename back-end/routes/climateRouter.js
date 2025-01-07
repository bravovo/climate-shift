const { Router } = require("express");
const axios = require("axios");

const { getCoords } = require('../middleware/climateRouteMiddleware');

const BASE_URL = "https://power.larc.nasa.gov/api/temporal";

const router = Router();

router.get("/daily/point", getCoords, async (request, response) => {
    const { lat, lng } = request.decodedPlace.geometry;

    const START_DATE = "20230101";
    const END_DATE = "20230131"; 
    const PARAMETERS = "T2M,PRECTOT"; 

    console.log(`LAT --- ${lat}; LNG --- ${lng}`);

    try {
        const result = await axios.get(`${BASE_URL}/daily/point`, {
            params: {
                start: START_DATE,
                end: END_DATE,
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
            return response.status(204).send({message: 'No data for request found'});
        }
    } catch (error) {
        console.error("Error fetching climate data:", error.message);
        return response.status(500).send({ message: "Error getting climate data" });
    }
});

module.exports = router;
