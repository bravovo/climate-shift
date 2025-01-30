import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { defaultCitiesAtom } from "../../atoms";
import LastMonthStats from "../../components/lastMonthStats/LastMonthStats";
import {
    StyledErrorParagraph,
    StyledInputContainer,
    StyledContainer,
    StyledComponentContainer,
    StyledComponentContainerExtended,
    ChangeLangButton,
    StyledCoordsInputContainer,
    UseCoordsButton,
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
import { fetchCoords, fetchCityName } from "../../state/coords/coordsSlice";
import Input from "../../components/input/Input";
import LocationCard from "../../components/locationCard/LocationCard";

const ClimateReport = () => {
    const monthlyClimateData = useSelector((state) => state.monthlyClimateData);
    const yearsClimateData = useSelector((state) => state.yearsClimateData);
    const coords = useSelector((state) => state.coords);
    const lang = useSelector((state) => state.dataLang);
    const dispatch = useDispatch();
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const defaultCities = useAtomValue(defaultCitiesAtom);
    const [useCoords, setUseCoords] = useState(false);
    const [latValue, setLatValue] = useState("");
    const [lngValue, setLngValue] = useState("");

    useEffect(() => {
        if (!monthlyClimateData.fetched && !yearsClimateData.fetched) {
            const cityToFetch =
                defaultCities[parseInt(Math.random() * defaultCities.length)];
            fetchData(cityToFetch);
        }
    }, []);

    useEffect(() => {
        if (coords.lat && coords.lng) {
            dispatch(fetchMonthlyClimateData(coords));
            dispatch(fetchYearsClimateData(coords));
            setLatValue(coords.lat);
            setLngValue(coords.lng);
            setError('');
        } else {
            setError(coords.message || '');
        }
    }, [coords]);

    const fetchData = (city) => {
        try {
            if (
                !(city === monthlyClimateData.city) ||
                !monthlyClimateData.fetched
            ) {
                dispatch(fetchCoords(city));
            }

            setLatValue(monthlyClimateData.lat);
            setLngValue(monthlyClimateData.lng);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleFindClimateDataSubmit = () => {
        if (city.length === 0) {
            setError("Назва міста не може бути порожньою");
            return;
        }

        fetchData(city);
    };

    const handleFindClimateByCoords = () => {
        if (latValue.length === 0 && lngValue.length === 0) {
            setError("Поля для координат не повинні бути порожні");
            return;
        }
        if (!isFinite(latValue) && !isFinite(lngValue)) {
            setError("Невірно вказані координати");
            return;
        }
        if (
            !(
                latValue == monthlyClimateData.lat &&
                lngValue == monthlyClimateData.lng
            ) ||
            !monthlyClimateData.fetched
        ) {
            dispatch(fetchCityName({ lat: latValue, lng: lngValue }));
        }
    };

    const handleChangeDataLang = () => {
        dispatch(toggleLang());
    };

    const handleClearInput = () => {
        setCity("");
        setLatValue("");
        setLngValue("");

        dispatch(clearMonthly());
        dispatch(clearYears());
    };

    return (
        <StyledContainer>
            <StyledComponentContainerExtended>
                {error.length > 0 ? (
                    <StyledErrorParagraph>{error}</StyledErrorParagraph>
                ) : null}
                <UseCoordsButton
                    onClick={() => setUseCoords((prev) => !prev)}
                    $variant={useCoords}
                >
                    {useCoords
                        ? "Використовувати полe для вводу назви міста"
                        : "Використовувати поля для вводу координат"}
                </UseCoordsButton>
                <StyledInputContainer>
                    {useCoords ? (
                        <StyledCoordsInputContainer>
                            <Input
                                placeholder="Введіть широту"
                                value={latValue}
                                onChange={(value) => setLatValue(value)}
                                clear={handleClearInput}
                            />
                            <Input
                                placeholder="Введіть довготу"
                                value={lngValue}
                                onChange={(value) => setLngValue(value)}
                                clear={handleClearInput}
                            />
                        </StyledCoordsInputContainer>
                    ) : (
                        <Input
                            placeholder="Введіть назву міста"
                            value={city}
                            onChange={(value) => setCity(value)}
                            clear={handleClearInput}
                        />
                    )}
                    <button
                        onClick={
                            useCoords
                                ? handleFindClimateByCoords
                                : handleFindClimateDataSubmit
                        }
                    >
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
                {monthlyClimateData.fetched && <LocationCard />}
            </StyledComponentContainer>
            <StyledComponentContainer>
                {monthlyClimateData.fetched && <LastMonthStats />}
            </StyledComponentContainer>
            <StyledComponentContainer>
                {yearsClimateData.fetched && <YearsStats />}
            </StyledComponentContainer>
        </StyledContainer>
    );
};

export default ClimateReport;
