import PropTypes from "prop-types";
import {
    Container,
    DropDownList,
    DropDownListValue,
    MainButton,
    StyledSpan,
} from "./Select.styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Select = ({ onChange, data }) => {
    const yearsClimateData = useSelector((state) => state.yearsClimateData);
    const lang = useSelector((state) => state.dataLang);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(data[0]);

    useEffect(() => { 
        setSelectedValue(data[0]);
        onChange(data[0]);
    }, [yearsClimateData, lang]);

    return (
        <Container>
            <MainButton
                value={selectedValue}
                onClick={() => setIsDropdownVisible((prev) => !prev)}
                onBlur={() =>
                    setTimeout(() => setIsDropdownVisible(false), 200)
                }
                $variant={isDropdownVisible}
            >
                {selectedValue}
                <span />
            </MainButton>
            {isDropdownVisible && (
                <DropDownList>
                    {data.map((option) => (
                        <DropDownListValue
                            key={option}
                            value={option}
                            onClick={() => {
                                setSelectedValue(option);
                                setIsDropdownVisible(false);
                                onChange(option);
                            }}
                        >
                            <StyledSpan
                                $variant={
                                    option === selectedValue
                                }
                            >
                                {option}
                            </StyledSpan>
                        </DropDownListValue>
                    ))}
                </DropDownList>
            )}
        </Container>
    );
};

Select.propTypes = {
    onChange: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
};

export default Select;
