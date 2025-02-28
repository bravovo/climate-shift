import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    z-index: 999999;

    .my-datepicker {
        padding: 10px;
        font-size: 16px;
        border-radius: 10px;
        background-color: #2f7a78;
        border: 1px solid #2f7a78;

        &:focus {
            outline: none;
            border: 1px solid #2f7a78;
        }
    }

    .react-datepicker__header {
        background-color: #2f7a78;
        color: white;
        border-radius: 5px;
    }

    .react-datepicker__current-month {
        font-weight: bold;
    }

    .react-datepicker__day--selected {
        background-color: #2f7a78;
        color: white;
    }

    .react-datepicker__day--disabled {
        color: #b0b0b0;
    }

    .react-datepicker__day {
        font-size: 16px;
    }
`;
