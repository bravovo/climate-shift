import { useSelector } from "react-redux";
import ClimateChart from "../climateChart/ClimateChart";
import ComboBox from "../combobox/Combobox";
import { useState } from "react";

import { ComboChartContainer, DefaultChartsContainer, StyledHorizontal, YearStatsContainer } from "./YearsStats.styles";

const YearsStats = () => {
    const yearsClimateData = useSelector((state) => state.yearsClimateData);
    const [comboboxValue, setComboboxValue] = useState({
        parameter: "precipitation",
        value: yearsClimateData.AVERAGES.PRECTOTCORR,
    });

    const options = [
        {
            parameter: "precipitation",
            value: yearsClimateData.AVERAGES.PRECTOTCORR,
        },
        { parameter: "humidity", value: yearsClimateData.AVERAGES.RH2M },
        { parameter: "windSpeed", value: yearsClimateData.AVERAGES.WS2M },
        { parameter: "pressure", value: yearsClimateData.AVERAGES.PS },
        { parameter: "frostDays", value: yearsClimateData.AVERAGES.FROST_DAYS },
    ];

    const handleComboBoxChange = (value) => {
        setComboboxValue(value);
    };

    return (
        yearsClimateData.fetched && (
            <YearStatsContainer>
                <h2>Дані за період з 2014 до 2023 року</h2>
                <DefaultChartsContainer>
                    <ClimateChart
                        property={["temp", "surfaceTemp"]}
                        parameters={[
                            yearsClimateData.AVERAGES.T2M,
                            yearsClimateData.AVERAGES.TS,
                        ]}
                        colors={["rgba(75,192,192,1)", "rgba(75,192,75,1)"]}
                    />
                    <StyledHorizontal />
                    <ClimateChart
                        property={["minTemp", "maxTemp"]}
                        parameters={[
                            yearsClimateData.AVERAGES.T2M_MIN,
                            yearsClimateData.AVERAGES.T2M_MAX,
                        ]}
                        colors={["rgba(192,75,192,1)", "rgba(192,75,75,1)"]}
                    />
                </DefaultChartsContainer>
                <ComboChartContainer>
                    <ComboBox
                        options={options}
                        onChange={handleComboBoxChange}
                    />
                    <ClimateChart
                        property={[comboboxValue.parameter]}
                        parameters={[comboboxValue.value]}
                        colors={["rgba(75,192,75,1)"]}
                    />
                </ComboChartContainer>
            </YearStatsContainer>
        )
    );
};

export default YearsStats;