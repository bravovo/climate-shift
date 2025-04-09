import PropTypes from "prop-types";
import { Input } from "../../assets/styles/SharedStyles.styles";
import { InfoParamContainer, InfoParamTitle } from "./Info.styles";

const Info = ({ title, value, setValue }) => {

    return (
        <InfoParamContainer>
            <InfoParamTitle>{title}</InfoParamTitle>
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </InfoParamContainer>
    );
};

Info.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.node.isRequired,
    setValue: PropTypes.func.isRequired
}

export default Info;
