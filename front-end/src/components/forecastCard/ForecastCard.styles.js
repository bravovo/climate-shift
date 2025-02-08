import styled from 'styled-components';

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
        padding-bottom: 0;
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
