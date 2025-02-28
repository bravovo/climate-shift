import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 380px;
`;

export const MainButton = styled.button`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    border-bottom-left-radius: ${({ $variant }) => ($variant ? 0 : "10px")};
    border-bottom-right-radius: ${({ $variant }) => ($variant ? 0 : "10px")};

    &:focus {
        outline: none;
    }

    & span {
        display: inline-block;
        margin-left: 10px;
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 7px solid white;
        transform: ${({ $variant }) =>
            $variant ? "rotate(180deg)" : "rotate(0deg)"};
        transition: transform 0.3s ease;
    }
`;

export const DropDownList = styled.ul`
    z-index: 100;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 30px;
    background-color: #2f7a78;
    border: none;
    border-radius: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    width: 100%;
    padding: 10px 0;
    list-style-type: none;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
`;

export const DropDownListValue = styled.button`
    padding: 10px;
    text-align: center;
`;

export const StyledSpan = styled.span`
    color: ${({ $variant }) => {
        return $variant ? "#13404d" : "white";
    }};
`;
