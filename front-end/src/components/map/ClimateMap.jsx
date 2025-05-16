import axios from "axios";
import { useEffect, useState } from "react";
import Select from "../select/Select";
import { useSelector } from "react-redux";
import { Container } from "./ClimateMap.styles";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const langPref = {
    ukr: {temp: "Температура", wind: "Вітер"},
    eng: {temp: "Temperature", wind: "Wind"}
}

const ClimateMap = () => {
    const lang = useSelector((state) => state.dataLang);
    const [chosenParameter, setChosenParameter] = useState('temp');
    const [iframeSrc, setIframeSrc] = useState("");

    const changeParameter = (value) => {
        setChosenParameter(langPref[lang].wind === value ? "wind" : "temp");
    };

    useEffect(() => {
        const fetchMap = async () => {
            try {
                const serverResponse = await axios.get(
                    `${SERVER_BASE_URL}/api/forecast/${chosenParameter}`,
                    {
                        withCredentials: true,
                    }
                );

                if (serverResponse) {
                    const blob = new Blob([serverResponse.data], {
                        type: "text/html",
                    });
                    const url = URL.createObjectURL(blob);
                    setIframeSrc(url);
                }
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                console.log("");
            }

            return () => {
                if (iframeSrc) URL.revokeObjectURL(iframeSrc);
            };
        };

        fetchMap();
    }, [chosenParameter]);

    return (
        <Container>
            <Select onChange={(value) => changeParameter(value)} data={[langPref[lang].temp, langPref[lang].wind]}/>
            <iframe
                src={iframeSrc}
                style={{ width: "100%", height: "600px", border: "none" }}
            />
        </Container>
    );
};

export default ClimateMap;
