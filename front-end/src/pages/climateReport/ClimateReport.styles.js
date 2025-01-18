import styled from "styled-components";

export const StyledContainer = styled.div`
    width: 100%;
`;

export const StyledComponentContainer = styled.div`
    width: 100%;
`;

export const StyledComponentContainerExtended = styled.div`
    width: 1000px;
    position: sticky;
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
    font-weight: bold;
    color: red;
`;

export const StyledInput = styled.input`
    border-radius: 10px;
    border: 3px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #2f7a78;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    &::placeholder {
        color: #ffffff;
    }

    &:focus {
        outline: none;
        border: 3px solid transparent;
        background-color: #469280;
    }
`;

export const ClearInputButton = styled.button`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
`;

export const ChangeLangButton = styled.button`
    width: 310px;
`;
