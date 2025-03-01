import { useSelector } from "react-redux";
import ClimateChart from "../climateChart/ClimateChart";
import { useEffect, useState } from "react";

import {
    ComboChartContainer,
    DefaultChartsContainer,
    MapParamsContainer,
    StyledH3,
    StyledHorizontal,
    YearStatsContainer,
} from "./YearsStats.styles";
import Dashboard from "../dashboard/Dashboard";
import Select from "../select/Select";
import LeafletMap from "../leafletMap/LeafletMap";
// import DatePick from "../datePicker/DatePicker";
import Slider from "../slider/Slider";

const langPref = {
    eng: {
        yearsDataTitle: "Data for the years",
        mapDataTitle: 'Cartographic data available from 01.01.2020'
    },
    ukr: {
        yearsDataTitle: "Дані за роки",
        mapDataTitle: 'Картографічні дані доступні від 01.01.2020',
    },
};

const YearsStats = () => {
    const yearsClimateData = useSelector((state) => state.yearsClimateData);
    const lang = useSelector((state) => state.dataLang);
    const coords = useSelector((state) => state.coords);
    const [leafletCenter, setLeafletCenter] = useState([
        parseFloat(coords.lat),
        parseFloat(coords.lng),
    ]);
    const [comboboxValue, setComboboxValue] = useState(
        yearsClimateData.parameters[lang]["PRECTOTCORR"].longname
    );
    const [climateChartParam, setClimateChartParam] = useState({
        value: yearsClimateData.AVERAGES.PRECTOTCORR,
    });

    const [mapParameter, setMapParameter] = useState("temp_new");
    // const [mapDate, setMapDate] = useState(new Date().getTime());
    const [sliderValue, setSliderValue] = useState(
        new Date(1577882164000).getTime()
    );

    useEffect(() => {
        setLeafletCenter([parseFloat(coords.lat), parseFloat(coords.lng)]);
        console.log("IN YEARS STATS ---", sliderValue);
    }, [coords]);

    const openWeatherMapLayersOptions = [
        {
            parameter: "temp_new",
            name: { eng: "Temperature (°C)", ukr: "Температура (°C)" },
        },
        { parameter: "wind_new", name: { eng: "Wind (m/s)", ukr: "Вітер (м/с)" } },
        { parameter: "pressure_new", name: { eng: "Pressure (mmHg)", ukr: "Тиск (мм.рт.ст)" } },
        {
            parameter: "precipitation_new",
            name: { eng: "Precipitation (mm/h)", ukr: "Кількість опадів (мм/год)" },
        },
        { parameter: "clouds_new", name: { eng: "Clouds (%)", ukr: "Хмари (%)" } },
    ];

    const formatMapData = (takeParams) => {
        const returnArray = [];
        for (const element of openWeatherMapLayersOptions) {
            if (takeParams) {
                returnArray.push(element.parameter);
            } else {
                returnArray.push(element.name[lang]);
            }
        }
        return returnArray;
    };

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
                    "loading",
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

    const handleMapParamChange = (value) => {
        for (const element of openWeatherMapLayersOptions) {
            if (element.name[lang] === value) {
                setMapParameter(element.parameter);
                break;
            }
        }
    };

    // const handleDateChange = (value) => {
    //     console.log(value.getTime());
    //     setMapDate(value.getTime());
    //     setSliderValue(value.getTime());
    // };

    return (
        <YearStatsContainer>
            <h2>{langPref[lang].yearsDataTitle}</h2>
            <MapParamsContainer>
                <StyledH3>{langPref[lang].mapDataTitle}</StyledH3>
                {/* <DatePick onChange={handleDateChange} /> */}
                <div style={{ marginBottom: "20px", zIndex: "99999" }}>
                    <Select
                        data={formatMapData(false)}
                        onChange={handleMapParamChange}
                    />
                </div>
                <Slider
                    mapDate={1577882164000}
                    onChange={(value) =>
                        setSliderValue(new Date(value).getTime())
                    }
                />
                <LeafletMap
                    parameter={mapParameter}
                    center={leafletCenter}
                    isPlain={false}
                    date={Number(sliderValue / 1000)}
                />
            </MapParamsContainer>
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
                        yearsClimateData.parameters[lang]["T2M_MIN"].longname,
                        yearsClimateData.parameters[lang]["T2M_MAX"].longname,
                    ]}
                    parameters={[
                        yearsClimateData.AVERAGES.T2M_MIN,
                        yearsClimateData.AVERAGES.T2M_MAX,
                    ]}
                    colors={["rgba(192,75,192,1)", "rgba(192,75,75,1)"]}
                />
            </DefaultChartsContainer>
            <ComboChartContainer>
                <Select data={chartData} onChange={handleComboBoxChange} />
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
    );
};

export default YearsStats;
