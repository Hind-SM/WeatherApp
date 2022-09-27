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


//getting weather and icon and changing background with api response
function showWeather(response) {
    console.log(response.data);
    let background = document.querySelector("body") 
    let currentCity = document.querySelector(".City-Name");
    let temperature = Math.round(response.data.main.temp);
    CelsiusTemp = temperature;
    let cityName = response.data.name
    let iconElement = document.querySelector(".Icon");
    let iconID = response.data.weather[0].icon;
    let Description = document.querySelector(".Description");
    let Humidity = document.querySelector(".Humidity");
    let Wind = document.querySelector(".Wind");
    let DescriptionString = response.data.weather[0].description;
    TempCard.innerHTML = `${temperature}`;
    Description.innerHTML = `${DescriptionString.charAt(0).toUpperCase() + DescriptionString.slice(1)}`
    Humidity.innerHTML = `Humidity:${response.data.main.humidity}%`;
    Wind.innerHTML = `Wind:${response.data.wind.speed}mph`;
    currentCity.innerHTML = `${cityName}`;
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${iconID}@2x.png`);

    if (temperature <= 10) {
        background.style.background = "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)";
        
    } if(temperature <= 15) {
        background.style.background = "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)";
        
    } if(temperature < 20) {
        background.style.background = "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)";
        
    } else {
        background.style.background = "linear-gradient(135deg, #feec9f 15%, #fe813e 100%)";
    }
};
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

//icon changer function//
// function Display_icon() {
//     let apiKey = "4ee75d8fd0a41a9e7dfc26c980f6da70";
//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//     axios.get(url).then(showWeather);
//     icon.innerHTML = 

// }

let icon = document.querySelector(".Icon")
