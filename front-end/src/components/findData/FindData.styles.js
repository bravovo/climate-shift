import styled from "styled-components";

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

export const StyledInputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;

export const StyledCoordsInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;

export const Button = styled.button`
    width: 310px;
`;

export const LangButton = styled.button`
    width: 150px;
`;
