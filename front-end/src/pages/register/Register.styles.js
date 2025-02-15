import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 1000px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    & h2 {
        margin: 0;
    }
`;

export const Paragraph = styled.p`
    margin: 0;
    text-align: left;
    font-weight: bold;
    color: #469280;
`;

export const Error = styled.p`
    color: red;
    margin: 0;
    text-align: left;
    font-weight: bold;
`;

export const StyledForm = styled.form`
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    background-color: #13404d;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    padding: 2rem;
`;

export const Fields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const FormParam = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;
`;

export const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    appearence: none;
    border-radius: 8px;
    border: 3px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #2f7a78;

    &::placeholder {
        color: #ffffff;
        opacity: 0.7;
    }
`;

export const FormBottom = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    & button {
        width: 200px;
    }

    & a {
        color: white;
        transition: 0.3s ease;
        font-weight: 500;
        font-family: inherit;

        &:hover {
            opacity: 0.7;
        }
    }
`;

export const LocationContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledCoordsInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;


export const StyledButton = styled.button`
    width: 200px;
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
