const { Router } = require("express");
const User = require("../schemas/user/UserSchema");
const { userValidationSchema } = require("../validations/registerValidation");
const { checkSchema, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { getCoords } = require("../middleware/coordsMiddleware");
const bcrypt = require("bcrypt");

const router = Router();

router.post(
    "/register",
    getCoords,
    checkSchema(userValidationSchema),
    async (request, response) => {
        const { email, password, lang, lat, lng, city } = request.body;

        const validationRes = validationResult(request);

        if (!validationRes.isEmpty()) {
            return response.status(400).send({ errors: validationRes.array() });
        }

        try {
            const userObj = await User.create({
                email,
                password,
                lang,
                lat,
                lng,
                city
            });

            console.log(userObj);

            if (userObj) {
                request.session.user = {
                    id: userObj.id,
                    email: userObj.email,
                    lang: userObj.lang,
                    lat: userObj.lat,
                    lng: userObj.lng,
                    city: userObj.city
                };
                request.session.save(() => {
                    response.status(201).send(request.session.user);
                });
                return;
            } else {
                return response
                    .status(500)
                    .send({ message: { ukr: 'Акаунт користувача не створенно', eng: "No user created" } });
            }
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                message: error.message,
            });
        }
    }
);

router.post("/login", async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            console.log('USER NOT FOUND');
            return response
                .status(400)
                .send({ message: { ukr: 'Неправильно введені дані для входу', eng: "Invalid email or password" } });
        }

        const matchedPasswords = await bcrypt.compare(password, user.password);

        if (matchedPasswords) {
            request.session.user = {
                id: user.id,
                email: user.email,
                lang: user.lang,
                lat: user.lat,
                lng: user.lng,
                city: user.city
            };
        } else {
            console.log("INVALID PASSWORD");
            return response.status(400).send({ message: { ukr: 'Неправильно введені дані для входу', eng: "Invalid email or password" } });
        }

        request.session.save(() => {
            return response.status(200).send(request.session.user);
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.get('/user', (request, response) => { 
    console.log("USER SESSION ---", request.session.user);
    if (request.session.user) {
        return response.status(200).send(request.session.user);
    }
    return response.status(403).send({ message: "Сесія користувача не існує" });
});

module.exports = router;
