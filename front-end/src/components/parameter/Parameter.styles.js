import styled from 'styled-components';

export const StyledParameter = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 2px solid #1d5a67;
    border-left: 2px solid #1d5a67;
    border-radius: 10px;
    background-color: transparent;
    padding: 0 10px;
`;

export const ParameterLabel = styled.p`
    font-size: 0.95em;
    font-weight: bold;
    color: #ffffff;
`;

export const ParameterValue = styled.p`
    font-size: 1.5em;
    margin: 3px 0;
`;

export const ParameterValueDate = styled.span`
    color: #469280;
`;