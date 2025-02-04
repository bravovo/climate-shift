import styled from "styled-components";

export const GoUpContainer = styled.button`
    position: fixed;
    padding: 0;
    bottom: 50px;
    right: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #2f7a78;
    display: flex;
    justify-content: center;
    align-items: center;

    &:focus {
        outline: none;
    }
`;