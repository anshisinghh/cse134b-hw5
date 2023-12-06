document.addEventListener("DOMContentLoaded", function () {
    const weatherWidget = document.getElementById("weather-widget-container");
    const weatherWidgetLocation = document.getElementById("weather-widget-location");
    const locationSelector = document.getElementById("locationSelector");

    function fetchWeatherData(latitude, longitude) {
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
                weatherWidgetLocation.innerHTML = '';
                weatherWidgetLocation.appendChild(locationElement);

                const forecastLink = data.properties.forecast;
                console.log("Fetching forecast data from:", forecastLink);
                return fetch(forecastLink);
            })
            .then(response => response.json())
            .then(data => {
                console.log("Forecast data received:", data);

                const forecastPeriods = data.properties.periods.slice(0, 5);
                weatherWidget.innerHTML = '';

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
    }

    locationSelector.addEventListener("change", function () {
        const selectedLocation = locationSelector.value;
        if (selectedLocation === "LaJolla") {
            fetchWeatherData(32.8708, -117.2508); // La Jolla's coordinates
        } else if (selectedLocation === "Irvine") {
            fetchWeatherData(33.6798, -117.8674); // Irvine's coordinates
        } else if (selectedLocation === "NewYork") {
            fetchWeatherData(40.78, -73.97) // New York's coordinates
        } else if (selectedLocation === "Austin") {
            fetchWeatherData(30.32, -97.77) // Austin's coordinates
        } else if (selectedLocation === "Miami") {
            fetchWeatherData(25.79, -80.32) // Miami's coordinates
        }
    });

    fetchWeatherData(32.8708, -117.2508);
});
