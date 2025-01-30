import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
`;

export const UpperContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const LocationChoose = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const TextInfoContainer = styled.div`
    width: 600px;
    padding: 0.6em 1.2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    background-color: #2f7a78;
    border-radius: 10px;

    & h2 {
        width: 100%;
        margin: 0;
        font-size: 2em;
        border-bottom: 2px solid #1d5a67;
        padding-bottom: 10px;
    }
`;

export const LocationButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const MapContainer = styled.div`
    width: 100%;
`;

export const MainInfoContainer = styled.div`
    width: 100%;
`;

export const Paragraph = styled.p`
    font-size: 1.2em;
    font-weight: 500;
`;

export const ParagraphExtended = styled(Paragraph)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    text-align: right;
`;

export const ParagraphContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    & hr {
        flex-grow: 1;
        border: none;
        border-top: 2px solid white;
        border-radius: 10px;
    }
`;

export const MapTitle = styled.h2`
    margin-top: 0;
`;
