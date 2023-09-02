let currentDate = new Date();

function weatherApp(current) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = document.querySelector("#currentDay");
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  currentDay.innerHTML = `${day}  ${hour}:${minutes}`;
}
console.log(weatherApp(currentDate));

function showWeather(response) {
  console.log(response.data.name);
  celsius = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", "response.data.weather[0].description;");
}
function searchCity(city) {
  let apiKey = "3b023fa8d83fa415d28d3003da677334";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);
let celsius = null;
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  let fahrenheitLink = (temperature.innerHTML * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitLink);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = Math.round(celsius);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
searchCity("Cape Town");
