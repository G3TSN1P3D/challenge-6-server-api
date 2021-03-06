let apiKey = "712414fd2cf8bc8e4561ac28feae38b1";
let lat;
let lon;
let x;
let y;
let currentDateUtx, wind, humidity, temp, uvIndex, weatherIcon;
let unixTimestamp, milliseconds, dateObject;

searchBtn = document.querySelector("#searchBtn");
cityName = document.querySelector("#city-name");
currentTitle = document.querySelector(".current-title");
weatherTemp = document.querySelector("#temp");
weatherWind = document.querySelector("#wind");
weatherHumidity = document.querySelector("#humidity");
weatherUv = document.querySelector("#uv");
h2Title = document.querySelector(".h2-title");

iconE = document.createElement("img");

function GetWeatherApi(lat, lon) {
  let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      let json = response.json();
      return json;
    })
    .then(function (data) {
      currentDateUtx = data.current.dt;
      wind = data.current.wind_speed;
      humidity = data.current.humidity;
      let tempK = data.current.temp;
      uvIndex = data.current.uvi;
      weatherIcon = data.current.weather[0].icon;

      temp = Math.trunc(((tempK - 273.15) * 9) / 5 + 32);
    })
    .then(getWeatherData);
}
function getDate() {
  unixTimestamp = currentDateUtx;
  milliseconds = unixTimestamp * 1000;
  dateObject = new Date(milliseconds).toDateString();
}
function getWeatherData() {
  document.querySelector(".current-weather").setAttribute("style", "visibility: visible");
  document.querySelector("#five-day-forecast").setAttribute("style", "visibility: visible");
  getDate();
  iconE.src = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
  h2Title.textContent = `${cityName.value} (${dateObject})`;

  h2Title.appendChild(iconE);

  weatherTemp.textContent = `Temp: ${temp} F\u00B0`;
  weatherWind.textContent = `Wind: ${wind} MPH`;
  weatherHumidity.textContent = `Humidity: ${humidity}%`;
  weatherUv.textContent = `UV Index: ${uvIndex}`;
}
function GetCityApi() {
  let requestUrlCity = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&limit=1&appid=${apiKey}`;
  fetch(requestUrlCity)
    .then(function (response) {
      let json = response.json();
      return json;
    })
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        x = data[i].lat;
        y = data[i].lon;
      }
    })
    .then(getLatLon);
}
function getLatLon() {
  lat = x;
  lon = y;
  GetWeatherApi(lat, lon);
}

searchBtn.addEventListener("click", GetCityApi);
