import styled from "styled-components";

export const Titleh2 = styled.h2`
    width: 100%;
    margin: 0;
    text-align: left;
`;

export const StyledHr = styled.hr`
    width: 100%;
    border: 1px solid #1d5a67;
    border-radius: 10px;
`;

export const InfoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
`;

export const InfoParamContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;

export const InfoParamTitle = styled.h3`
    width: 100%;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 20px;
`;

export const Button = styled.button`
    width: 200px;
`;

export const UseCoordsButton = styled.button`
    width: 400px;
    background-color: ${({ $variant }) =>
        $variant ? "transparent" : "#2f7a78"};
    border-color: ${({ $variant }) => ($variant ? "#2f7a78" : "transparent")};

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: ${({ $variant }) =>
            $variant ? "transparent" : "#469280"};
        border-color: ${({ $variant }) =>
            $variant ? "#469280" : "transparent"};
    }
`;

export const LocationContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

export const AccountManagmentContainer = styled.div`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
    gap: 20px;
`;

export const PasswordChangeContainer = styled.div`
    width: 500px;
    box-sizing: border-box;
    padding: 1em 1.2em;
    background-color: #13404d;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const PasswordValue = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;

    & h3 {
        margin: 0;
    }
`;

export const AccountButtons = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;

    & button {
        width: 200px;
    }
`;

export const LogOutButton = styled.button`
    background-color: #c91221;

    &:hover {
        background-color: #eb1527;
    }
`;

export const DeleteAccountButton = styled.button`
    background-color: #7a0a13;

    &:hover {
        background-color: #9c0c18;
    }
`;

export const DeleteAccountForm = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

export const PasswordField = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const PasswordLabel = styled.div`
    font-weight: bold;
    font-size: large;
`;

export const FormButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
`;
