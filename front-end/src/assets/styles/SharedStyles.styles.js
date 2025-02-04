import styled from 'styled-components';

export const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
`;

export const LoaderWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

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

export const StyledComponentContainer = styled.div`
    width: 100%;
`;