import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    padding: 0;
    top: 0;
    left: 0;
    z-index: 9999;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 100px;
    background-color: ${({ $variant }) => $variant ? "#13404d" : 'transparent'};
    box-shadow: ${({ $variant }) => $variant ? "0 2px 4px rgba(0, 0, 0, 0.25)" : 'none'};
`;

export const StyledButton = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    &:hover {
        background-color: transparent;
        border: none;
        outline: none;
    }

    &:focus {
        outline: none;
    }

    & span {
        margin-bottom: 10px;
        width: 30px;
        border: 1px solid white;
        transition: 0.5s ease;
    }

    ${({ $variant }) =>
        $variant
            ? `
            & span {
                margin-bottom: 0;
            }
            & span:first-child {
                transform: rotate(-45deg);
            }
            & span:last-child {
                transform: rotate(45deg);
            }
            & span:nth-child(2) {
                border: none;
            }
            `
            : `
            & span {
                margin-bottom: 10px;
                width: 25px;
                border: 1px solid white;
            }`}
`;

export const SidebarContainer = styled.div`
    width: 300px;
    height: 100%;
    transition: 0.5s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const RoutesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

export const StyledLink = styled.h3`
    & a {
        text-decoration: none;
        color: white;
        transition: 0.3s ease;

        &:hover {
            color: #d3d3d3;
            text-decoration: underline;
        }
    }
`;

export const OtherContainer = styled.div`
    margin-top: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

export const LinksContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;

    & a {
        text-decoration: none;
        color: white;
        transition: 0.3s ease;

        &:hover {
            color: #d3d3d3;
            text-decoration: underline;
        }
    }
`;