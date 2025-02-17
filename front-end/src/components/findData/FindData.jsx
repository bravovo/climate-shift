import { useEffect, useState } from "react";
import {
    Button,
    LangButton,
    StyledCoordsInputContainer,
    StyledInputContainer,
    UseCoordsButton,
} from "./FindData.styles";
import Input from "../input/Input";
import { useDispatch, useSelector } from "react-redux";
import { toggleLang } from "../../state/dataLang/dataLangSlice";
import PropTypes from "prop-types";
import { clearMonthly } from "../../state/monthlyClimateData/monthlyClimateDataSlice";
import { clearYears } from "../../state/yearsClimateData/yearsClimateDataSlice";
import { fetchCityName } from "../../state/coords/coordsSlice";
import { clearWeather } from "../../state/weather/weatherSlice";

const FindData = ({ langPref, onError, fetch }) => {
    const [useCoords, setUseCoords] = useState(false);
    const [latValue, setLatValue] = useState("");
    const [lngValue, setLngValue] = useState("");
    const [city, setCity] = useState("");
    const lang = useSelector((state) => state.dataLang);
    const coords = useSelector((state) => state.coords);
    const monthlyClimateData = useSelector((state) => state.monthlyClimateData);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => { 
        setLatValue(coords.lat);
        setLngValue(coords.lng);
    }, [coords]);

    const handleFindClimateDataSubmit = () => {
        if (city.length === 0) {
            onError(langPref[lang].nullCityError);
            return;
        }
        fetch(city);
    };

    const handleFindClimateByCoords = () => {
        if (latValue.length === 0 && lngValue.length === 0) {
            onError(langPref[lang].nullCoordsError);
            return;
        }
        if (!isFinite(latValue) && !isFinite(lngValue)) {
            onError(langPref[lang].invalidCoords);
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

    const handleClearInput = () => {
        setCity("");
        setLatValue("");
        setLngValue("");

        dispatch(clearMonthly());
        dispatch(clearYears());
        dispatch(clearWeather());
    };

    const handleChangeDataLang = () => {
        dispatch(toggleLang());
    };

    return (
        <>
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
                {!user.email ? <LangButton onClick={handleChangeDataLang}>
                    {lang === "eng"
                        ? "Українська"
                        : "English"}
                </LangButton> : null}
            </StyledInputContainer>
        </>
    );
};

FindData.propTypes = {
    langPref: PropTypes.objectOf(PropTypes.object).isRequired,
    onError: PropTypes.func.isRequired,
    fetch: PropTypes.func.isRequired,
};

export default FindData;
