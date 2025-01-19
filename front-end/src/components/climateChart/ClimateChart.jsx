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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ClimateChart = () => {
    const yearsClimateData = useSelector((state) => state.yearsClimateData);
    const lang = useSelector((state) => state.dataLang);

    const chartData = {
        labels: [...Object.keys(yearsClimateData.AVERAGES.T2M)],
        datasets: [
            {
                label: `${yearsClimateData.parameters[lang]["temp"].longname} (${yearsClimateData.parameters[lang]["temp"].units})`,
                data: Object.values(yearsClimateData.AVERAGES.T2M),
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: false,
            },
            {
                label: `${yearsClimateData.parameters[lang]["surfaceTemp"].longname} (${yearsClimateData.parameters[lang]["surfaceTemp"].units})`,
                data: Object.values(yearsClimateData.AVERAGES.TS),
                borderColor: "rgba(50,25,150,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#FFFFFF",
                },
            },
            title: {
                display: true,
                text: "Climate Data Over Years",
                color: "#FFFFFF",
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

export default ClimateChart;
