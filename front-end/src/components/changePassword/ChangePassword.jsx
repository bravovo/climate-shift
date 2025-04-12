import { InfoParamTitle } from '../../pages/profile/Profile.styles';
import {
    Input,
} from "../../assets/styles/SharedStyles.styles";
import { PasswordChangeContainer, PasswordValue } from './ChangePassword.styles';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../state/user/userSlice';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const ChangePassword = ({ setLoading, langPref }) => {
    const lang = useSelector((state) => state.dataLang);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [changePasswordError, setChangePasswordError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setChangePasswordError(langPref[lang].passNotEqualError);
            return;
        }

        try {
            setLoading(true);
            const serverResponse = await axios.patch(
                `${SERVER_BASE_URL}/api/user/change-pass`,
                {
                    oldPassword,
                    newPassword,
                },
                { withCredentials: true }
            );

            if (serverResponse && serverResponse.status === 204) {
                window.location.reload();
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

    return (
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
    )
};

ChangePassword.propTypes = {
    setLoading: PropTypes.func.isRequired,
    langPref: PropTypes.object.isRequired
}

export default ChangePassword;