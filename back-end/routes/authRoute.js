const { Router } = require("express");
const User = require("../schemas/user/UserSchema");
const { userValidationSchema } = require("../validations/registerValidation");
const { checkSchema, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { getCoords } = require("../middleware/coordsMiddleware");
const bcrypt = require("bcrypt");

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post(
    "/register",
    getCoords,
    checkSchema(userValidationSchema),
    async (request, response) => {
        const { email, password, lang, lat, lng } = request.body;

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
            });

            console.log(userObj);

            if (userObj) {
                const token = jwt.sign(
                    { id: userObj._id.toString() },
                    JWT_SECRET
                );
                response.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "Strict",
                    maxAge: 60000 * 60 * 24 * 7,
                    signed: true,
                });
                request.session.user = {
                    email: userObj.email,
                    lang: userObj.lang,
                    lat: userObj.lat,
                    lng: userObj.lng,
                };
                request.session.save(() => {
                    response.status(201).send(request.session.user);
                });
                return;
            } else {
                return response
                    .status(500)
                    .send({ message: "No user created" });
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
                .send({ message: "Неправильно введені дані для входу" });
        }

        bcrypt.compare(password, user.password, (err, data) => {
            if (err) {
                throw new Error("Помилка під час порівняння паролів");
            }

            if (data) {
                const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);

                response.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "Strict",
                    maxAge: 60000 * 60 * 24 * 7,
                    signed: true,
                });

                request.session.user = {
                    email: user.email,
                    lang: user.lang,
                    lat: user.lat,
                    lng: user.lng,
                };
            } else {
                console.log("INVALID PASSWORD");
                return response.status(400).send({message: "Неправильно введені дані для входу"});
            }

            request.session.save(() => {
                response.status(200).send(request.session.user);
            });
            return;
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

module.exports = router;
