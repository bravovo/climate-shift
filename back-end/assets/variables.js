const climate = {
    parameters: {
        ukr: {
            T2M: {
                units: "°C",
                longname: "Температура повітря (°C)",
                param: "T2M",
            },
            T2M_MIN: {
                units: "°C",
                longname: "Мінімальна температура повітря (°C)",
                param: "T2M_MIN",
            },
            T2M_MAX: {
                units: "°C",
                longname: "Максимальна температура повітря (°C)",
                param: "T2M_MAX",
            },
            TS: {
                units: "°C",
                longname: "Температура поверхні (°C)",
                param: "TS",
            },
            PRECTOTCORR: {
                units: "мм/день",
                longname: "Кількість опадів (мм/день)",
                param: "PRECTOTCORR",
            },
            WS2M: {
                units: "м/с",
                longname: "Швидкість вітру (м/с)",
                param: "WS2M",
            },
            RH2M: {
                units: "%",
                longname: "Вологість (%)",
                param: "RH2M",
            },
            PS: {
                units: "мм.рт.ст",
                longname: "Атмосферний тиск (мм.рт.ст)",
                param: "PS",
            },
            FROST_DAYS: {
                units: "дні",
                longname: "Морозні дні (дні)",
                param: "FROST_DAYS",
            },
            metrics: {
                max: "Максимум",
                min: "Мінімум",
                avg: "В середньому",
            },
            months: {
                "01": "Січень",
                "02": "Лютий",
                "03": "Березень",
                "04": "Квітень",
                "05": "Травень",
                "06": "Червень",
                "07": "Липень",
                "08": "Серпень",
                "09": "Вересень",
                "10": "Жовтень",
                "11": "Листопад",
                "12": "Грудень",
            },
        },
        eng: {
            T2M: {
                units: "°C",
                longname: "Temperature (°C)",
                param: "T2M",
            },
            T2M_MIN: {
                units: "°C",
                longname: "Min temperature (°C)",
                param: "T2M_MIN",
            },
            T2M_MAX: {
                units: "°C",
                longname: "Max temperature (°C)",
                param: "T2M_MAX",
            },
            TS: {
                units: "°C",
                longname: "Surface temperature (°C)",
                param: "TS",
            },
            PRECTOTCORR: {
                units: "mm/day",
                longname: "Precipitation (mm/day)",
                param: "PRECTOTCORR",
            },
            WS2M: {
                units: "m/s",
                longname: "Wind speed (m/s)",
                param: "WS2M",
            },
            RH2M: {
                units: "%",
                longname: "Humidity (%)",
                param: "RH2M",
            },
            PS: {
                units: "mm Hg",
                longname: "Surface Pressure (mm Hg)",
                param: "PS",
            },
            FROST_DAYS: {
                units: "days",
                longname: "Frost Days (days)",
                param: "FROST_DAYS",
            },
            metrics: {
                max: "Maximum",
                min: "Minimum",
                avg: "Average",
            },
            months: {
                "01": "January",
                "02": "February",
                "03": "March",
                "04": "April",
                "05": "May",
                "06": "June",
                "07": "July",
                "08": "August",
                "09": "September",
                "10": "October",
                "11": "November",
                "12": "December",
            },
        },
        years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    },
};

module.exports = { climate };