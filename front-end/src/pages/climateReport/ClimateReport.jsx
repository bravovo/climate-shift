import { useState } from "react";
import axios from "axios";

const ClimateReport = () => {
    const [climateData, setClimateData] = useState({
        PRECTOTCORR: {},
        T2M_MAX: {},
        T2M_MIN: {},
        T2M: {},
        WS2M: {},
        RH2M: {},
        PS: {},
        CLOUD_AMT: {},
        TS: {},
        FROST_DAYS: {},
    });
    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    const handleFindClimateDataSubmit = async () => {
        if (city.length === 0) {
            setError("Назва міста не може бути порожньою");
            return;
        }

        try {
            const response = await axios.get(
                "http://localhost:5000/api/climate/daily/point",
                {
                    params: {
                        city: city,
                    },
                }
            );

            if (response.status === 200) {
                console.log(response.data);
                const {
                    properties: {
                        parameter: { PRECTOTCORR, T2M, T2M_MAX, T2M_MIN, WS2M, RH2M, PS, CLOUD_AMT, TS, FROST_DAYS },
                    },
                } = response.data;
                setClimateData({ PRECTOTCORR, T2M, T2M_MAX, T2M_MIN, WS2M, RH2M, PS, CLOUD_AMT, TS, FROST_DAYS });
                setError("");
            } else {
                console.log(response.status, response.data.message);
            }
        } catch (error) {
            console.log(error.message);
            if (error.response) {
                if (error.response.status === 500) {
                    setError("Помилка на сервері");
                } else {
                    setError(
                        error.response.data.message || "Щось пішло не так"
                    );
                }
            } else {
                setError(error.message || "Щось пішло не так");
            }
        }
    };

    return (
        <div>
            <div>
                {error.length > 0 ? <p>{error}</p> : null}
                <input
                    type="text"
                    placeholder="Введіть назву міста"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleFindClimateDataSubmit}>
                    Знайти кліматичні дані
                </button>
            </div>
            <div>
                <div>
                    <h1>Середня добова температура</h1>
                    {Object.entries(climateData.T2M).map(([data, temp]) => {
                        return (
                            <p key={data}>
                                {data} : {temp}°C
                            </p>
                        );
                    })}
                </div>
                <div>
                    <h1>Кількість опадів</h1>
                    {Object.entries(climateData.PRECTOTCORR).map(([data, prec]) => {
                        return (
                            <p key={data}>
                                {data} : {prec} мм/день
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ClimateReport;
