const { Router } = require("express");
const User = require("../schemas/user/UserSchema");
const { userValidationSchema } = require("../validations/registerValidation");
const { checkSchema, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { getCoords } = require("../middleware/coordsMiddleware");

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

module.exports = router;
