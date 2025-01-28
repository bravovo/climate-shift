import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";

function SetView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
}

const LeafletMap = ({ center }) => {
    return (
        <div>
            <MapContainer center={center} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={center}>
                    <Popup>{center[0]}, {center[1]}</Popup>
                </Marker>
                <SetView coords={center} />
            </MapContainer>
        </div>
    );
};

SetView.propTypes = {
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
};

LeafletMap.propTypes = {
    center: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default LeafletMap;
