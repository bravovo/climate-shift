import { atom } from 'jotai';

export const defaultCitiesAtom = atom([
    "Paris",
    "Los Angeles",
    "New York",
    "London",
    "Kyiv",
    "Madrid",
    "Oslo",
    "Tokyo",
    "Canberra",
    "Cape Town",
]);

export const legendParametersAtom = atom({
    temp_new: {
        colors: `
        to right,
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
    pressure_new: {
        colors: `to right, rgb(0, 115, 255) 0%,
        rgb(0, 170, 255) 8.35059%,
        rgb(75, 208, 214) 24.9192%,
        rgb(141, 231, 199) 41.4879%,
        rgb(176, 247, 32) 49.7722%,
        rgb(240, 184, 0) 58.0565%,
        rgb(251, 85, 21) 74.6251%,
        rgb(243, 54, 59) 91.1938%,
        rgb(198, 0, 0) 100%`,
        numbers: [712, 735, 757, 780, 802],
    },
    wind_new: {
        colors: `to left,
        rgb(158, 128, 177),
        rgba(116, 76, 172, 0.9),
        rgb(164, 123, 170),
        rgba(170, 128, 177, 0.84),
        rgba(176, 128, 177, 0.71),
        rgba(170, 128, 177, 0.54),
        rgba(170, 128, 177, 0.44),
        rgba(255, 255, 0, 0)`,
        numbers: [0, 2, 3, 6, 12, 25, 50, 100],
    },
    clouds_new: {
        colors: `to right,
        rgba(247, 247, 255, 0) 0%,
        rgba(251, 247, 255, 0) 10%,
        rgba(244, 248, 255, 0.1) 20%,
        rgba(240, 249, 255, 0.2) 30%,
        rgba(221, 250, 255, 0.4) 40%,
        rgba(224, 224, 224, 0.9) 50%,
        rgba(224, 224, 224, 0.76) 60%,
        rgba(228, 228, 228, 0.9) 70%,
        rgba(232, 232, 232, 0.9) 80%,
        rgb(214, 213, 213) 90%,
        rgb(210, 210, 210) 95%,
        rgb(183, 183, 183) 100%`,
        numbers: [0, 25, 50, 75, 100]
    },
    precipitation_new: {
        colors: `to right,
        rgba(225, 200, 100, 0),
        rgba(200, 150, 150, 0),
        rgba(150, 150, 170, 0),
        rgba(120, 120, 190, 0),
        rgba(110, 110, 205, 0.3),
        rgba(80, 80, 225, 0.7),
        rgba(20, 20, 255, 0.9)`,
        numbers: [0, 0.1, 0.2, 0.5, 1, 10, 140],
    }
});