//variables
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


//getting weather from api
function showWeather(response) {
    let currentCity = document.querySelector(".City-Name");
    let temperature = Math.round(response.data.main.temp);
    let cityName = response.data.name
    CelsiusTemp = temperature;
    currentCity.innerHTML = `${cityName}`;
    TempCard.innerHTML = `${temperature}`;
    console.log(response.data);
}
//ask user from current position 
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

//function that takes user input, then calls showweather function
function searchCity(event) {
    event.preventDefault();
    let input = document.querySelector("#city-input");
    let output = document.querySelector(".City-Name");
    output.innerHTML = input.value;
    let city = input.value;
    let apiKey = "4ee75d8fd0a41a9e7dfc26c980f6da70";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showWeather);
};
let SearchInput = document.querySelector("form");
SearchInput.addEventListener("submit", searchCity);

//unit converter functions
function Display_CelsiusTemp(event) {
    event.preventDefault();
    TempCard.innerHTML = CelsiusTemp;
};

function Display_FarenheitTemp(event) {
    event.preventDefault();
    console.log(CelsiusTemp);
    let Ftemp = (CelsiusTemp * 9) / 5 + 32;
    TempCard.innerHTML = Math.round(Ftemp);
};

let CelsiusTemp = null;
let CelsiusButton = document.querySelector("#celsius-link");
let FahrenheitButton = document.querySelector("#fahrenheit-link");
let TempCard = document.querySelector(".card-temperature")

CelsiusButton.addEventListener("click", Display_CelsiusTemp);
FahrenheitButton.addEventListener("click", Display_FarenheitTemp);

