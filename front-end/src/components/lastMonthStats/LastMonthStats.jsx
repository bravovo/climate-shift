import PropTypes from "prop-types";
import ParameterCard from "../parameterCard/ParameterCard";
import {
    StyledLastMonthStats,
    StyledParameterCardsContainer,
} from "./LastMonthStats.styles";

const LastMonthStats = ({fetchedCity}) => {
    return (
        <StyledLastMonthStats>
            <h2>Статистика за минулий місяць для {fetchedCity}</h2>
            <StyledParameterCardsContainer>
                <ParameterCard property="T2M" parameters={["T2M"]} />
                <ParameterCard property="TS" parameters={["TS"]} />
                <ParameterCard property="WS2M" parameters={["WS2M"]} />
                <ParameterCard property="PS" parameters={["PS"]} />
                <ParameterCard
                    property="PRECTOTCORR"
                    parameters={["PRECTOTCORR"]}
                />
                <ParameterCard property="RH2M" parameters={["RH2M"]} />
                <ParameterCard
                    property="FROST_DAYS"
                    parameters={["FROST_DAYS"]}
                />
            </StyledParameterCardsContainer>
        </StyledLastMonthStats>
    );
};

LastMonthStats.propTypes = {
    fetchedCity: PropTypes.string.isRequired
};

export default LastMonthStats;
