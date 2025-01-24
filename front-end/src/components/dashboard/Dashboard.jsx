import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";

import { Container, SelectContainer } from "./Dashboard.styles";
import Select from "../select/Select";

const Dashboard = ({ data }) => {
    const lang = useSelector((state) => state.dataLang);
    const [selectedYear, setSelectedYear] = useState(data.years[0]);
    const [selectedParameter, setSelectedParameter] = useState();

    useEffect(() => {
        setSelectedParameter(data.parameters[0]);
    }, [lang]);

    return (
        <Container>
            <SelectContainer>
                <Select
                    onChange={(value) => setSelectedYear(value)}
                    data={data.years}
                />
                <Select
                    onChange={(value) => setSelectedParameter(value)}
                    data={data.parameters}
                />
            </SelectContainer>
            <Plot
                data={[
                    {
                        x: data.values
                            .filter(
                                (item) => item.year === parseInt(selectedYear)
                            )
                            .map((item) => item.month),
                        y: data.values
                            .filter(
                                (item) => item.year === parseInt(selectedYear)
                            )
                            .map((item) => item[lang][selectedParameter]),
                        type: "scatter",
                        mode: "lines+markers",
                        marker: { color: "rgba(75,192,192,1)" },
                        name: `${selectedParameter}`,
                    },
                ]}
                layout={{
                    title: `${selectedYear} (${selectedParameter})`,
                    xaxis: { title: lang === "eng" ? "Month" : "Місяць" },
                    yaxis: { title: `${selectedParameter}` },
                    width: 1000,
                    height: 600,
                    paper_bgcolor: "white",
                    plot_bgcolor: "white",
                    font: {
                        family: "inherit",
                        size: 16,
                        color: "black",
                        weight: 500,
                    },
                }}
            />
        </Container>
    );
};

Dashboard.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Dashboard;
