import { useSelector } from "react-redux";
import ClimateChart from "../climateChart/ClimateChart";
import { useState } from "react";

import {
    ComboChartContainer,
    DefaultChartsContainer,
    StyledHorizontal,
    YearStatsContainer,
} from "./YearsStats.styles";
import Dashboard from "../dashboard/Dashboard";
import Select from "../select/Select";

const YearsStats = () => {
    const yearsClimateData = useSelector((state) => state.yearsClimateData);
    const lang = useSelector((state) => state.dataLang);
    const [comboboxValue, setComboboxValue] = useState(
        yearsClimateData.parameters[lang]["PRECTOTCORR"].longname
    );
    const [climateChartParam, setClimateChartParam] = useState({
        value: yearsClimateData.AVERAGES.PRECTOTCORR,
    });

    const options = [
        {
            parameter:
                yearsClimateData.parameters[lang]["PRECTOTCORR"].longname,
            value: yearsClimateData.AVERAGES.PRECTOTCORR,
        },
        {
            parameter: yearsClimateData.parameters[lang]["RH2M"].longname,
            value: yearsClimateData.AVERAGES.RH2M,
        },
        {
            parameter: yearsClimateData.parameters[lang]["WS2M"].longname,
            value: yearsClimateData.AVERAGES.WS2M,
        },
        {
            parameter: yearsClimateData.parameters[lang]["PS"].longname,
            value: yearsClimateData.AVERAGES.PS,
        },
        {
            parameter: yearsClimateData.parameters[lang]["FROST_DAYS"].longname,
            value: yearsClimateData.AVERAGES.FROST_DAYS,
        },
    ];

    const formatClimateChartData = () => {
        const paramArray = [];
        for (const obj of options) {
            paramArray.push(obj.parameter);
        }

        return paramArray;
    };

    const formatDashboardData = () => {
        let returnObj = {
            years: yearsClimateData.parameters.years,
            parameters: [],
            values: [],
        };

        for (const [paramName, paramData] of Object.entries(yearsClimateData)) {
            if (
                [
                    "AVERAGES",
                    "fetched",
                    "lat",
                    "lng",
                    "city",
                    "parameters",
                ].includes(paramName)
            ) {
                continue;
            }
            returnObj.parameters.push(
                yearsClimateData.parameters[lang][paramName].longname
            );
            let yearIndex = 0;
            for (const [date, value] of Object.entries(paramData)) {
                returnObj.values.push({
                    year: yearsClimateData.parameters.years[yearIndex],
                    month: yearsClimateData.parameters[lang].months[
                        date.slice(0, 2)
                    ],
                    [lang]: {
                        ...[lang],
                        [yearsClimateData.parameters[lang][paramName].longname]:
                            value,
                    },
                });
                if (date.slice(0, 2) === "12") {
                    yearIndex = yearIndex === 9 ? 0 : yearIndex + 1;
                }
            }
        }
        return returnObj;
    };

    let data = formatDashboardData();
    let chartData = formatClimateChartData();

    const handleComboBoxChange = (value) => {
        setComboboxValue(value);

        for (const obj of options) {
            if (obj.parameter === value) {
                setClimateChartParam(obj.value);
                break;
            }
        }
    };

    return (
        yearsClimateData.fetched && (
            <YearStatsContainer>
                <h2>Дані за період з 2014 до 2023 року</h2>
                <DefaultChartsContainer>
                    <ClimateChart
                        property={[
                            yearsClimateData.parameters[lang]["T2M"].longname,
                            yearsClimateData.parameters[lang]["TS"].longname,
                        ]}
                        parameters={[
                            yearsClimateData.AVERAGES.T2M,
                            yearsClimateData.AVERAGES.TS,
                        ]}
                        colors={["rgba(75,192,192,1)", "rgba(75,192,75,1)"]}
                    />
                    <StyledHorizontal />
                    <ClimateChart
                        property={[
                            yearsClimateData.parameters[lang]["T2M_MIN"]
                                .longname,
                            yearsClimateData.parameters[lang]["T2M_MAX"]
                                .longname,
                        ]}
                        parameters={[
                            yearsClimateData.AVERAGES.T2M_MIN,
                            yearsClimateData.AVERAGES.T2M_MAX,
                        ]}
                        colors={["rgba(192,75,192,1)", "rgba(192,75,75,1)"]}
                    />
                </DefaultChartsContainer>
                <ComboChartContainer>
                    <Select
                        data={chartData}
                        onChange={handleComboBoxChange}
                    />
                    <ClimateChart
                        property={[comboboxValue]}
                        parameters={[climateChartParam]}
                        colors={["rgba(75,192,75,1)"]}
                    />
                </ComboChartContainer>
                <div>
                    <Dashboard data={data} />
                </div>
            </YearStatsContainer>
        )
    );
};

export default YearsStats;
