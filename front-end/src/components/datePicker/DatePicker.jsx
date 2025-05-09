import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "./DatePicker.styles";
import { enGB, uk } from "date-fns/locale";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const DatePick = ({ onChange, minDate }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const lang = useSelector((state) => state.dataLang);

    return (
        <Container>
            <h3>{lang === 'ukr' ? 'Виберіть дату' : "Choose date"}</h3>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                    setSelectedDate(date);
                    onChange(date);
                }}
                className="my-datepicker"
                dateFormat="dd.MM.yyyy"
                minDate={minDate}
                locale={lang === 'ukr' ? uk : enGB}
            />
        </Container>
    );
};

DatePick.propTypes = {
    onChange: PropTypes.func.isRequired,
    minDate: PropTypes.any,
};

export default DatePick;
