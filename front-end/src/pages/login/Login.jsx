import { useState } from "react";
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
    StyledForm,
} from "../../assets/styles/SharedStyles.styles";
import axios from "axios";
import { useDispatch } from "react-redux";

import { addUser } from "../../state/user/userSlice";
import { setLang } from "../../state/dataLang/dataLangSlice";
import { fetchCityName } from "../../state/coords/coordsSlice";

const Login = () => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const serverResponse = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email: emailValue,
                    password: passwordValue,
                },
                { withCredentials: true }
            );

            if (serverResponse) {
                console.log(serverResponse.data);
                dispatch(addUser(serverResponse.data));
                dispatch(setLang(serverResponse.data.lang));
                dispatch(fetchCityName({ lat: serverResponse.data.lat, lng: serverResponse.data.lng }));
                navigate("/climate");
                setError("");
            } else {
                throw new Error("Помилка під час входу в акаунт");
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || "Щось пішло не так");
            } else {
                console.log(error.message);
                setError(error.message);
            }
        }
    };

    return (
        <Container>
            <Sidebar />
            <FormContainer>
                <h2>Вхід в акаунт</h2>
                <StyledForm onSubmit={handleSubmit}>
                    <Fields>
                        <FormParam>
                            <label htmlFor="email-field">
                                Електронна пошта
                            </label>
                            <Input
                                value={emailValue}
                                onChange={(e) => setEmailValue(e.target.value)}
                                type="email"
                                name="email-field"
                                placeholder="Email"
                                required={true}
                            />
                        </FormParam>
                        <FormParam>
                            <label htmlFor="password-field">Пароль</label>
                            <Input
                                value={passwordValue}
                                onChange={(e) =>
                                    setPasswordValue(e.target.value)
                                }
                                type="password"
                                name="password-field"
                                placeholder="Password"
                                required={true}
                            />
                        </FormParam>
                    </Fields>
                    <FormBottom>
                        <Link to="/register">Ще не маю акаунта</Link>
                        <button type="submit">Увійти</button>
                    </FormBottom>
                    {error && <Error>{error}</Error>}
                </StyledForm>
            </FormContainer>
        </Container>
    );
};

export default Login;
