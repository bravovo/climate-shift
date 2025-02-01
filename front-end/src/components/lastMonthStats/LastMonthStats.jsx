import { useSelector } from "react-redux";
import ParameterCard from "../parameterCard/ParameterCard";
import {
    StyledLastMonthStats,
    StyledParameterCardsContainer,
} from "./LastMonthStats.styles";

const langPref = {
    eng: {
        statsTitle: 'Last month statistics',
    },
    ukr: {
        statsTitle: "Статистика за минулий місяць"
    }
}

const LastMonthStats = () => {
    const lang = useSelector((state) => state.dataLang);

    return (
        <StyledLastMonthStats>
            <h2>{langPref[lang].statsTitle}</h2>
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

export default LastMonthStats;
