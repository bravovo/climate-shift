import { useEffect, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { climateDataAtom } from "../../atoms";
import ParameterCard from "../../components/parameterCard/ParameterCard";
import {
    StyledLastMonthStats,
    StyledParameterCardsContainer,
    StyledErrorParagraph,
    StyledInputContainer,
    StyledContainer,
    StyledComponentContainer,
    StyledInput,
    ClearInputButton
} from "./ClimateReport.styles";

const defaultCities = [
    "Paris",
    "Los Angeles",
    "New York",
    "London",
    "Kyiv",
    "Madrid",
    "Oslo",
    "Tokyo",
    "Canberra",
    "Cape Town",
];

const ClimateReport = () => {
    const [climateData, setClimateData] = useAtom(climateDataAtom);
    const [city, setCity] = useState("");
    const [fetchedCity, setFetchedCity] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const cityToFetch =
            defaultCities[parseInt(Math.random() * defaultCities.length)];
        setFetchedCity(cityToFetch);
        fetchCity(cityToFetch);
    }, []);

    const fetchCity = async (city) => {
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
            setFetchedCity(city);
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

    const handleFindClimateDataSubmit = async () => {
        if (city.length === 0) {
            setError("Назва міста не може бути порожньою");
            return;
        }

        fetchCity(city);
    };

    const handleClearInput = () => {
        setCity("");

        setClimateData({
            fetched: false,
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
            MAX: {},
            MIN: {},
            AVERAGES: {},
            frostDays: {},
            parameters: {},
        });
    };

    return (
        <StyledContainer>
            <StyledComponentContainer>
                {error.length > 0 ? (
                    <StyledErrorParagraph>{error}</StyledErrorParagraph>
                ) : null}
                <StyledInputContainer>
                    <div>
                        <StyledInput
                            type="text"
                            placeholder="Введіть назву міста"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <ClearInputButton onClick={handleClearInput}>X</ClearInputButton>
                    </div>
                    <button onClick={handleFindClimateDataSubmit}>
                        Знайти кліматичні дані
                    </button>
                </StyledInputContainer>
            </StyledComponentContainer>
            <StyledComponentContainer>
                {climateData.fetched && (
                    <StyledLastMonthStats>
                        <h1>
                            Статистика за минулий місяць{" "}
                            {climateData.fetched ? `для ${fetchedCity}` : null}
                        </h1>
                        <StyledParameterCardsContainer>
                            <ParameterCard
                                property="temp"
                                parameters={["T2M"]}
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
                        </StyledParameterCardsContainer>
                    </StyledLastMonthStats>
                )}
            </StyledComponentContainer>
        </StyledContainer>
    );
};

export default ClimateReport;
