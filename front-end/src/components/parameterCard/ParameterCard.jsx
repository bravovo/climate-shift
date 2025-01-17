import { useAtomValue } from "jotai";
import { climateDataAtom, langAtom } from "../../atoms";
import PropTypes from "prop-types";
import {
    StyledContainer,
    Title3,
    ParameterGroup,
    FrostDays,
    StyledParameter,
} from "./ParameterCard.styles";
import { useEffect, useState } from "react";
import Parameter from "../parameter/Parameter";

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
        <StyledContainer $variant={variant}>
            <Title3>
                {climateData.parameters[lang][property].longname} (
                {climateData.parameters[lang][property].units})
            </Title3>
            <div>
                {parameters.map((value, index) => {
                    return (
                        <ParameterGroup key={index}>
                            {climateData.AVERAGES[value] ? (
                                <Parameter
                                    content={[
                                        climateData.parameters[lang].metrics
                                            .avg,
                                        climateData.AVERAGES[value],
                                    ]}
                                />
                            ) : null}
                            {climateData.MAX[value] ? (
                                <Parameter
                                    content={[
                                        climateData.parameters[lang].metrics
                                            .max,
                                        climateData.MAX[value].value,
                                        climateData.MAX[value].date,
                                    ]}
                                />
                            ) : null}
                            {climateData.MIN[value] ? (
                                <Parameter
                                    content={[
                                        climateData.parameters[lang].metrics
                                            .min,
                                        climateData.MIN[value].value,
                                        climateData.MIN[value].date,
                                    ]}
                                />
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
