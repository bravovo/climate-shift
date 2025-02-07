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
    gap: 20px;
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
    gap: 20px;
`;

export const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #1d5a67;
`;

/* Forecast card styles end */
