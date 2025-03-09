import { useEffect, useState } from "react";
import {
    Input,
    LoaderWrapper,
    StyledContainer,
} from "../../assets/styles/SharedStyles.styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
    AccountButtons,
    AccountManagmentContainer,
    Button,
    ButtonContainer,
    DeleteAccountButton,
    DeleteAccountForm,
    FormButtonsContainer,
    InfoContainer,
    InfoParamContainer,
    InfoParamTitle,
    LocationContainer,
    LogOutButton,
    PasswordChangeContainer,
    PasswordField,
    PasswordLabel,
    PasswordValue,
    StyledHr,
    Titleh2,
    UseCoordsButton,
} from "./Profile.styles";
import Select from "../../components/select/Select";
import axios from "axios";
import { checkUserExist, logoutUser } from "../../state/user/userSlice";
import { BounceLoader } from "react-spinners";

const styleModal = {
    color: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "#13404d",
    border: "none",
    borderRadius: "10px",
    boxShadow: 24,
    boxSizing: "border-box",
    padding: "1em 1.2em",
};

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
        oldPassLabel: "Old password",
        changePassLabel: "New password",
        confirmPassLabel: "Confirm new password",
        passwordLabel: "Confirm password to delete account",
        submit: "Submit",
        changePasswordButton: "Change password",
        logoutButton: "Log out",
        deleteAccButton: "Delete account",
        passNotEqualError: "Passwords are not equal in fields",
        defaultError: "Something went wrong",
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
        oldPassLabel: "Старий пароль",
        changePassLabel: "Новий пароль",
        confirmPassLabel: "Підтверження нового паролю",
        passwordLabel: "Підтвердьте пароль для видалення акаунта",
        submit: "Підтвердити",
        changePasswordButton: "Змінити пароль",
        logoutButton: "Вийти",
        deleteAccButton: "Видалити акаунт",
        passNotEqualError: "Паролі у полях не збігаються",
        defaultError: "Щось пішло не так",
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

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);

    const [passwordToDeleteAccount, setPasswordToDeleteAccount] = useState("");
    const deleteAccountModalToggle = () =>
        setOpenDeleteAccountModal(!openDeleteAccountModal);

    const passwordToDeleteAccountChange = (event) =>
        setPasswordToDeleteAccount(event.target.value);

    const [deleteAccountError, setDeleteAccountError] = useState("");
    const [changePasswordError, setChangePasswordError] = useState("");

    const [saveButton, setSaveButton] = useState(false);
    const [useCoords, setUseCoords] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("PROFILE");
        if (!user.id) {
            dispatch(checkUserExist());
        }
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
            setLoading(false);
            if (error.response && error.response.status === 401) {
                window.alert(
                    lang === "ukr"
                        ? "Вам необхідно авторизуватись спершу"
                        : "You need to log in first"
                );
                dispatch(logoutUser());
                navigate("/login");
            } else if (error.response) {
                window.alert(error.response.data.message);
            } else {
                window.alert(
                    error.response.data.errors[0]?.msg[lang] || error.message
                );
            }
        }
        setLoading(false);
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setChangePasswordError(langPref[lang].passNotEqualError);
            return;
        }

        try {
            setLoading(true);
            const serverResponse = await axios.patch(
                "http://localhost:5000/api/user/change-pass",
                {
                    oldPassword,
                    newPassword,
                },
                { withCredentials: true }
            );

            if (serverResponse && serverResponse.status === 200) {
                window.location.reload();
            } else {
                console.log("EMPTY RESPONSE", serverResponse);
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 400) {
                setChangePasswordError(
                    error.response.data.errors
                        ? error.response.data.errors[0]?.msg[lang]
                        : error.response.data.message[lang]
                );
            } else if (error.response.status === 401) {
                window.alert(
                    lang === "ukr"
                        ? "Вам необхідно авторизуватись спершу"
                        : "You need to log in first"
                );
                dispatch(logoutUser());
                navigate("/register");
            } else {
                console.log(error);
                setChangePasswordError(langPref[lang].defaultError);
            }
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            const serverResponse = await axios.post(
                "http://localhost:5000/api/user/logout",
                {},
                { withCredentials: true }
            );

            console.log(serverResponse);
            if (serverResponse) {
                dispatch(logoutUser());
                navigate("/register");
            }
        } catch (error) {
            setLoading(false);
            window.alert(
                lang === "ukr"
                    ? "Виникла помилка під час виходу з акаунта"
                    : "Problem happened while logging out"
            );
            if (error.response) {
                console.log(error.response);
            } else {
                console.log(error.message);
            }
        }
    };

    const handleDeleteAccount = async (event) => {
        event.preventDefault();

        if (passwordToDeleteAccount.length === 0) {
            setDeleteAccountError("Пароль повинен бути введений");
            return;
        }

        try {
            const serverResponse = await axios.post(
                "http://localhost:5000/api/user/delete",
                {
                    password: passwordToDeleteAccount,
                },
                { withCredentials: true }
            );

            if (serverResponse) {
                dispatch(logoutUser());
                navigate("/register");
            }
        } catch (error) {
            if (error.response) {
                setDeleteAccountError(error.response.data.message[lang]);
            } else {
                setDeleteAccountError(
                    error.message || lang === "ukr"
                        ? "Виникла помилка під час видалення акаунта"
                        : "Problem happened while account deleting"
                );
            }
        }
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
                    <InfoParamContainer>
                        <InfoParamTitle>{langPref[lang].email}</InfoParamTitle>
                        <Input
                            disabled={true}
                            placeholder={user.email}
                            style={{ cursor: "not-allowed" }}
                        />
                    </InfoParamContainer>
                    <InfoParamContainer>
                        <InfoParamTitle>
                            {langPref[lang].dataLang}
                        </InfoParamTitle>
                        <Select
                            onChange={(value) =>
                                setLangValue(
                                    value === "Українська" ? "ukr" : "eng"
                                )
                            }
                            data={[
                                lang === "ukr" ? "Українська" : "English",
                                lang === "ukr" ? "English" : "Українська",
                            ]}
                        />
                    </InfoParamContainer>
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
                        <InfoParamContainer>
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
                        </InfoParamContainer>
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
                <AccountManagmentContainer>
                    <PasswordChangeContainer>
                        <PasswordValue>
                            <InfoParamTitle>
                                {langPref[lang].oldPassLabel}
                            </InfoParamTitle>
                            <Input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </PasswordValue>
                        <PasswordValue>
                            <InfoParamTitle>
                                {langPref[lang].changePassLabel}
                            </InfoParamTitle>
                            <Input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </PasswordValue>
                        <PasswordValue>
                            <InfoParamTitle>
                                {langPref[lang].confirmPassLabel}
                            </InfoParamTitle>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </PasswordValue>
                        <button
                            onClick={handleChangePassword}
                            disabled={
                                !(
                                    oldPassword.length &&
                                    newPassword.length &&
                                    confirmPassword.length
                                )
                            }
                        >
                            {langPref[lang].changePasswordButton}
                        </button>
                        {changePasswordError && <p>{changePasswordError}</p>}
                    </PasswordChangeContainer>
                    <AccountButtons>
                        <LogOutButton onClick={handleLogout}>
                            {langPref[lang].logoutButton}
                        </LogOutButton>
                        <DeleteAccountButton onClick={deleteAccountModalToggle}>
                            {langPref[lang].deleteAccButton}
                        </DeleteAccountButton>
                    </AccountButtons>
                    <Modal
                        open={openDeleteAccountModal}
                        onClose={deleteAccountModalToggle}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styleModal}>
                            <DeleteAccountForm onSubmit={handleDeleteAccount}>
                                <PasswordField>
                                    <PasswordLabel htmlFor="confirm-pass-to-delete">
                                        {langPref[lang].passwordLabel}
                                    </PasswordLabel>
                                    <Input
                                        type="password"
                                        id="confirm-pass-to-delete"
                                        value={passwordToDeleteAccount}
                                        onChange={passwordToDeleteAccountChange}
                                        required
                                    />
                                </PasswordField>
                                {deleteAccountError && (
                                    <p style={{ color: "red" }}>
                                        {deleteAccountError}
                                    </p>
                                )}
                                <FormButtonsContainer>
                                    <button onClick={deleteAccountModalToggle}>
                                        {langPref[lang].cancel}
                                    </button>
                                    <DeleteAccountButton type="submit">
                                        {langPref[lang].submit}
                                    </DeleteAccountButton>
                                </FormButtonsContainer>
                            </DeleteAccountForm>
                        </Box>
                    </Modal>
                </AccountManagmentContainer>
            </InfoContainer>
        </StyledContainer>
    );
};

export default Profile;
