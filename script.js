const apiKey = '711f62e772f7f1b72652548fe2d39348'; // Replace with your actual API key
const cityInput = document.getElementById('city');
const getWeatherBtn = document.getElementById('get-weather');
const weatherInfo = document.getElementById('weather-info');

getWeatherBtn.addEventListener('click', async () => {
  const city = cityInput.value;
  if (!city) {
    alert('Please enter a city name.');
    return;
  }
  
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  const weatherData = await response.json();
  
  if (weatherData.cod === '404') {
    weatherInfo.textContent = 'City not found.';
    return;
  }
  
  const weather = weatherData.weather[0].main;
  const temp = Math.floor(weatherData.main.temp - 273.15); // Convert Kelvin to Celsius
  let weatherDescription = weatherData.weather[0].description;
  let icon = weatherData.weather[0].icon;
  let imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  const weatherImage = document.createElement('img'); // Create an image element
  weatherImage.id = 'weather-icon'; // Set the id to match the HTML element
  weatherImage.src = imageURL; // Set the image source to the retrieved URL
  weatherImage.alt = weatherDescription; // Set the alt text for accessibility

  document.getElementById('weather-icon').src = imageURL;
  document.getElementById('weather-icon').style.display = 'inline'; // Make the image visible
  document.getElementById('transparent').style.display = 'none'; // Make the image invisible
  
  
  weatherInfo.textContent = `The weather in ${city} is currently ${weatherDescription} with a temperature of ${temp}°C`;
  //weatherInfo.appendChild(weatherImage); // Add the image to the weather information section
});