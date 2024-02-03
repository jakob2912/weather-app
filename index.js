//Weather App

const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');

const APIKey = "b350ba31c1a81e9cbd4a0c79eaa1d9b3";

weatherForm.addEventListener('submit', async event => {

  event.preventDefault();

  const city = cityInput.value;

  if(city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }
    catch(error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError(`Please enter a city`);
  }
});

async function getWeatherData(city) {
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

  const response = await fetch(apiUrl);

  if(!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

function displayWeatherInfo(data) {

  const { name: city, 
          main: {temp, humidity}, 
          weather: [{description, id}]} = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descriptionDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C `;
  /*For Fahrenheit:
    tempDisplay.textContent = `${((temp - 273.15)* 9 / 5 + 32).toFixed(1)}°F `;
  */
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descriptionDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descriptionDisplay.classList.add("descriptionDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descriptionDisplay);
  card.appendChild(weatherEmoji);

}

function getWeatherEmoji (weatherId){
  switch(true) {
    case (weatherId >= 200 && weatherId < 300):
      return "⛈️";
    case (weatherId >= 300 && weatherId < 400):
      return "🌧️";
    case (weatherId >= 500 && weatherId < 600):
      return "🌧️";
    case (weatherId >= 600 && weatherId < 700):
      return "❄️";
    case ((weatherId >= 700 && weatherId < 800) && weatherId != 781):
      return "🌫️";
    case (weatherId == 781):
      return "🌪️";
    case (weatherId == 800):
      return "☀️";
    case (weatherId == 801):
      return "🌤️";
    case (weatherId == 802):
      return "⛅";
    case (weatherId == 803):
      return "🌥️";
    case (weatherId <= 804 && weatherId <= 809):
      return "☁️";
    default: 
      return "❓";
  }
}

function displayError(message) {

  const errorDisplay = document.createElement('p');
  errorDisplay.textContent = message;
  errorDisplay.classList.add('errorDisplay');

  card.textContent = '';
  card.style.display = 'flex';
  card.appendChild(errorDisplay);
}