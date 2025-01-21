import PropTypes from "prop-types";
import { useState } from "react";
import {
    Container,
    DropDownList,
    DropDownListValue,
    MainButton,
    StyledSpan,
} from "./Combobox.styles";
import { useSelector } from "react-redux";

const ComboBox = ({ options, onChange }) => {
    const yearsClimateData = useSelector((state) => state.yearsClimateData);
    const lang = useSelector((state) => state.dataLang);
    const [selectedValue, setSelectedValue] = useState(options[0]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    return (
        <Container>
            <MainButton
                onClick={() => setIsDropdownVisible((prev) => !prev)}
                onBlur={() =>
                    setTimeout(() => setIsDropdownVisible(false), 100)
                }
                $variant={isDropdownVisible}
            >
                {
                    yearsClimateData.parameters[lang][selectedValue.parameter]
                        .longname
                }
                <span />
            </MainButton>
            {isDropdownVisible && (
                <DropDownList>
                    {options.map((option, index) => (
                        <DropDownListValue
                            key={index}
                            onClick={() => {
                                setSelectedValue(option);
                                setIsDropdownVisible(false);
                                onChange(option);
                            }}
                        >
                            <StyledSpan
                                $variant={
                                    option.parameter === selectedValue.parameter
                                }
                            >
                                {yearsClimateData.parameters[lang][option.parameter].longname}
                            </StyledSpan>
                        </DropDownListValue>
                    ))}
                </DropDownList>
            )}
        </Container>
    );
};

ComboBox.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ComboBox;
