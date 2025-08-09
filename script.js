document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('search-button').addEventListener('click', fetchWeather);

    function fetchWeather() {
        const userInput = document.getElementById('city-input').value;
        const apiKey = '5bc4a29242c5b1039483f2707fa5f54c'; // Replace with your actual API key

        // We'll assume the country is the US for now.
        const countryCode = 'us';

        // Check if the user entered a comma (e.g., "Clarksburg, WV")
        let query;
        if (userInput.includes(',')) {
            // If there's a comma, we use the input as-is and add the country code.
            // Example: 'Clarksburg,WV,us'
            query = `${userInput},${countryCode}`;
        } else {
            // If there's no comma, we assume they only entered the city name.
            // Example: 'New York,us'
            query = `${userInput},${countryCode}`;
        }

        // We use the query variable in our API URL
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=imperial`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found. Please check your spelling or format (e.g., "Clarksburg, WV").');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                document.getElementById('weather-display').innerHTML = `<p>${error.message}</p>`;
            });
    }

    function displayWeather(data) {
        const weatherDisplay = document.getElementById('weather-display');
        
        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const tempMax = data.main.temp_max;
        const tempMin = data.main.temp_min;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

        weatherDisplay.innerHTML = `
            <div class="weather-info">
                <h2>${data.name}</h2>
                <p><strong>Description:</strong> <img src="${iconUrl}" alt="${description}"> ${description}</p>
                <p><strong>Temperature:</strong> ${temp}°F</p>
                <p><strong>Feels like:</strong> ${feelsLike}°F</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} mph</p>
                <p><strong>High:</strong> ${tempMax}°F</p>
                <p><strong>Low:</strong> ${tempMin}°F</p>
            </div>
        `;
    }

});
