const { Router, response, request } = require("express");
const User = require("../schemas/user/UserSchema");
const { checkSchema, validationResult } = require("express-validator");
const { modifyValidationSchema } = require("../validations/modifyValidation");
const axios = require("axios");

const OPENCAGE_API = process.env.OPENCAGE_API_KEY;

const router = Router();

const checkAuth = (request, response, next) => {
    if (!request.session.user) {
        return response.status(401).send({ message: "Unauthorized" });
    }
    return next();
};

router.patch(
    "/modify",
    checkAuth,
    checkSchema(modifyValidationSchema),
    async (request, response) => {
        console.log(request.body);

        const { lang, city, lat, lng } = request.body;
        const validationRes = validationResult(request);

        if (!validationRes.isEmpty() && lat && lng) {
            return response.status(400).send({ errors: validationRes.array() });
        }

        let newCity = city || request.session.user.city;
        let newLat = lat || request.session.user.lat;
        let newLng = lng || request.session.user.lng;

        try {
            if (city && (!lat || !lng)) {
                const opencageResponse = await axios.get(
                    `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${OPENCAGE_API}`
                );

                if (
                    opencageResponse.data.status.code === 200 &&
                    opencageResponse.data.results.length > 0
                ) {
                    const place = opencageResponse.data.results[0];
                    console.log(
                        "Requests remaining:",
                        opencageResponse.data.rate.remaining
                    );
                    console.log("City Coordinates:", place.geometry);

                    newLat = place.geometry.lat;
                    newLng = place.geometry.lng;
                } else {
                    console.log("Status", opencageResponse.data.status.message);
                    return response.status(404).send({
                        message: "City not found",
                    });
                }
            } else if (!city && lat && lng) {
                const opencageResponse = await axios.get(
                    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API}`
                );

                if (
                    opencageResponse.data.status.code === 200 &&
                    opencageResponse.data.results.length > 0
                ) {
                    const place = opencageResponse.data.results[0];
                    console.log(
                        "Requests remaining:",
                        opencageResponse.data.rate.remaining
                    );
                    console.log("City:", place.components.city);

                    newCity = place.components.city || "";
                } else {
                    console.log("Status", opencageResponse.data.status.message);
                    return response.status(404).send({
                        message: "City not found for given coordinates",
                    });
                }
            }
        } catch (error) {
            console.error(error.message);

            if (error.response?.status === 402) {
                console.log("Hit OpenCage free trial daily limit");
                return response.status(402).send({
                    message: "Cannot retrieve location data at the moment",
                });
            }
            return response.status(500).send({ message: "Server error" });
        }

        try {
            const user = await User.findByIdAndUpdate(
                request.session.user.id,
                {
                    lang: lang || request.session.user.lang,
                    city: newCity,
                    lat: newLat,
                    lng: newLng,
                },
                { new: true }
            );

            if (!user) {
                return response.status(400).send({ message: "User not found" });
            }

            request.session.user = {
                id: user.id,
                email: user.email,
                lang: user.lang,
                city: user.city,
                lat: user.lat,
                lng: user.lng,
            };

            request.session.save(() => {
                console.log("Updated session:", request.session.user);
                response.status(200).send(request.session.user);
            });
        } catch (error) {
            console.error(error);
            return response
                .status(500)
                .send({ message: "Internal server error" });
        }
    }
);

module.exports = router;
