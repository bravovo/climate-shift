import styled from "styled-components";

export const StyledInput = styled.input`
    appearence: none;
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
