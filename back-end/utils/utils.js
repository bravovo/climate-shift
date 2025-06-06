const PRESSURE_CONVERTION = 7.50063755419211;

// Обрахунок часу виконання запиту
const requestPendingTime = (startTime) => {
    const endTime = Date.now();
    const time = (endTime - startTime) / 1000;

    return time;
};

// Конвертація тиску з кілопаскалів у міліметри ртутного стовбчика
const convertPressure = (pressureObject) => {
    const convertedPressureObj = {};

    for (const [date, value] of Object.entries(pressureObject)) {
        convertedPressureObj[date] = parseFloat(
            (value * PRESSURE_CONVERTION).toFixed(2)
        );
    }

    return convertedPressureObj;
};

// Форматування дати з формату YYYYMMDD у формат DD.MM.YYYY
const formatDate = (climateData) => {
    const formatted = {};

    for (const [paramName, paramData] of Object.entries(climateData)) {
        formatted[paramName] = Object.entries(paramData).reduce(
            (acc, [date, value]) => {
                const year = paramData.date.slice(0, 4);
                const month = paramData.date.slice(4, 6);
                const day = paramData.date.slice(6, 8);
                const formattedDate = `${day}.${month}.${year}`;
                acc = { date: formattedDate, value: value };
                return acc;
            },
            {}
        );
    };

    return {
        ...formatted,
    };
};

// Форматування дати з формату YYYYMM у формат MM.YYYY
const formatYearDate = (climateData) => {
    const formatted = {};

    for (const [paramName, paramData] of Object.entries(climateData)) {
        const formattedData = {};

        for (const [date, value] of Object.entries(paramData)) {
            const year = date.slice(0, 4);
            const month = date.slice(4, 6);

            if (month !== "13") {
                const formattedDate = `${month}.${year}`;
                formattedData[formattedDate] = value;
            }
        }

        formatted[paramName] = formattedData;
    };

    return formatted;
};

module.exports = {
    requestPendingTime,
    convertPressure,
    formatDate,
    formatYearDate,
};
