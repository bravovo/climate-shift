import { useEffect, useState } from "react";
import {
    Input,
    LoaderWrapper,
    StyledContainer,
} from "../../assets/styles/SharedStyles.styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import {
    Button,
    ButtonContainer,
    Coords,
    InfoContainer,
    InfoParamContainer,
    InfoParamTitle,
    LocationContainer,
    StyledHr,
    Titleh2,
    UseCoordsButton,
} from "./Profile.styles";
import Select from "../../components/select/Select";
import axios from "axios";
import { checkUserExist } from "../../state/user/userSlice";
import { BounceLoader } from "react-spinners";

const langPref = {
    eng: {
        title: "Profile",
        email: "Email",
        dataLang: "Website language",
        location: "Default location",
        lat: "Latitude",
        lng: "Longitude",
        saveButton: "Save changes",
        cancel: "Cancel",
        coordsButton: "Use coords values fields",
        cityButton: "Use city value field",
    },
    ukr: {
        title: "Профіль",
        email: "Електронна пошта",
        dataLang: "Мова веб-сайту",
        location: "Локація за замовчуванням",
        lat: "Широта",
        lng: "Довгота",
        saveButton: "Зберегти зміни",
        cancel: "Скасувати",
        coordsButton: "Використовувати поля для вводу координат",
        cityButton: "Використовувати поле для вводу назви міста",
    },
};

const Profile = () => {
    const user = useSelector((state) => state.user);
    const lang = user.lang || "ukr";
    const [loading, setLoading] = useState(false);

    const [langValue, setLangValue] = useState(user.lang || "ukr");
    const [cityValue, setCityValue] = useState(user.city || "");
    const [latValue, setLatValue] = useState(user.lat || "");
    const [lngValue, setLngValue] = useState(user.lng || "");

    const [saveButton, setSaveButton] = useState(false);
    const [useCoords, setUseCoords] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserExist());
    }, [dispatch]);

    useEffect(() => {
        if (!user.id) {
            navigate("/register");
        }
    }, [user, navigate]);

    useEffect(() => {
        setSaveButton(hasChanged());
    }, [langValue, cityValue, latValue, lngValue]);

    const handleChange = async () => {
        setLoading(true);

        const updatedData = {};

        const isCityChanged = cityValue !== user.city;
        const isLatChanged = latValue !== user.lat;
        const isLngChanged = lngValue !== user.lng;

        if (isLatChanged || isLngChanged) {
            updatedData.lat = latValue;
            updatedData.lng = lngValue;
        } else if (isCityChanged) {
            updatedData.city = cityValue;
        }

        if (langValue !== user.lang) {
            updatedData.lang = langValue;
        }

        if (Object.keys(updatedData).length === 0) {
            setLoading(false);
            return;
        }

        try {
            const serverResponse = await axios.patch(
                "http://localhost:5000/api/user/modify",
                updatedData,
                { withCredentials: true }
            );

            if (serverResponse.data) {
                window.location.reload();
            } else {
                console.log("EMPTY RESPONSE", serverResponse);
            }
        } catch (error) {
            window.alert(error.response.data.errors[0].msg[lang] || error.message);
            if (error.response && error.response.status === 401) {
                navigate("/register");
            }
        }
        setLoading(false);
    };

    const hasChanged = () => {
        if (
            !(langValue === user.lang) ||
            !(cityValue === user.city) ||
            !(latValue == user.lat) ||
            !(lngValue == user.lng)
        ) {
            return true;
        }
        return false;
    };

    const handleClear = () => {
        setCityValue(user.city);
        setLangValue(user.lang);
        setLatValue(user.lat);
        setLngValue(user.lng);
    };

    return (
        <StyledContainer>
            {(loading || user.loading) && (
                <LoaderWrapper>
                    <BounceLoader
                        className="loader"
                        color="#000000"
                        speedMultiplier={1}
                    />
                </LoaderWrapper>
            )}
            <Sidebar />
            <Titleh2>{langPref[lang].title}</Titleh2>
            <StyledHr />
            <InfoContainer>
                <InfoParamContainer>
                    <InfoParamTitle>{langPref[lang].email}</InfoParamTitle>
                    <Input
                        disabled={true}
                        placeholder={user.email}
                        style={{ cursor: "not-allowed" }}
                    />
                </InfoParamContainer>
                <InfoParamContainer>
                    <InfoParamTitle>{langPref[lang].dataLang}</InfoParamTitle>
                    <Select
                        onChange={(value) =>
                            setLangValue(value === "Українська" ? "ukr" : "eng")
                        }
                        data={[
                            lang === "ukr" ? "Українська" : "English",
                            lang === "ukr" ? "English" : "Українська",
                        ]}
                    />
                </InfoParamContainer>
                <LocationContainer>
                    <UseCoordsButton
                        onClick={() => setUseCoords((prev) => !prev)}
                        $variant={useCoords}
                    >
                        {useCoords
                            ? langPref[lang].cityButton
                            : langPref[lang].coordsButton}
                    </UseCoordsButton>
                    {useCoords ? (
                        <Coords>
                            <InfoParamContainer>
                                <InfoParamTitle>
                                    {langPref[lang].lat}
                                </InfoParamTitle>
                                <Input
                                    value={latValue}
                                    onChange={(e) =>
                                        setLatValue(e.target.value)
                                    }
                                />
                            </InfoParamContainer>
                            <InfoParamContainer>
                                <InfoParamTitle>
                                    {langPref[lang].lng}
                                </InfoParamTitle>
                                <Input
                                    value={lngValue}
                                    onChange={(e) =>
                                        setLngValue(e.target.value)
                                    }
                                />
                            </InfoParamContainer>
                        </Coords>
                    ) : (
                        <InfoParamContainer>
                            <InfoParamTitle>
                                {langPref[lang].location}
                            </InfoParamTitle>
                            <Input
                                value={cityValue}
                                onChange={(e) => setCityValue(e.target.value)}
                            />
                        </InfoParamContainer>
                    )}
                </LocationContainer>
            </InfoContainer>
            {saveButton && (
                <ButtonContainer>
                    <Button onClick={() => handleClear()}>
                        {langPref[lang].cancel}
                    </Button>
                    <Button onClick={() => handleChange()}>
                        {langPref[lang].saveButton}
                    </Button>
                </ButtonContainer>
            )}
        </StyledContainer>
    );
};

export default Profile;
