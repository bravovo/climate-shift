const PRESSURE_CONVERTION = 7.50063755419211;

// Обрахунок часу виконання запиту
const requestPendingTime = (startTime) => {
    const endTime = Date.now();
    console.log("Start", startTime);
    console.log("End", endTime);
    const time = (endTime - startTime) / 1000;
    console.log(`Request duration: ${time} seconds`);

    return time;
};

// Конвертація тиску з кілопаскалів у міліметри ртутного стовбчика
const convertPressure = (pressureObject) => {
    const convertedPressureObj = {};

    for (const [date, value] of Object.entries(pressureObject)) {
        convertedPressureObj[date] = value * PRESSURE_CONVERTION;
    }

    return convertedPressureObj;
};

module.exports = { requestPendingTime, convertPressure };