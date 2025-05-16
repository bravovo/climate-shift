const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");

const climateRouter = require("./routes/climateRouter");
const coordsRouter = require("./routes/coordsRouter");
const forecastRouter = require("./routes/forecastRouter");
const authRouter = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const MongoStore = require('connect-mongo');

const connectDB = require("./config/db.config");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");

const app = express();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

app.use(express.json());
app.use(
    cors({ credentials: true, origin: CLIENT_ORIGIN })
);

app.set('trust proxy', 1);

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET.split(",") || [];
const PORT = process.env.PORT || 5000;

app.use(cookieParser(COOKIE_SECRET));

connectDB();

app.use(
    session({
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60 * 24 * 7,
            secure: IS_PRODUCTION,
            httpOnly: true,
            sameSite: IS_PRODUCTION ? "None" : "Strict",
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient()
        })
    })
);


app.use(passport.initialize());
app.use(passport.session());

app.use("/api/coords", coordsRouter);
app.use("/api/climate", climateRouter);
app.use("/api/forecast", forecastRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);

app.get("/config", (request, response) => {
    response.json({
        apiKey: process.env.MAPTILER,
        lat: request.user ? request.user.lat : null,
        lng: request.user ? request.user.lng : null,
    });
});

app.get("/", (request, response) => {
    return response.status(200).send({ message: "API is OK" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
