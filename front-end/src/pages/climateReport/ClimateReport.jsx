import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { defaultCitiesAtom } from "../../atoms";
import LastMonthStats from "../../components/lastMonthStats/LastMonthStats";
import {
    StyledErrorParagraph,
    StyledInputContainer,
    StyledContainer,
    StyledComponentContainer,
    StyledInput,
    ClearInputButton,
    StyledComponentContainerExtended,
    ChangeLangButton,
} from "./ClimateReport.styles";

import {
    fetchMonthlyClimateData,
    clearMonthly,
} from "../../state/monthlyClimateData/monthlyClimateDataSlice";
import { toggleLang } from "../../state/dataLang/dataLangSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchYearsClimateData,
    clearYears,
} from "../../state/yearsClimateData/yearsClimateDataSlice";
import YearsStats from "../../components/yearsStats/YearsStats";
import { fetchCoords } from "../../state/coords/coordsSlice";

const ClimateReport = () => {
    const monthlyClimateData = useSelector((state) => state.monthlyClimateData);
    const yearsClimateData = useSelector((state) => state.yearsClimateData);
    const coords = useSelector((state) => state.coords);
    const lang = useSelector((state) => state.dataLang);
    const dispatch = useDispatch();
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const defaultCities = useAtomValue(defaultCitiesAtom);

    useEffect(() => {
        if (!monthlyClimateData.fetched && !yearsClimateData.fetched) {
            const cityToFetch =
                defaultCities[parseInt(Math.random() * defaultCities.length)];
            fetchData(cityToFetch);
        }
    }, []);

    useEffect(() => {
        if (coords.lat && coords.lng) {
            console.log(coords);
            dispatch(fetchMonthlyClimateData(coords));
            dispatch(fetchYearsClimateData(coords));
        }
    }, [coords]);

    const fetchData = (city) => {
        try {
            if (!(city === yearsClimateData.city) || !yearsClimateData.fetched) {
                dispatch(fetchCoords(city));
            }

            setError("");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleFindClimateDataSubmit = async () => {
        if (city.length === 0) {
            setError("Назва міста не може бути порожньою");
            return;
        }

        fetchData(city);
    };

    const handleChangeDataLang = () => {
        dispatch(toggleLang());
    };

    const handleClearInput = () => {
        setCity("");

        dispatch(clearMonthly());
        dispatch(clearYears());
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
                        <ClearInputButton onClick={handleClearInput}>
                            X
                        </ClearInputButton>
                    </div>
                    <button onClick={handleFindClimateDataSubmit}>
                        Знайти кліматичні дані
                    </button>
                    <ChangeLangButton onClick={handleChangeDataLang}>
                        {lang === "eng"
                            ? "Змінити мову відображення даних"
                            : "Change data output language"}
                    </ChangeLangButton>
                </StyledInputContainer>
            </StyledComponentContainerExtended>
            <StyledComponentContainer>
                {monthlyClimateData.fetched && (
                    <LastMonthStats fetchedCity={monthlyClimateData.city} />
                )}
            </StyledComponentContainer>
            <StyledComponentContainer>
                {yearsClimateData.fetched && <YearsStats />}
            </StyledComponentContainer>
        </StyledContainer>
    );
};

export default ClimateReport;
