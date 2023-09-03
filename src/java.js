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

function getForecast(coorinates) {
  console.log(coorinates);
  let apiKey = `o3380fbba4a2286659094de1450tf309`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coorinates.lat}&lon=${coorinates.lon}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

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
  getForecast(response.data.coord);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                ${formatDay(forecastDay.time)}
                <div>
                  <img
                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                      forecastDay.condition.icon
                    }.png"
                    alt=""
                    width="30" />
                  <div class="weather-forecast-temperature">
                    <span class="minimum-temp">${Math.round(
                      forecastDay.temperature.minimum
                    )}°</span>
                    <span class="maximum-temp">${Math.round(
                      forecastDay.temperature.maximum
                    )}°</span>
                  </div>
                </div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

searchCity("Cape Town");
