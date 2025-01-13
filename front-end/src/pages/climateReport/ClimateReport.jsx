import { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { climateDataAtom } from "../../atoms";
import ParameterCard from "../../components/parameterCard/ParameterCard";

const ClimateReport = () => {
    const [climateData, setClimateData] = useAtom(climateDataAtom);
    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    const handleFindClimateDataSubmit = async () => {
        if (city.length === 0) {
            setError("Назва міста не може бути порожньою");
            return;
        }

        try {
            const response = await axios.get(
                "http://localhost:5000/api/climate/daily",
                {
                    params: {
                        city: city,
                    },
                }
            );

            if (response.status === 200) {
                console.log(response.data);
                const { parameters, info } = response.data;
                setClimateData({
                    fetched: true,
                    parameters: parameters,
                    ...info,
                });
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
                {climateData.fetched && (
                    <div>
                        <h1>Статистика за минулий місяць</h1>
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <ParameterCard
                                property="temp"
                                parameters={["T2M", "T2M_MAX", "T2M_MIN"]}
                            />
                            <ParameterCard
                                property="surfaceTemp"
                                parameters={["TS"]}
                            />
                            <ParameterCard
                                property="windSpeed"
                                parameters={["WS2M"]}
                            />
                            <ParameterCard
                                property="pressure"
                                parameters={["PS"]}
                            />
                            <ParameterCard
                                property="precipitation"
                                parameters={["PRECTOTCORR"]}
                            />
                            <ParameterCard
                                property="humidity"
                                parameters={["RH2M"]}
                            />
                            <ParameterCard
                                property="frostDays"
                                parameters={["FROST_DAYS"]}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClimateReport;
