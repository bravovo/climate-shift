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

const langPref = {
    eng: {
        title: "Selected location short description",
        city: "City",
        country: "Country",
        lat: "Latitude",
        lng: "Longitude",
        sameLocation: 'Number of similar locations',
        nextLocationButton: 'Next location',
        prevLocationButton: 'Previous location',
        map: 'Location map',
    },
    ukr: {
        title: "Короткий опис обраної локації",
        city: "Місто",
        country: "Країна",
        lat: "Широта",
        lng: "Довгота",
        sameLocation: 'Кількість схожих локацій',
        nextLocationButton: 'Наступна локація',
        prevLocationButton: 'Попередня локація',
        map: 'Карта місцевості'
    },
};

const LocationCard = () => {
    const coords = useSelector((state) => state.coords);
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.dataLang);
    const [leafletCenter, setLeafletCenter] = useState([
        parseFloat(coords.lat),
        parseFloat(coords.lng),
    ]);

    useEffect(() => {
        setLeafletCenter([parseFloat(coords.lat), parseFloat(coords.lng)]);
    }, [coords]);

    const handleNextLocationButtonClick = () => {
        dispatch(
            fetchCoords({
                city: coords.city,
                depth: coords.results.current + 1,
            })
        );
    };

    const handlePreviousLocationButtonClick = () => {
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
                    <h3>{langPref[lang].sameLocation}: {coords.results.total}</h3>
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
                            {langPref[lang].nextLocationButton}
                        </LocationButton>
                        <LocationButton
                            onClick={handlePreviousLocationButtonClick}
                            disabled={coords.results.current ? false : true}
                        >
                            {langPref[lang].prevLocationButton}
                        </LocationButton>
                    </LocationButtons>
                </LocationChoose>
            </UpperContainer>
            <MapContainer>
                <MapTitle>{langPref[lang].map}</MapTitle>
                {coords.lat && <LeafletMap center={leafletCenter} date="1595688601" />}
            </MapContainer>
        </Container>
    );
};

export default LocationCard;
