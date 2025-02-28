import styled from "styled-components";

export const LegendContainer = styled.div`
    position: absolute;
    bottom: 30px;
    right: 10px;
    background-color: white;
    padding: 1em 1.2em;
    border-radius: 10px;
    color: black;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const GradientBar = styled.div`
    width: 260px;
    height: 20px;
    background-image: linear-gradient(
        to right,
        ${({$variant}) => $variant}
    );
    border: 1px solid transparent;
    margin: 5px 0;
`;

export const LegendLabels = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
`;
