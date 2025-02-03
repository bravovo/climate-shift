import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { defaultCitiesAtom } from "../../atoms";
import LastMonthStats from "../../components/lastMonthStats/LastMonthStats";
import {
    StyledErrorParagraph,
    StyledContainer,
    StyledComponentContainer,
    StyledComponentContainerExtended,
    LoaderWrapper,
    GoUpContainer,
} from "./ClimateReport.styles";
import { BounceLoader } from "react-spinners";
import { FaAngleUp } from "react-icons/fa";

import {
    fetchMonthlyClimateData,
} from "../../state/monthlyClimateData/monthlyClimateDataSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchYearsClimateData,
} from "../../state/yearsClimateData/yearsClimateDataSlice";
import YearsStats from "../../components/yearsStats/YearsStats";
import { fetchCoords } from "../../state/coords/coordsSlice";
import { toggleLoader } from "../../state/loader/loaderSlice";
import LocationCard from "../../components/locationCard/LocationCard";
import { Link } from "react-router-dom";
import FindData from "../../components/findData/FindData";

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
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const defaultCities = useAtomValue(defaultCitiesAtom);
    const [upButton, setUpButton] = useState(false);

    useEffect(() => {
        dispatch(toggleLoader(true));
        if ((!monthlyClimateData.fetched && !yearsClimateData.fetched) && !coords.city) {
            const cityToFetch =
                defaultCities[parseInt(Math.random() * defaultCities.length)];
            fetchData(cityToFetch);
        }
    }, []);

    useEffect(() => {
        if ((coords.lat && coords.lng) && (coords.lat != yearsClimateData.city) && (coords.lng != yearsClimateData.lng)) {
            dispatch(fetchMonthlyClimateData(coords));
            dispatch(fetchYearsClimateData(coords));
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

        } catch (error) {
            setError(error.message);
        }
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
                <FindData langPref={langPref} onError={(value) => setError(value)} fetch={(city) => fetchData(city)} />
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
            <Link to={'/weather'}>WeatherReport</Link>
        </StyledContainer>
    );
};

export default ClimateReport;
