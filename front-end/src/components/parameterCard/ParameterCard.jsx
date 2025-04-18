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
import { useSelector } from "react-redux";

const ParameterCard = ({ property, parameters }) => {
    const [variant, setVariant] = useState("1");
    const climateData = useSelector((state) => state.monthlyClimateData);
    const lang = useSelector((state) => state.dataLang);

    useEffect(() => {
        if (property === "T2M" || property === "TS") {
            setVariant("3");
        } else if (property === "WS2M") {
            setVariant("2");
        }
    }, []);

    return (
        <StyledContainer $variant={variant}>
            <Title3>
                {climateData.parameters[lang][property].longname}
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
                            {property === "FROST_DAYS" ? (
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
