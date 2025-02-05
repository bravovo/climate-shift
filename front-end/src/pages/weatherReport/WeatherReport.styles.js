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

/* Weather card styles start */

export const WeatherContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    background-color: #13404d;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    padding: 1em 1.2em;
    border-radius: 10px;
`;

export const TemperatureContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 100px;
`;

export const Titleh3 = styled.h3`
    margin: 0;
    font-size: 1.6em;
`;

export const IconImageStyles = styled.img`
    width: 100px;
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

/* Weather card styles end */
