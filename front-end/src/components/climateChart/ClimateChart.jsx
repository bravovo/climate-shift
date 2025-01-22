import { useSelector } from "react-redux";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const backgroundColor = "rgba(0,0,0,0)";

const ClimateChart = ({ property, parameters, colors }) => {
    const yearsClimateData = useSelector((state) => state.yearsClimateData);
    const lang = useSelector((state) => state.dataLang);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        let dataset = [];
        property.forEach((element, index) => {
            dataset.push({
                label: `${yearsClimateData.parameters[lang][element].longname}`,
                data: [...Object.values(parameters[index])],
                borderColor: colors[index],
                backgroundColor: backgroundColor,
                fill: false,
            });
        });

        const chart = {
            labels: [...Object.keys(parameters[0])],
            datasets: dataset,
        };
        setChartData(chart);
    }, [property, parameters, colors, yearsClimateData, lang]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#FFFFFF",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#FFFFFF",
                },
            },
            y: {
                ticks: {
                    color: "#FFFFFF",
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

ClimateChart.propTypes = {
    property: PropTypes.arrayOf(PropTypes.node).isRequired,
    parameters: PropTypes.arrayOf(PropTypes.object).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ClimateChart;