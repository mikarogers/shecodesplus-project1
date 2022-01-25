function formatDate(date) {
  let currentDate = date.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[date.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let currentDay = days[date.getDay()];

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay} ${currentMonth} ${currentDate}, ${currentHour}:${currentMinutes}`;
}
let currentTime = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(currentTime);

function getCurrentTemp(response) {
  let city = document.querySelector("#location");
  let cityData = response.data.name;
  let temp = document.querySelector("#current-temp");
  let tempData = Math.round(response.data.main.temp);
  let forecast = document.querySelector("#forecast");
  let forecastData = response.data.weather[0].description;
  let high = document.querySelector("#high");
  let highData = Math.round(response.data.main.temp_max);
  let low = document.querySelector("#low");
  let lowData = Math.round(response.data.main.temp_min);
  let humidity = document.querySelector("#humidity");
  let humidityData = Math.round(response.data.main.humidity);
  let windSpeed = document.querySelector("#wind-speed");
  let windSpeedData = Math.round(response.data.wind.speed);

  city.innerHTML = `${cityData}`;
  temp.innerHTML = `${tempData}°`;
  forecast.innerHTML = `${forecastData}`;
  high.innerHTML = `${highData}°`;
  low.innerHTML = `${lowData}°`;
  humidity.innerHTML = `${humidityData} %`;
  windSpeed.innerHTML = `${windSpeedData} km/h`;
}

function currentCityTemp(event) {
  event.preventDefault();

  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "3bb1078cb3d49614deb769ef35761e96";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getCurrentTemp);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button#current");
button.addEventListener("click", currentCityTemp);

function searchCityTemp(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-text-input").value;
  let apiKey = "3bb1078cb3d49614deb769ef35761e96";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentTemp);
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", searchCityTemp);
