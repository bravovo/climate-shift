import { StyledInput, ClearInputButton } from "./Input.styles";
import PropTypes from "prop-types";

const Input = ({placeholder, value, onChange, clear}) => {
    return (
        <div>
            <StyledInput
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <ClearInputButton onClick={clear}>X</ClearInputButton>
        </div>
    );
};

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
};

export default Input;
