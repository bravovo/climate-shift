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
    StyledCoordsInputContainer,
    UseCoordsButton,
    LoaderWrapper,
    GoUpContainer,
    Button,
} from "./ClimateReport.styles";
import { BounceLoader } from "react-spinners";
import { FaAngleUp } from "react-icons/fa";

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
import { toggleLoader } from "../../state/loader/loaderSlice";
import Input from "../../components/input/Input";
import LocationCard from "../../components/locationCard/LocationCard";

const langPref = {
    eng: {
        coordsButton: "Use coords values fields",
        cityButton: "Use city value field",
        findDataButton: "Find climate data",
        cityField: "Type city name",
        coordsLat: "Type location latitude",
        coordsLng: "Type location longitude",
        nullCityError: 'City name can`t be empty',
        nullCoordsError: 'Coordinates fields can`t be empty',
        invalidCoords: "Invalid coordinates",
    },
    ukr: {
        coordsButton: "Використовувати поля для вводу координат",
        cityButton: "Використовувати поле для вводу назви міста",
        findDataButton: "Знайти кліматичні дані",
        cityField: "Введіть назву міста",
        coordsLat: "Введіть широту",
        coordsLng: "Введіть довготу",
        nullCityError: 'Назва міста не може бути порожньою',
        nullCoordsError: 'Поля для координат не можуть бути порожні',
        invalidCoords: "Невірно вказані координати",
    },
};

const ClimateReport = () => {
    const loader = useSelector((state) => state.loader);
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
    const [upButton, setUpButton] = useState(false);

    useEffect(() => {
        dispatch(toggleLoader(true));
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
            setError("");
        } else {
            setError(coords.message || "");
        }
    }, [coords]);

    useEffect(() => {
        if (yearsClimateData.fetched) {
            dispatch(toggleLoader(false));
        }
    }, [yearsClimateData]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setUpButton(true);
            } else {
                setUpButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const fetchData = (city) => {
        try {
            if (
                !(city === monthlyClimateData.city) ||
                !monthlyClimateData.fetched
            ) {
                dispatch(fetchCoords({ city: city, depth: 0 }));
            }

            setLatValue(monthlyClimateData.lat);
            setLngValue(monthlyClimateData.lng);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleFindClimateDataSubmit = () => {
        if (city.length === 0) {
            setError(langPref[lang].nullCityError);
            return;
        }
        dispatch(toggleLoader(true));
        fetchData(city);
    };

    const handleFindClimateByCoords = () => {
        if (latValue.length === 0 && lngValue.length === 0) {
            setError(langPref[lang].nullCoordsError);
            return;
        }
        if (!isFinite(latValue) && !isFinite(lngValue)) {
            setError(langPref[lang].invalidCoords);
            return;
        }
        if (
            !(
                latValue == monthlyClimateData.lat &&
                lngValue == monthlyClimateData.lng
            ) ||
            !monthlyClimateData.fetched
        ) {
            dispatch(toggleLoader(true));
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
        dispatch(toggleLoader(false));
    };

    const handleGoUpButtonClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <StyledContainer>
            {loader && (
                <LoaderWrapper>
                    <BounceLoader
                        className="loader"
                        color="#000000"
                        speedMultiplier={1}
                    />
                </LoaderWrapper>
            )}
            <StyledComponentContainerExtended>
                {error.length > 0 ? (
                    <StyledErrorParagraph>{error}</StyledErrorParagraph>
                ) : null}
                <UseCoordsButton
                    onClick={() => setUseCoords((prev) => !prev)}
                    $variant={useCoords}
                >
                    {useCoords
                        ? langPref[lang].cityButton
                        : langPref[lang].coordsButton}
                </UseCoordsButton>
                <StyledInputContainer>
                    {useCoords ? (
                        <StyledCoordsInputContainer>
                            <Input
                                placeholder={langPref[lang].coordsLat}
                                value={latValue}
                                onChange={(value) => setLatValue(value)}
                                clear={handleClearInput}
                            />
                            <Input
                                placeholder={langPref[lang].coordsLng}
                                value={lngValue}
                                onChange={(value) => setLngValue(value)}
                                clear={handleClearInput}
                            />
                        </StyledCoordsInputContainer>
                    ) : (
                        <Input
                            placeholder={langPref[lang].cityField}
                            value={city}
                            onChange={(value) => setCity(value)}
                            clear={handleClearInput}
                        />
                    )}
                    <Button
                        onClick={
                            useCoords
                                ? handleFindClimateByCoords
                                : handleFindClimateDataSubmit
                        }
                    >
                        {langPref[lang].findDataButton}
                    </Button>
                    <Button onClick={handleChangeDataLang}>
                        {lang === "eng"
                            ? "Змінити мову відображення даних"
                            : "Change data output language"}
                    </Button>
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
            {upButton && (
                <GoUpContainer onClick={handleGoUpButtonClick}>
                    <FaAngleUp size={20} />
                </GoUpContainer>
            )}
        </StyledContainer>
    );
};

export default ClimateReport;
