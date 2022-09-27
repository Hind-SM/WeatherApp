
let now = new Date();
let day = now.getDate();
let month_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let month = now.getMonth();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();
let currentDate = `${day} ${month_array[month]} ${year}`;
let currentTime = `${hours}:${minutes}`;
let DateCard = document.querySelector("#date");
DateCard.innerHTML = `${currentDate} <br/> ${currentTime}`;

let CelsiusButton = document.querySelector("#celsius-link");
let FahrenheitButton = document.querySelector("#fahrenheit-link");
let Ctemp = (document.querySelector(".card-temperature")).innerHTML
let Ftemp = Math.round((Ctemp*(9/5))+32)
let TempCard = document.querySelector(".card-temperature")

function Celsius_to_Fahrenheit(event) {
    event.preventDefault();
    TempCard.innerHTML = Ctemp
};

function Fahrenheit_to_Celsius(event) {
    event.preventDefault
    TempCard.innerHTML = Ftemp
};

CelsiusButton.addEventListener("click", Celsius_to_Fahrenheit);
FahrenheitButton.addEventListener("click", Fahrenheit_to_Celsius);

function showWeather(response) {
    let currentCity = document.querySelector(".City_Name");
    let temperature = Math.round(response.data.main.temp);
    let cityName = response.data.name
    currentCity.innerHTML = `${cityName}`;
    TempCard.innerHTML = `${temperature}`;
    console.log(response.data);
}

function retrievePosition(position) {
    let apiKey = "4ee75d8fd0a41a9e7dfc26c980f6da70";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
}

function geolocation() {
    navigator.geolocation.getCurrentPosition(retrievePosition)
};

let Locatorbutton = document.querySelector(".LocatorButton");
Locatorbutton.addEventListener("click",geolocation);

function searchCity(event) {
    event.preventDefault();
    let input = document.querySelector("#city-input");
    let output = document.querySelector(".City_Name");
    output.innerHTML = input.value;
    let city = input.value;
    let apiKey = "4ee75d8fd0a41a9e7dfc26c980f6da70";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showWeather);
};
let SearchInput = document.querySelector("form");
SearchInput.addEventListener("submit", searchCity);
