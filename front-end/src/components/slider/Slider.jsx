import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Container } from "./Slider.styles";

const Slider = ({ mapDate, onChange }) => {
    const [sliderValue, setSliderValue] = useState(
        new Date().getTime()
    );

    const today = new Date();
    const todayTimestamp = today.getTime();

    useEffect(() => {
        if (mapDate) {
            setSliderValue(mapDate);
            console.log('IN SLIDER ---', mapDate);
        }
    }, [mapDate]);

    const handleSliderChange = (event) => {
        setSliderValue(Number(event.target.value));
        console.log(Number(event.target.value));
        onChange(Number(event.target.value));
    };

    return (
        <Container>
            <input
                type="range"
                min={mapDate}
                max={todayTimestamp}
                value={sliderValue}
                onChange={handleSliderChange}
                step={86400000}
                style={{ width: "100%" }}
            />
        </Container>
    );
};

Slider.propTypes = {
    mapDate: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Slider;
