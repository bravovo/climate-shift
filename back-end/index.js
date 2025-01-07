const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const climateRouter = require('./routes/climateRouter');

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5173', withCredentials: true }));

const COOKIE_SECRET = process.env.COOKIE_SECRET;
const PORT = process.env.PORT || 5000;

// app.use(
//     session({
//         secret: COOKIE_SECRET,
//         saveUninitialized: false,
//         resave: false,
//         cookie: {
//             maxAge: 60000 * 60 * 2,
//             secure: false,
//         },
//     }),
// );

app.use('/api/climate', climateRouter);

app.get('/', (request, response) => {
    return response.status(200).send({ message: "API is OK" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});