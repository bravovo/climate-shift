import styled from 'styled-components';

export const WeatherContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
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

export const Titleh3 = styled.h3`
    margin: 0;
    font-size: 1.6em;
`;

export const ValueTitleh3 = styled(Titleh3)`
    color: #469280;
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

export const StyledParametersContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    
    &:last-child {
        margin-bottom: 20px;
    }
`;