import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import {
    LocationContainer,
    Paragraph,
    StyledButton,
    StyledCoordsInputContainer,
} from "./Register.styles";
import { useEffect, useState } from "react";
import Select from "../../components/select/Select";
import axios from "axios";
import {
    Container,
    Error,
    Fields,
    FormBottom,
    FormContainer,
    FormParam,
    Input,
    LangButton,
    LoaderWrapper,
    StyledForm,
} from "../../assets/styles/SharedStyles.styles";
import { useDispatch, useSelector } from "react-redux";
import { addUser, checkUserExist } from "../../state/user/userSlice";
import { setLang, toggleLang } from "../../state/dataLang/dataLangSlice";
import { fetchCityName } from "../../state/coords/coordsSlice";
import { BounceLoader } from "react-spinners";

const langPref = {
    eng: {
        formTitle: "Account creating",
        stageTitle: "Registration stage",
        email: "Email",
        password: "Password",
        confirmPassword: "Password confirmation",
        haveAcc: "Already have account",
        location: "Default location",
        writeCoords: "Use coordinates",
        writeCity: "Use location name",
        latitude: "Latitude",
        longitude: "Longitude",
        dataLang: "Data display language",
        back: "Back",
        next: "Next",
        create: "Create account",
        passwordsNotEqual: 'Passwords are not equal in fields',
        locationEmpty: 'Location fields can`t be empty',
        userCreateError: "Error creating account",
        serverError: "Internal server error",
    },
    ukr: {
        formTitle: "Створення акаунта",
        stageTitle: "Етап реєстрації",
        email: "Електронна пошта",
        password: "Пароль",
        confirmPassword: "Підтвердження паролю",
        haveAcc: "Уже маю акаунт",
        location: "Локація за замовчуванням",
        writeCoords: "Вписати координати",
        writeCity: "Вписати локацію",
        latitude: "Довгота",
        longitude: "Широта",
        dataLang: "Мова відображення даних",
        back: "Назад",
        next: "Далі",
        create: "Створити акаунт",
        passwordsNotEqual: 'Паролі у полях не співпадають',
        locationEmpty: "Поля для вводу локації не можуть бути порожніми",
        userCreateError: "Виникла помилка при створенні акаунту",
        serverError: "Внутрішня помилка сервера",
    },
};

const Register = () => {
    const user = useSelector((state) => state.user);
    const [stage, setStage] = useState(1);
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmValue, setConfirmValue] = useState("");

    const [locationValue, setLocationValue] = useState("");
    const [latValue, setLatValue] = useState("");
    const [lngValue, setLngValue] = useState("");
    const [useCoords, setUseCoords] = useState(false);
    const [langValue, setLangValue] = useState("Українська");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const lang = useSelector((state) => state.dataLang);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => { 
        console.log("REGISTER");
        if (!user.id) {
            dispatch(checkUserExist());
        }
    }, [dispatch]);

    useEffect(() => {
        if (user.id) {
            navigate('/profile');
        }
    }, [user, navigate]);

    const handleStageOneSumbit = (event) => {
        event.preventDefault();

        if (passwordValue !== confirmValue) {
            setError(langPref[lang].passwordsNotEqual);
            return;
        }

        setStage(2);
        setError("");
    };

    const handleStageTwoSumbit = async (event) => {
        event.preventDefault();

        if (
            locationValue.length === 0 &&
            latValue.length === 0 &&
            lngValue.length === 0
        ) {
            setError(langPref[lang].locationEmpty);
            return;
        }

        try {
            setLoading(true);
            const serverResponse = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    email: emailValue,
                    password: passwordValue,
                    city: locationValue || "",
                    lat: latValue || "",
                    lng: lngValue || "",
                    lang: langValue === "Українська" ? "ukr" : "eng",
                },
                { withCredentials: true }
            );

            if (serverResponse.data) {
                console.log("Success", serverResponse.data);
                dispatch(addUser(serverResponse.data));
                dispatch(setLang(serverResponse.data.lang));
                dispatch(
                    fetchCityName({
                        lat: serverResponse.data.lat,
                        lng: serverResponse.data.lng,
                    })
                );
                setLoading(false);
                navigate("/profile");
                setError("");
            } else {
                throw new Error(langPref[lang].userCreateError);
            }
        } catch (error) {
            setLoading(false);
            if (error.response) {
                if (
                    error.response.status === 400 &&
                    error.response.data.errors
                ) {
                    console.log(error.response.data.errors[0]);
                    setError(error.response.data.errors[0].msg[lang]);
                } else if (
                    error.response.status === 400 &&
                    error.response.data.message
                ) {
                    setError(error.response.data.message);
                } else if (error.response.status === 500) {
                    console.log("Internal server error");
                    setError(langPref[lang].serverError);
                }
            } else {
                console.log(error.message);
                setError(error.message);
            }
        }
    };

    return (
        <Container>
            {loading && (
                <LoaderWrapper>
                    <BounceLoader
                        className="loader"
                        color="#000000"
                        speedMultiplier={1}
                    />
                </LoaderWrapper>
            )}
            <Sidebar />
            <LangButton onClick={() => dispatch(toggleLang())}>
                {lang === "eng" ? "Українська" : "English"}
            </LangButton>
            <FormContainer>
                <h2>
                    {langPref[lang].formTitle}
                </h2>
                {stage === 1 ? (
                    <StyledForm onSubmit={handleStageOneSumbit}>
                        <Paragraph>
                            {langPref[lang].stageTitle}{" "}
                            {stage} / 2
                        </Paragraph>
                        <Fields>
                            <FormParam>
                                <label htmlFor="email-field">
                                    {langPref[lang].email}
                                </label>
                                <Input
                                    value={emailValue}
                                    onChange={(e) =>
                                        setEmailValue(e.target.value)
                                    }
                                    type="email"
                                    name="email-field"
                                    placeholder={langPref[lang].email}
                                    required={true}
                                />
                            </FormParam>
                            <FormParam>
                                <label htmlFor="password-field">
                                    {langPref[lang].password}
                                </label>
                                <Input
                                    value={passwordValue}
                                    onChange={(e) =>
                                        setPasswordValue(e.target.value)
                                    }
                                    type="password"
                                    name="password-field"
                                    placeholder={langPref[lang].password}
                                    required={true}
                                />
                            </FormParam>
                            <FormParam>
                                <label htmlFor="confirm-password-field">
                                    {langPref[lang].confirmPassword}
                                </label>
                                <Input
                                    value={confirmValue}
                                    onChange={(e) =>
                                        setConfirmValue(e.target.value)
                                    }
                                    type="password"
                                    name="confirm-password-field"
                                    placeholder={langPref[lang].confirmPassword}
                                    required={true}
                                />
                            </FormParam>
                        </Fields>
                        <FormBottom>
                            <Link to="/login">
                                {langPref[lang].haveAcc}
                            </Link>
                            <button type="submit">{langPref[lang].next}</button>
                        </FormBottom>
                        {error && <Error>{error}</Error>}
                    </StyledForm>
                ) : (
                    <StyledForm onSubmit={handleStageTwoSumbit}>
                        <Paragraph>{langPref[lang].stageTitle}{" "}{stage} / 2</Paragraph>
                        <Fields>
                            <FormParam>
                                <LocationContainer>
                                    <label htmlFor="location-field">
                                        {langPref[lang].location}
                                    </label>
                                    <StyledButton
                                        onClick={() =>
                                            setUseCoords((prev) => !prev)
                                        }
                                        $variant={useCoords}
                                        type="button"
                                    >
                                        {useCoords
                                            ? langPref[lang].writeCity
                                            : langPref[lang].writeCoords}
                                    </StyledButton>
                                </LocationContainer>
                                {useCoords ? (
                                    <StyledCoordsInputContainer>
                                        <Input
                                            type="text"
                                            placeholder={langPref[lang].latitude}
                                            value={latValue}
                                            onChange={(e) =>
                                                setLatValue(e.target.value)
                                            }
                                        />
                                        <Input
                                            type="text"
                                            placeholder={langPref[lang].longitude}
                                            value={lngValue}
                                            onChange={(e) =>
                                                setLngValue(e.target.value)
                                            }
                                        />
                                    </StyledCoordsInputContainer>
                                ) : (
                                    <Input
                                        value={locationValue}
                                        onChange={(e) =>
                                            setLocationValue(e.target.value)
                                        }
                                        type="text"
                                        name="location-field"
                                        placeholder={langPref[lang].location}
                                    />
                                )}
                            </FormParam>
                            <FormParam>
                                <label>{langPref[lang].dataLang}</label>
                                <Select
                                    onChange={(value) => {
                                        setLangValue(value);
                                    }}
                                    data={["Українська", "English"]}
                                />
                            </FormParam>
                        </Fields>
                        <FormBottom>
                            <button type="button" onClick={() => setStage(1)}>
                                {langPref[lang].back}
                            </button>
                            <button type="submit">{langPref[lang].create}</button>
                        </FormBottom>
                        {error && <Error>{error}</Error>}
                    </StyledForm>
                )}
            </FormContainer>
        </Container>
    );
};

export default Register;
