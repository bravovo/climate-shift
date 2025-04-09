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
    gap: 20px;
`;

export const AccountManagmentContainer = styled.div`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
    gap: 20px;
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
