import axios from "axios";
import { useEffect, useState } from "react";
import Select from "../select/Select";
import { useSelector } from "react-redux";
import { Container } from "./ClimateMap.styles";

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
                    `http://localhost:5000/api/forecast/${chosenParameter}`,
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
            } catch (error) {
                console.log(error);
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
