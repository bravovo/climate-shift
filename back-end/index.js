const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const climateRouter = require("./routes/climateRouter");
const coordsRouter = require("./routes/coordsRouter");
const forecastRouter = require("./routes/forecastRouter");
const authRouter = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

const connectDB = require("./config/db.config");
const cookieParser = require("cookie-parser");

const app = express();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

app.use(express.json());
app.use(
    cors({ credentials: true, origin: CLIENT_ORIGIN, withCredentials: true })
);

const COOKIE_SECRET = process.env.COOKIE_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET.split(",") || [];
const PORT = process.env.PORT || 5000;

app.use(cookieParser(COOKIE_SECRET));

app.use(
    session({
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60 * 24 * 7,
            secure: false,
            httpOnly: true,
            sameSite: "Strict",
        },
    })
);

connectDB();

app.use("/api/coords", coordsRouter);
app.use("/api/climate", climateRouter);
app.use("/api/forecast", forecastRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);

app.get("/config", (request, response) => {
    response.json({
        apiKey: process.env.MAPTILER,
        lat: request.session.user ? request.session.user.lat : null,
        lng: request.session.user ? request.session.user.lng : null,
    });
});

app.get("/", (request, response) => {
    return response.status(200).send({ message: "API is OK" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
