const { Router } = require("express");
const User = require("../schemas/user/UserSchema");
const { userValidationSchema } = require("../validations/registerValidation");
const { checkSchema, validationResult } = require("express-validator");
const { getCoords } = require("../middleware/coordsMiddleware");
const passport = require("../passport/strategies/local-strategy");

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
                city,
            });

            if (userObj) {
                return response.sendStatus(201);
            }
            return response.status(500).send({
                message: {
                    ukr: "Акаунт користувача не створенно",
                    eng: "No user created",
                },
            });
        } catch (error) {
            return response.status(400).json({
                message: error.message,
            });
        }
    }
);

router.post("/login", (request, response, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (!user) {
            request.logout(function(err) {
                if (err) { return next(err); }
                response.sendStatus(201);
              });
            return response.status(400).send({
                message: {
                    ukr: "Невірні облікові дані",
                    eng: "Invalid credentials",
                },
            });
        }

        if (err) {
            return response.status(500).send({
                message: {
                    ukr: "Помилка сервера при вході",
                    eng: "Server error during login",
                },
            });
        }

        request.logIn(user, (err) => {
            if (err) {
                return response.status(500).send({
                    message: {
                        ukr: "Помилка при вході користувача",
                        eng: "Error logging in user",
                    },
                });
            }

            const returnUser = {
                id: user.id,
                email: user.email,
                lang: user.lang,
                lat: user.lat,
                lng: user.lng,
                city: user.city,
            };

            return response.status(200).send(returnUser);
        });
    })(request, response, next);
});

router.get("/user", (request, response) => {
    if (request.user) {
        const returnUser = {
            id: request.user.id,
            email: request.user.email,
            lang: request.user.lang,
            lat: request.user.lat,
            lng: request.user.lng,
            city: request.user.city,
        };
        return response.status(200).send(returnUser);
    }
    return response.status(403).send({ message: "Сесія користувача не існує" });
});

module.exports = router;
