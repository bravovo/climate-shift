const { Router } = require("express");
const User = require("../schemas/user/UserSchema");
const { userValidationSchema } = require("../validations/registerValidation");
const { checkSchema, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post(
    "/register",
    checkSchema(userValidationSchema),
    async (request, response) => {
        const { email, password, lang } = request.body;

        const validationRes = validationResult(request);

        if (!validationRes.isEmpty()) {
            return response.status(400).send({ errors: validationRes.array() });
        }

        try {
            const userObj = await User.create({
                email,
                password,
                lang,
                lat: -33.9288301,
                lng: 18.4172197,
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
                return response.status(201).send(request.session.user);
            } else {
                return response
                    .status(500)
                    .send({ message: "No user created" });
            }
        } catch (error) {
            console.log(error.message);
            return response.status(400).send({ message: error.message });
        }
    }
);

router.get("/status", async (request, response) => {
    if (request.session.user) {
        return response.status(200).send(request.session.user);
    } else {
        return response.sendStatus(401);
    }
});

module.exports = router;
