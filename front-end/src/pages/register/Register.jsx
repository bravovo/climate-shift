import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import {
    LocationContainer,
    Paragraph,
    StyledButton,
    StyledCoordsInputContainer,
} from "./Register.styles";
import { useState } from "react";
import Select from "../../components/select/Select";
import axios from "axios";
import { Container, Error, Fields, FormBottom, FormContainer, FormParam, Input, StyledForm } from "../../assets/styles/SharedStyles.styles";

const Register = () => {
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

    const handleStageOneSumbit = (event) => {
        event.preventDefault();

        if (passwordValue !== confirmValue) {
            setError("Паролі у полях не співпадають");
            return;
        }

        setStage(2);
    };

    const handleStageTwoSumbit = async (event) => {
        event.preventDefault();

        if (
            locationValue.length === 0 &&
            latValue.length === 0 &&
            lngValue.length === 0
        ) {
            setError("Поля для вводу локації не можуть бути порожніми");
            return;
        }

        try {
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
                setError("");
            } else {
                throw new Error("Виникла помилка при створенні акаунту");
            }
        } catch (error) {
            if (error.response) {
                if (
                    error.response.status === 400 &&
                    error.response.data.errors
                ) {
                    console.log(error.response.data.errors[0]);
                    setError(error.response.data.errors[0].msg.ukr);
                } else if (error.response.status === 400 && error.response.data.message) { 
                    setError(error.response.data.message);
                } else if (error.response.status === 500) {
                    console.log("Internal server error");
                    setError("Internal server error");
                }
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
                <h2>Створення акаунта</h2>
                {stage === 1 ? (
                    <StyledForm onSubmit={handleStageOneSumbit}>
                        <Paragraph>Етап реєстрації {stage} / 2</Paragraph>
                        <Fields>
                            <FormParam>
                                <label htmlFor="email-field">
                                    Електронна пошта
                                </label>
                                <Input
                                    value={emailValue}
                                    onChange={(e) =>
                                        setEmailValue(e.target.value)
                                    }
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
                            <FormParam>
                                <label htmlFor="confirm-password-field">
                                    Підтвердження паролю
                                </label>
                                <Input
                                    value={confirmValue}
                                    onChange={(e) =>
                                        setConfirmValue(e.target.value)
                                    }
                                    type="password"
                                    name="confirm-password-field"
                                    placeholder="Confirm password"
                                    required={true}
                                />
                            </FormParam>
                        </Fields>
                        <FormBottom>
                            <Link to="/login">Уже маю акаунт</Link>
                            <button type="submit">Далі</button>
                        </FormBottom>
                        {error && <Error>{error}</Error>}
                    </StyledForm>
                ) : (
                    <StyledForm onSubmit={handleStageTwoSumbit}>
                        <Paragraph>Етап реєстрації {stage} / 2</Paragraph>
                        <Fields>
                            <FormParam>
                                <LocationContainer>
                                    <label htmlFor="location-field">
                                        Локація за замовчуванням
                                    </label>
                                    <StyledButton
                                        onClick={() =>
                                            setUseCoords((prev) => !prev)
                                        }
                                        $variant={useCoords}
                                        type="button"
                                    >
                                        {useCoords
                                            ? "Вписати локацію"
                                            : "Вписати координати"}
                                    </StyledButton>
                                </LocationContainer>
                                {useCoords ? (
                                    <StyledCoordsInputContainer>
                                        <Input
                                            type="text"
                                            placeholder="Довгота"
                                            value={latValue}
                                            onChange={(e) =>
                                                setLatValue(e.target.value)
                                            }
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Широта"
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
                                        placeholder="Location"
                                    />
                                )}
                            </FormParam>
                            <FormParam>
                                <label>Мова відображення даних</label>
                                <Select
                                    onChange={(value) => {
                                        setLangValue(value);
                                    }}
                                    data={["Українська", "English"]}
                                />
                            </FormParam>
                        </Fields>
                        <FormBottom>
                            <button type="button" onClick={() => setStage(1)}>Назад</button>
                            <button type="submit">Створити акаунт</button>
                        </FormBottom>
                        {error && <Error>{error}</Error>}
                    </StyledForm>
                )}
            </FormContainer>
        </Container>
    );
};

export default Register;
