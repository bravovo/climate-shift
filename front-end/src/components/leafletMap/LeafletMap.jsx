import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import Legend from "../mapLegend/MapLegend";
import { useEffect } from "react";
import { StyledH3 } from "./LeafletMap.styles";

const OPENWEATHERMAP_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

function SetView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
}

const legendParameters = {
    temp_new: {
        colors: `
        rgb(159, 85, 181) 0%,
        rgb(44, 106, 187) 8.75%,
        rgb(82, 139, 213) 12.5%,
        rgb(103, 163, 222) 18.75%,
        rgb(142, 202, 240) 25%,
        rgb(155, 213, 244) 31.25%,
        rgb(172, 225, 253) 37.5%,
        rgb(194, 234, 255) 43.75%,
        rgb(255, 255, 208) 50%,
        rgb(254, 248, 174) 56.25%,
        rgb(254, 232, 146) 62.5%,
        rgb(254, 226, 112) 68.75%,
        rgb(253, 212, 97) 75%,
        rgb(244, 168, 94) 82.5%,
        rgb(244, 129, 89) 87.5%,
        rgb(244, 104, 89) 93.75%,
        rgb(244, 76, 73) 100%
        `,
        numbers: [-40, -20, 0, 20, 40],
    },
};

const LeafletMap = ({ center, date, parameter, isPlain = true }) => {
    useEffect(() => {
        console.log("IN LEAFLET ---", isPlain, Number(date));
    });
    return (
        <div>
            <MapContainer
                center={center}
                zoom={isPlain ? 13 : 5}
                style={{ position: "relative" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {!isPlain && (
                    <TileLayer
                        url={`https://tile.openweathermap.org/map/${parameter}/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}&date=${new Date(
                            date - 7200
                        ).getTime()}`}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                )}

                <Marker position={center}>
                    <Popup>
                        {center[0]}, {center[1]}
                    </Popup>
                </Marker>
                <SetView coords={center} />
                {!isPlain && (
                    <Legend
                        colors={legendParameters[parameter].colors}
                        numbers={legendParameters[parameter].numbers}
                    />
                )}
                {!isPlain && (
                    <StyledH3>
                        {new Date(Number(date) * 1000).toLocaleDateString(
                            "uk-UA",
                            {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            }
                        )}
                    </StyledH3>
                )}
            </MapContainer>
        </div>
    );
};

SetView.propTypes = {
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
};

LeafletMap.propTypes = {
    center: PropTypes.arrayOf(PropTypes.number).isRequired,
    date: PropTypes.node,
    parameter: PropTypes.string,
    isPlain: PropTypes.bool,
};

export default LeafletMap;
