import { useEffect, useRef } from "react";
import { GradientBar, LegendContainer, LegendLabels } from "./MapLegend.styles";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMap } from "react-leaflet";
import PropTypes from "prop-types";

const Legend = ({colors, numbers}) => {
    const legendRef = useRef(null);
    const map = useMap();

    useEffect(() => {
        if (!map || !legendRef.current) return;

        const legend = L.control({ position: "bottomright" });

        legend.onAdd = function () {
            return legendRef.current;
        };

        legend.addTo(map);

        return () => {
            legend.remove();
        };
    }, [map]);

    return (
        <LegendContainer ref={legendRef}>
            <GradientBar $variant={colors}></GradientBar>
            <LegendLabels>
                {numbers.map((number) => {
                    return <span key={number}>{number}</span>;
                })}
            </LegendLabels>
        </LegendContainer>
    );
};

Legend.propTypes = {
    colors: PropTypes.string.isRequired,
    numbers: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default Legend;
