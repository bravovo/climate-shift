import styled from "styled-components";

export const Paragraph = styled.p`
    margin: 0;
    text-align: left;
    font-weight: bold;
    color: #469280;
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
