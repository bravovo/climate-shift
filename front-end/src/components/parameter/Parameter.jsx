import PropTypes from "prop-types";
import { ParameterLabel, ParameterValue, ParameterValueDate, StyledParameter } from './Parameter.styles';

const Parameter = ({ content }) => {
    const [label, value, date = null] = content;

    return (
        <StyledParameter>
            <ParameterLabel>{label}</ParameterLabel>
            <ParameterValue>
                {date && (
                    <ParameterValueDate>{date}</ParameterValueDate>
                )}
                {date ? ` | ${value}` : value}
            </ParameterValue>
        </StyledParameter>
    );
};

Parameter.propTypes = {
    content: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Parameter;
