import PropTypes from "prop-types";
import { ParamContainer, Titleh3, ValueTitleh3 } from "./CurrentCardParam.styles";

const CurrentCardParam = ({title, value, unit}) => {
    return (
        <ParamContainer>
            <Titleh3>{title}</Titleh3>
            <ValueTitleh3>{value}{' '}{unit}</ValueTitleh3>
        </ParamContainer>
    );
};

CurrentCardParam.propTypes = {
    title: PropTypes.node.isRequired,
    value: PropTypes.node.isRequired,
    unit: PropTypes.string,
}

export default CurrentCardParam;
