const allWeatherIcons = import.meta.glob('../assets/icons/*.png', { eager: true });

export function getWeatherIcon(imageName) {
    const imageKey = `../assets/icons/${imageName}`;

    return allWeatherIcons[imageKey]?.default || allWeatherIcons['../assets/icons/unknown.png']?.default;
}
