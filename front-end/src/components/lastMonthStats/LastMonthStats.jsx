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
                <ParameterCard property="temp" parameters={["T2M"]} />
                <ParameterCard property="surfaceTemp" parameters={["TS"]} />
                <ParameterCard property="windSpeed" parameters={["WS2M"]} />
                <ParameterCard property="pressure" parameters={["PS"]} />
                <ParameterCard
                    property="precipitation"
                    parameters={["PRECTOTCORR"]}
                />
                <ParameterCard property="humidity" parameters={["RH2M"]} />
                <ParameterCard
                    property="frostDays"
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
