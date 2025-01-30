import styled from "styled-components";

export const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const StyledComponentContainer = styled.div`
    width: 100%;
`;

export const StyledComponentContainerExtended = styled.div`
    width: 1000px;
    position: sticky;
    display: flex;
    flex-direction: column;
    gap: 20px;
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

export const StyledInputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

export const StyledErrorParagraph = styled.p`
    font-weight: bold;
    color: red;
`;

export const ChangeLangButton = styled.button`
    width: 310px;
`;
