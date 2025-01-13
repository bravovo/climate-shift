import { useAtomValue } from "jotai";
import { climateDataAtom, langAtom } from "../../atoms";
import PropTypes from "prop-types";
import { StyledContainer } from "./ParameterCard.styles";
const ParameterCard = ({ property, parameters }) => {
    const climateData = useAtomValue(climateDataAtom);
    const lang = useAtomValue(langAtom);

    return (
        <StyledContainer>
            <h3>
                {climateData.parameters[lang][property].longname} (
                {climateData.parameters[lang][property].units})
            </h3>
            <div>
                {parameters.map((value, index) => {
                    return (
                        <div key={index}>
                            <p>{climateData.AVERAGES[value] || null}</p>
                            {climateData.MAX[value] ? (
                                <p>
                                    Max: {climateData.MAX[value].date} ---{" "}
                                    {climateData.MAX[value].value}
                                </p>
                            ) : null}
                            {climateData.MIN[value] ? (
                                <p>
                                    Min: {climateData.MIN[value].date} ---{" "}
                                    {climateData.MIN[value].value}
                                </p>
                            ) : null}
                            {property === "frostDays" ? (
                                <p>{climateData.frostDays}</p>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </StyledContainer>
    );
};

ParameterCard.propTypes = {
    property: PropTypes.string.isRequired,
    parameters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ParameterCard;
