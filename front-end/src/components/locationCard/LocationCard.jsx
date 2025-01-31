import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    Paragraph,
    ParagraphContainer,
    MainInfoContainer,
    MapTitle,
    MapContainer,
    TextInfoContainer,
    UpperContainer,
    LocationChoose,
    LocationButtons,
    ParagraphExtended,
    LocationButton,
} from "./LocationCard.styles";
import LeafletMap from "../leafletMap/LeafletMap";
import { useEffect, useState } from "react";
import { fetchCoords } from "../../state/coords/coordsSlice";
import { toggleLoader } from "../../state/loader/loaderSlice";

const langPref = {
    eng: {
        title: "Selected location short description",
        city: "City",
        country: "Country",
        lat: "Latitude",
        lng: "Longitude",
    },
    ukr: {
        title: "Короткий опис обраної локації",
        city: "Місто",
        country: "Країна",
        lat: "Широта",
        lng: "Довгота",
    },
};

const LocationCard = () => {
    const monthlyClimateData = useSelector((state) => state.monthlyClimateData);
    const coords = useSelector((state) => state.coords);
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.dataLang);
    const [leafletCenter, setLeafletCenter] = useState([
        parseFloat(coords.lat),
        parseFloat(coords.lng),
    ]);

    useEffect(() => {
        setLeafletCenter([parseFloat(coords.lat), parseFloat(coords.lng)]);
    }, [monthlyClimateData]);

    const handleNextLocationButtonClick = () => {
        dispatch(toggleLoader(true));
        dispatch(
            fetchCoords({
                city: coords.city,
                depth: coords.results.current + 1,
            })
        );
    };

    const handlePreviousLocationButtonClick = () => {
        dispatch(toggleLoader(true));
        dispatch(
            fetchCoords({
                city: coords.city,
                depth: coords.results.current - 1,
            })
        );
    };

    return (
        <Container>
            <UpperContainer>
                <TextInfoContainer>
                    <h2>{langPref[lang].title}</h2>
                    <MainInfoContainer>
                        <ParagraphContainer>
                            <Paragraph>{langPref[lang].city}</Paragraph>
                            <hr />
                            <ParagraphExtended>{coords.city}</ParagraphExtended>
                        </ParagraphContainer>
                        <ParagraphContainer>
                            <Paragraph>{langPref[lang].country}</Paragraph>
                            <hr />
                            <ParagraphExtended>
                                {coords.country}
                            </ParagraphExtended>
                        </ParagraphContainer>
                        <ParagraphContainer>
                            <Paragraph>{langPref[lang].lat}</Paragraph>
                            <hr />
                            <ParagraphExtended>{coords.lat}</ParagraphExtended>
                        </ParagraphContainer>
                        <ParagraphContainer>
                            <Paragraph>{langPref[lang].lng}</Paragraph>
                            <hr />
                            <ParagraphExtended>{coords.lng}</ParagraphExtended>
                        </ParagraphContainer>
                    </MainInfoContainer>
                </TextInfoContainer>
                <LocationChoose>
                    <h3>Кількість схожих локацій: {coords.results.total}</h3>
                    <LocationButtons>
                        <LocationButton
                            onClick={handleNextLocationButtonClick}
                            disabled={
                                coords.results.current + 1 ===
                                coords.results.total
                                    ? true
                                    : false
                            }
                        >
                            Наступна локація
                        </LocationButton>
                        <LocationButton
                            onClick={handlePreviousLocationButtonClick}
                            disabled={coords.results.current ? false : true}
                        >
                            Попередня локація
                        </LocationButton>
                    </LocationButtons>
                </LocationChoose>
            </UpperContainer>
            <MapContainer>
                <MapTitle>Карта місцевості</MapTitle>
                {coords.lat && <LeafletMap center={leafletCenter} />}
            </MapContainer>
        </Container>
    );
};

export default LocationCard;
