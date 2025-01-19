const apiKey = "330e9eb36dbb6f64e843784bcf91b0fc";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

function getWeatherIcon(weatherCondition) {
    switch (weatherCondition) {
        case 'Clear':
            return 'img/clear.png';
            case 'Mist':
            return 'img/mist.png';
        case 'Clouds':
            return 'img/clouds.png';
        case 'Cloudy':
            return 'img/cloudy.png';
        case 'Rain':
            return 'img/rain.png';
            case 'Snow':
                return 'img/snow.png';
        default:
            return 'img/unknown.png';
    }
}


async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
  
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".desc").innerHTML = data.weather[0].description;
        document.querySelector(".temp").innerHTML = data.main.temp + "°F";
        document.querySelector(".feels_like").innerHTML = data.main.feels_like + "°F";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " mph";

        document.querySelector(".weather").style.display = "block";

        const weatherCondition = data.weather[0].main;
        const weatherIconUrl = getWeatherIcon(weatherCondition);
        weatherIcon.setAttribute('src', weatherIconUrl);
        weatherIcon.setAttribute('alt', weatherCondition);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('THIS ISNT A FUCKING CITY!!!!!');
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    searchBox.value = '';
});

