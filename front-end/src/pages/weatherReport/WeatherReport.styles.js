import styled from "styled-components";

export const StyledComponentContainerExtended = styled.div`
    width: 1000px;
    position: sticky;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const StyledErrorParagraph = styled.p`
    font-weight: bold;
    color: red;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #13404d;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    padding: 1em 1.2em;
    border-radius: 10px;
`;

/* Forecast card styles start */

export const ForecastContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const CardContainer = styled.div`
    margin-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #1d5a67;

    &:last-child {
        border: none;
    }
`;

export const CardDateContainer = styled.div`
    height: 100%;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-right: 1px solid #1d5a67;
`;

export const CardWeatherConditionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & h3 {
        margin: 0;
        color: #469280;
    }
`;

/* Forecast card styles end */
