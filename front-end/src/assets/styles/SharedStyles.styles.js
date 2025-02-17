import styled from "styled-components";

export const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    padding: 2rem 0 2rem 0;
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

export const Titleh3 = styled.h3`
    margin: 0;
    font-size: 1.6em;
`;

export const ValueTitleh3 = styled(Titleh3)`
    color: #469280;
    font-size: 1.6em;
`;

export const IconImageStyles = styled.img`
    width: 100px;
`;

/* Register / Login pages styles  start */

export const Container = styled.div`
    position: relative;
    width: 1000px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    & h2 {
        margin: 0;
    }
`;

export const Error = styled.p`
    color: red;
    margin: 0;
    text-align: left;
    font-weight: bold;
`;

export const StyledForm = styled.form`
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    background-color: #13404d;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    padding: 2rem;
`;

export const Fields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const FormParam = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;
`;

export const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    appearence: none;
    border-radius: 8px;
    border: 3px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #2f7a78;

    &::placeholder {
        color: #ffffff;
        opacity: 0.7;
    }
`;

export const FormBottom = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    & button {
        width: 200px;
    }

    & a {
        color: white;
        transition: 0.3s ease;
        font-weight: 500;
        font-family: inherit;

        &:hover {
            opacity: 0.7;
        }
    }
`;

export const LangButton = styled.button`
    width: 150px;
    top: 25px;
    right: 25px;
    position: fixed;
    z-index: 9999;
`;

/* Register / Login pages styles  end */
