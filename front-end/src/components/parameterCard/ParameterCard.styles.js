import styled from "styled-components";

export const StyledContainer = styled.div`
    border-radius: 10px;
    padding: 10px 20px;
    background-color: #3e3e3e;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
`;

export const Title3 = styled.h3`
    margin-bottom: 12px;
    font-size: 1.2em;
    color: #ffffff;
    border-bottom: 2px solid #242424;
    padding-bottom: 4px;
`;

export const ParameterGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const StyledParameter = styled.div`
    border: 1px solid #242424;
    border-radius: 10px;
    background-color: transparent;
`;

export const ParameterLabel = styled.p`
    font-size: 0.95em;
    font-weight: bold;
    color: #ffffff;
`;

export const ParameterValue = styled.p`
    font-size: 2em;
    margin: 4px 0;
`;

export const FrostDays = styled.div`
    font-size: 2em;
    text-align: center;
`;
