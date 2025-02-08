import styled from 'styled-components';

export const WeatherContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #1d5a67;
`;

export const ParametersContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 70px;
`;

export const WeatherDescContainer = styled.div`
    width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    border-right: 1px solid #1d5a67;
`;

export const StyledParametersContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
`;