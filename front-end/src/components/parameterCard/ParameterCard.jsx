import { useAtomValue } from "jotai";
import { climateDataAtom, langAtom } from "../../atoms";
import PropTypes from "prop-types";
import {
    StyledContainer,
    Title3,
    ParameterGroup,
    ParameterLabel,
    ParameterValue,
    FrostDays,
    StyledParameter,
} from "./ParameterCard.styles";

const ParameterCard = ({ property, parameters }) => {
    const climateData = useAtomValue(climateDataAtom);
    const lang = useAtomValue(langAtom);

    return (
        <StyledContainer>
            <Title3>
                {climateData.parameters[lang][property].longname} (
                {climateData.parameters[lang][property].units})
            </Title3>
            <div>
                {parameters.map((value, index) => {
                    return (
                        <ParameterGroup key={index}>
                            {climateData.AVERAGES[value] ? (
                                <StyledParameter>
                                    <ParameterLabel>{climateData.parameters[lang].metrics.avg}</ParameterLabel>
                                    <ParameterValue>
                                        {climateData.AVERAGES[value]}
                                    </ParameterValue>
                                </StyledParameter>
                            ) : null}
                            {climateData.MAX[value] ? (
                                <StyledParameter>
                                    <ParameterLabel>{climateData.parameters[lang].metrics.max}</ParameterLabel>
                                    <ParameterValue>
                                        {climateData.MAX[value].date} ---{" "}
                                        {climateData.MAX[value].value}
                                    </ParameterValue>
                                </StyledParameter>
                            ) : null}
                            {climateData.MIN[value] ? (
                                <StyledParameter>
                                    <ParameterLabel>{climateData.parameters[lang].metrics.min}</ParameterLabel>
                                    <ParameterValue>
                                        {climateData.MIN[value].date} ---{" "}
                                        {climateData.MIN[value].value}
                                    </ParameterValue>
                                </StyledParameter>
                            ) : null}
                            {property === "frostDays" ? (
                                <StyledParameter>
                                    <FrostDays>
                                        {climateData.frostDays}
                                    </FrostDays>
                                </StyledParameter>
                            ) : null}
                        </ParameterGroup>
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
