import styled from 'styled-components';

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