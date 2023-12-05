document.addEventListener("DOMContentLoaded", function () {
    const weatherWidget = document.getElementById("weather-widget-container");
    const weatherWidgetLocation = document.getElementById("weather-widget-location");

    // La Jolla's coordinates
    const latitude = 32.8708;
    const longitude = -117.2508;

    // Irvine's coordinates
    // const latitude = 33.6798;
    // const longitude = -117.8674;

    const apiEndpoint = `https://api.weather.gov/points/${latitude},${longitude}`;
    console.log("Fetching weather data from:", apiEndpoint);

    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            console.log("Weather data received:", data);

            const city = data.properties.relativeLocation.properties.city;
            const state = data.properties.relativeLocation.properties.state;

            const locationElement = document.createElement("p");
            locationElement.innerHTML = `${city}, ${state}`;
            weatherWidgetLocation.appendChild(locationElement);

            const forecastLink = data.properties.forecast;
            console.log("Fetching forecast data from:", forecastLink);
            return fetch(forecastLink);
        })
        .then(response => response.json())
        .then(data => {
            console.log("Forecast data received:", data);

            const forecastPeriods = data.properties.periods.slice(0, 5);
            forecastPeriods.forEach((period) => {
                const periodElement = document.createElement("div");
                periodElement.classList.add("weather-widget");

                periodElement.innerHTML = `
                    <p class="weather-date">${period.name}</p>
                    <img src="${period.icon}" alt="Weather Icon" class="weather-icon">
                    <p>Temperature: ${period.temperature} °${period.temperatureUnit}</p>
                    <p>Conditions: ${period.shortForecast}</p>
                    <p>Wind: ${period.windSpeed} ${period.windDirection}</p>
                    <p>Humidity: ${period.relativeHumidity.value}%</p>
                `;

                weatherWidget.appendChild(periodElement);
            });
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherWidget.innerHTML = "Current Weather Conditions Unavailable";
        });
});
