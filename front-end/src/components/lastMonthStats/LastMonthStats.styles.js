import styled from 'styled-components';

export const StyledLastMonthStats = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & h2 {
        margin-top: 0;
    }
`;

export const StyledParameterCardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1em;
    max-width: 1000px;
    box-sizing: border-box;
`;
