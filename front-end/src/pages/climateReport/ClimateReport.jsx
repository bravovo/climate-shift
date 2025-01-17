import { useEffect, useState } from "react";
import axios from "axios";
import { useAtom, useAtomValue } from "jotai";
import { climateDataAtom, defaultCitiesAtom } from "../../atoms";
import LastMonthStats from "../../components/lastMonthStats/LastMonthStats";
import {
    StyledErrorParagraph,
    StyledInputContainer,
    StyledContainer,
    StyledComponentContainer,
    StyledInput,
    ClearInputButton,
    StyledComponentContainerExtended
} from "./ClimateReport.styles";

const ClimateReport = () => {
    const [climateData, setClimateData] = useAtom(climateDataAtom);
    const [city, setCity] = useState("");
    const [fetchedCity, setFetchedCity] = useState("Kyiv");
    const [error, setError] = useState("");
    const defaultCities = useAtomValue(defaultCitiesAtom);

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
                const { parameters, info } = response.data;
                setClimateData({
                    fetched: true,
                    parameters: parameters,
                    ...info,
                });
                setError("");
            } else {
                window.alert('За заданою локацією даних не знайдено. Спробуйте іншу локацію');
                return;
            }
            setFetchedCity(city);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 500) {
                    setError(error.response.data.message || "Помилка на сервері");
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
            <StyledComponentContainerExtended>
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
            </StyledComponentContainerExtended>
            <StyledComponentContainer>
                {climateData.fetched && (
                    <LastMonthStats fetchedCity={fetchedCity} />
                )}
            </StyledComponentContainer>
        </StyledContainer>
    );
};

export default ClimateReport;
