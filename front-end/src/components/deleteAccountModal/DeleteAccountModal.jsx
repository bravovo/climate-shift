import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DeleteAccountForm, FormButtonsContainer, PasswordField, PasswordLabel } from "./DeleteAccountModal.styles";
import { DeleteAccountButton, Input } from "../../assets/styles/SharedStyles.styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logoutUser } from "../../state/user/userSlice";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

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

const DeleteAccountModal = ({langPref, openDeleteAccountModal, deleteAccountModalToggle}) => {
    const user = useSelector((state) => state.user);
    const lang = user.lang || "ukr";
    const [passwordToDeleteAccount, setPasswordToDeleteAccount] = useState("");
    const passwordToDeleteAccountChange = (event) =>
        setPasswordToDeleteAccount(event.target.value);
    
    const [deleteAccountError, setDeleteAccountError] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

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

    return (
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
                        <p style={{ color: "red" }}>{deleteAccountError}</p>
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
    );
};

DeleteAccountModal.propTypes = {
    langPref: PropTypes.object.isRequired,
    openDeleteAccountModal: PropTypes.bool.isRequired,
    deleteAccountModalToggle: PropTypes.func.isRequired
}

export default DeleteAccountModal;
