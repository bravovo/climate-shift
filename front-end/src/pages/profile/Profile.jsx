import { useEffect, useState } from "react";
import {
    Input,
    StyledContainer,
} from "../../assets/styles/SharedStyles.styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import {
    AccountButtons,
    AccountManagmentContainer,
    Button,
    ButtonContainer,
    InfoContainer,
    InfoParamContainer,
    InfoParamTitle,
    LocationContainer,
    LogOutButton,
    StyledHr,
    Titleh2,
    UseCoordsButton,
} from "./Profile.styles";
import { DeleteAccountButton } from "../../assets/styles/SharedStyles.styles";
import Select from "../../components/select/Select";
import axios from "axios";
import { checkUserExist, logoutUser } from "../../state/user/userSlice";
import ChangePassword from "../../components/changePassword/ChangePassword";
import Loader from "../../components/loader/Loader";
import Info from "../../components/info/Info";
import DeleteAccountModal from "../../components/deleteAccountModal/DeleteAccountModal";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

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

    const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);

    const deleteAccountModalToggle = () =>
        setOpenDeleteAccountModal(!openDeleteAccountModal);

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
                `${SERVER_BASE_URL}/api/user/modify`,
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
                    error.message
                );
            }
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            const serverResponse = await axios.post(
                `${SERVER_BASE_URL}/api/user/logout`,
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
            <Loader loading={loading}/>
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
                                <Info title={langPref[lang].lat} value={latValue} setValue={(value) => setLatValue(value)} />
                                <Info title={langPref[lang].lng} value={lngValue} setValue={(value) => setLngValue(value)} />
                        </InfoParamContainer>
                    ) : (
                        <Info title={langPref[lang].location} value={cityValue} setValue={(value) => setCityValue(value)} />
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
                    <ChangePassword setLoading={(value) => setLoading(value)} langPref={langPref}/>
                    <AccountButtons>
                        <LogOutButton onClick={handleLogout}>
                            {langPref[lang].logoutButton}
                        </LogOutButton>
                        <DeleteAccountButton onClick={deleteAccountModalToggle}>
                            {langPref[lang].deleteAccButton}
                        </DeleteAccountButton>
                    </AccountButtons>
                    <DeleteAccountModal langPref={langPref} openDeleteAccountModal={openDeleteAccountModal} deleteAccountModalToggle={deleteAccountModalToggle}/>
                </AccountManagmentContainer>
            </InfoContainer>
        </StyledContainer>
    );
};

export default Profile;
