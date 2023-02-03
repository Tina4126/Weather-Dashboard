var APIKey = "a0b3eed94c9619ad95239c7e8f44cc29";

var city = prompt("Enter city name"); 

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

fetch(queryURL)
