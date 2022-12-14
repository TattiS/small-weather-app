//const axios = require("axios").default;

let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";

let currentLocationButton = document.querySelector("#current-location-button");
let search = document.querySelector("#search-form");

let date = document.querySelector("#date");
let dateNow = new Date();
date.innerHTML = dateNow.toDateString();

function findByCity(event) {
  let cityInput = document.querySelector("#city-input").value;
  let city = document.querySelector("#city");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let temp = document.querySelector("#temperature");
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then((response) => {
    city.innerHTML = response.data.name;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = response.data.wind.speed;
    temp.innerHTML = Math.round(response.data.main.temp);
  });
}

function setCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition((position) => {
    let city = document.querySelector("#city");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let temp = document.querySelector("#temperature");
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then((response) => {
      city.innerHTML = response.data.name;
      humidity.innerHTML = response.data.main.humidity;
      wind.innerHTML = response.data.wind.speed;
      temp.innerHTML = Math.round(response.data.main.temp);
    });
  });
}
currentLocationButton.addEventListener("click", setCurrentPosition);
search.addEventListener("submit", findByCity);
currentLocationButton.click();
