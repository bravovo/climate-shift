import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import Legend from "../mapLegend/MapLegend";
import { useEffect } from "react";
import { StyledH3 } from "./LeafletMap.styles";
import { useAtomValue } from "jotai";
import { legendParametersAtom } from "../../atoms";

const OPENWEATHERMAP_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

function SetView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
}

const LeafletMap = ({ center, date, parameter, isPlain = true }) => {
    const legendParameters = useAtomValue(legendParametersAtom);

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
