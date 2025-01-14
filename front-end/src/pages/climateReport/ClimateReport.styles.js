import styled from "styled-components";

export const StyledContainer = styled.div`
    width: 100%;
    place-items: center;
`;

export const StyledComponentContainer = styled.div`
    width: 100%;
`;

export const StyledInputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;

export const StyledErrorParagraph = styled.p`
    color: red;
`;

export const StyledInput = styled.input`
    border-radius: 10px;
    border: 3px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`;

export const ClearInputButton = styled.button`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
`;

export const StyledLastMonthStats = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const StyledParameterCardsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;
