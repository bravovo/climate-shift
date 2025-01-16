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
    ParameterValueDate
} from "./ParameterCard.styles";
import { useEffect, useState } from "react";

const ParameterCard = ({ property, parameters }) => {
    const [variant, setVariant] = useState("1");
    const climateData = useAtomValue(climateDataAtom);
    const lang = useAtomValue(langAtom);

    useEffect(() => {
        if (property === "temp" || property === "surfaceTemp") {
            setVariant("3");
        } else if (property === "windSpeed") {
            setVariant("2");
        }
    }, []);

    return (
        <StyledContainer variant={variant}>
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
                                    <ParameterLabel>
                                        {
                                            climateData.parameters[lang].metrics
                                                .avg
                                        }
                                    </ParameterLabel>
                                    <ParameterValue>
                                        {climateData.AVERAGES[value]}
                                    </ParameterValue>
                                </StyledParameter>
                            ) : null}
                            {climateData.MAX[value] ? (
                                <StyledParameter>
                                    <ParameterLabel>
                                        {
                                            climateData.parameters[lang].metrics
                                                .max
                                        }
                                    </ParameterLabel>
                                    <ParameterValue>
                                        <ParameterValueDate>{climateData.MAX[value].date}</ParameterValueDate> | {" "}
                                        {climateData.MAX[value].value}
                                    </ParameterValue>
                                </StyledParameter>
                            ) : null}
                            {climateData.MIN[value] ? (
                                <StyledParameter>
                                    <ParameterLabel>
                                        {
                                            climateData.parameters[lang].metrics
                                                .min
                                        }
                                    </ParameterLabel>
                                    <ParameterValue>
                                        <ParameterValueDate>{climateData.MIN[value].date}</ParameterValueDate> |{" "}
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
