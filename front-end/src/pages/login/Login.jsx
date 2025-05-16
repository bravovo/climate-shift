import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { addUser, checkUserExist } from "../../state/user/userSlice";
import { setLang, toggleLang } from "../../state/dataLang/dataLangSlice";
import { fetchCityName } from "../../state/coords/coordsSlice";
import { BounceLoader } from "react-spinners";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const langPref = {
    eng: {
        formTitle: "Log in",
        email: "Email",
        password: "Password",
        dontHaveAcc: "Don`t have account",
        login: "Log in",
        userLoginError: "Error while log in",
        serverError: "Something went wrong",
    },
    ukr: {
        formTitle: "Вхід в акаунт",
        email: "Електронна пошта",
        password: "Пароль",
        dontHaveAcc: "Ще не маю акаунта",
        login: "Увійти",
        userLoginError: "Помилка під час входу в акаунт",
        serverError: "Щось пішло не так",
    },
};

const Login = () => {
    const user = useSelector((state) => state.user);
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [error, setError] = useState("");
    const lang = useSelector((state) => state.dataLang);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => { 
        if (!user.id) {
            dispatch(checkUserExist());
        }
    }, [dispatch]);

    useEffect(() => {
        if (user.id) {
            navigate('/profile');
        }
    }, [user, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const serverResponse = await axios.post(
                `${SERVER_BASE_URL}/api/auth/login`,
                {
                    email: emailValue,
                    password: passwordValue,
                },
                { withCredentials: true }
            );

            if (serverResponse) {
                dispatch(addUser(serverResponse.data));
                dispatch(setLang(serverResponse.data.lang));
                dispatch(fetchCityName({ lat: serverResponse.data.lat, lng: serverResponse.data.lng }));
                setLoading(false);
                setError("");
                navigate("/profile");
            } else {
                throw new Error(langPref[lang].userLoginError);
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                setError(error.response.data.message[lang] ?? langPref[lang].serverError);
            } else {
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
                <h2>{langPref[lang].formTitle}</h2>
                <StyledForm onSubmit={handleSubmit}>
                    <Fields>
                        <FormParam>
                            <label htmlFor="email-field">
                                {langPref[lang].email}
                            </label>
                            <Input
                                value={emailValue}
                                onChange={(e) => setEmailValue(e.target.value)}
                                type="email"
                                name="email-field"
                                placeholder={langPref[lang].email}
                                required={true}
                            />
                        </FormParam>
                        <FormParam>
                            <label htmlFor="password-field">{langPref[lang].password}</label>
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
                    </Fields>
                    <FormBottom>
                        <Link to="/register">{langPref[lang].dontHaveAcc}</Link>
                        <button type="submit">{langPref[lang].login}</button>
                    </FormBottom>
                    {error && <Error>{error}</Error>}
                </StyledForm>
            </FormContainer>
        </Container>
    );
};

export default Login;
