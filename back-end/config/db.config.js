const mongoose = require('mongoose');

const databaseURI = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(databaseURI, {});
    } catch (error) {
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(1);
    }
};

module.exports = connectDB;