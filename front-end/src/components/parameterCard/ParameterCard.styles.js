import styled from "styled-components";

export const StyledContainer = styled.div`
    width: ${({$variant}) => {
        if ($variant === "3") {
            return "900px";
        } else if ($variant === "2") {
            return "575px";
        } else {
            return "250px";
        }
    }};
    height: 160px;
    display: block;
    border-radius: 10px;
    padding: 20px 30px;
    background-color: #13404d;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
`;

export const Title3 = styled.h3`
    margin-top: 0;
    margin-bottom: 12px;
    font-size: 1.05em;
    color: #ffffff;
    border-bottom: 2px solid #1d5a67;
    padding-bottom: 4px;
    position: relative;
`;

export const ParameterGroup = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

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

export const FrostDays = styled.div`
    font-size: 2em;
    text-align: center;
`;
