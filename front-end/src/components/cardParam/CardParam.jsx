import PropTypes from "prop-types";
import { Titleh3, ValueTitleh3 } from "../../assets/styles/SharedStyles.styles";
import { ParamContainer } from "./CardParam.styles";

const CardParam = ({ title, value, small = false, unit }) => {
    return small ? (
        <div>
            <h3>{title}</h3>
            <ValueTitleh3>
                {value} {unit}
            </ValueTitleh3>
        </div>
    ) : (
        <ParamContainer>
            <Titleh3>{title}</Titleh3>
            <ValueTitleh3>
                {value} {unit}
            </ValueTitleh3>
        </ParamContainer>
    );
};

CardParam.propTypes = {
    title: PropTypes.node.isRequired,
    value: PropTypes.node.isRequired,
    small: PropTypes.bool,
    unit: PropTypes.string,
};

export default CardParam;
