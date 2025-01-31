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
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.dataLang);
    const [leafletCenter, setLeafletCenter] = useState([
        parseFloat(monthlyClimateData.lat),
        parseFloat(monthlyClimateData.lng),
    ]);

    useEffect(() => {
        setLeafletCenter([
            parseFloat(monthlyClimateData.lat),
            parseFloat(monthlyClimateData.lng),
        ]);
    }, [monthlyClimateData]);

    const handleNextLocationButtonClick = () => { 
        dispatch(fetchCoords({ city: monthlyClimateData.city, depth: monthlyClimateData.results.current + 1 }));
    };

    const handlePreviousLocationButtonClick = () => { 
        dispatch(fetchCoords({ city: monthlyClimateData.city, depth: monthlyClimateData.results.current - 1 }));
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
                            <ParagraphExtended>
                                {monthlyClimateData.city}
                            </ParagraphExtended>
                        </ParagraphContainer>
                        <ParagraphContainer>
                            <Paragraph>{langPref[lang].country}</Paragraph>
                            <hr />
                            <ParagraphExtended>
                                {monthlyClimateData.country}
                            </ParagraphExtended>
                        </ParagraphContainer>
                        <ParagraphContainer>
                            <Paragraph>{langPref[lang].lat}</Paragraph>
                            <hr />
                            <ParagraphExtended>
                                {monthlyClimateData.lat}
                            </ParagraphExtended>
                        </ParagraphContainer>
                        <ParagraphContainer>
                            <Paragraph>{langPref[lang].lng}</Paragraph>
                            <hr />
                            <ParagraphExtended>
                                {monthlyClimateData.lng}
                            </ParagraphExtended>
                        </ParagraphContainer>
                    </MainInfoContainer>
                </TextInfoContainer>
                <LocationChoose>
                    <h3>
                        Кількість схожих локацій:{" "}
                        {monthlyClimateData.results.total}
                    </h3>
                    <LocationButtons>
                        <LocationButton onClick={handleNextLocationButtonClick}
                            disabled={
                                monthlyClimateData.results.current + 1 ===
                                monthlyClimateData.results.total
                                    ? true
                                    : false
                            }
                        >
                            Наступна локація
                        </LocationButton>
                        <LocationButton
                            onClick={handlePreviousLocationButtonClick}
                            disabled={
                                monthlyClimateData.results.current
                                    ? false
                                    : true
                            }
                        >
                            Попередня локація
                        </LocationButton>
                    </LocationButtons>
                </LocationChoose>
            </UpperContainer>
            <MapContainer>
                <MapTitle>Карта місцевості</MapTitle>
                {monthlyClimateData.lat && (
                    <LeafletMap center={leafletCenter} />
                )}
            </MapContainer>
        </Container>
    );
};

export default LocationCard;
