// // Declaration of global variables
let cityName = '';

// Function to build the URL for the geocoding API
function buildGeoURL(cityName) {
    let geocodingURL = 'https://api.openweathermap.org/geo/1.0/direct?';
    let geocodingParams = {'appid': '6d15a98c4f1e6bf4dce53c48165b4e99'};
    geocodingParams.q = cityName;
    geocodingURL += $.param(geocodingParams);
    return geocodingURL;
}
// Function to get current weather and display it on the webpage
function getCurrentWeather(geoData) {
    // Build the queryURL based on the lon and lat data 
    let queryURL = 'https://api.openweathermap.org/data/2.5/weather?';
    let queryParams = {
    'appid': '6d15a98c4f1e6bf4dce53c48165b4e99'
    }
    queryParams.lat = geoData[0].lat;
    queryParams.lon = geoData[0].lon;
    queryURL += $.param(queryParams);
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response){
        // console.log(response);
        //Empty the previous weather data
        $('#today').empty();

        // Create the elements to store current weather info. Units will be converted if needed.

        let currentDate = moment().format('DD/MM/YYYY')
        let tempData = (response.main.temp - 273.15).toFixed(2);
        let windData = (response.wind.speed * 2.23694).toFixed(1);
        let weatherIconId = response.weather[0].icon;
        let iconURL = 'https://openweathermap.org/img/wn/'+ weatherIconId + '@2x.png';

        const todayTitle = $('<h2>').text(geoData[0].name + ' (' + currentDate + ')');
        const iconEl = $("<img>").attr('src', iconURL);
        const todayTemp = $('<p>').text('Temp: ' + tempData + '℃');
        const todayWind = $('<p>').text('Wind: ' + windData + ' KPH')
        const todayHumidity = $('<p>').text('Humidity: ' + response.main.humidity + '%');

        todayTitle.append(iconEl);
        $('#today').append(todayTitle, todayTemp,todayWind, todayHumidity)
        $('#today').addClass('border border-dark p-1');
    })
}

// Function to get weather forecast for a city and display on the webpage
function getForecastWeather(geoData) {
    // Build the queryURL based on the lon and lat data 
    let queryURL = 'https://api.openweathermap.org/data/2.5/forecast?';
    let queryParams = {
    'appid': '6d15a98c4f1e6bf4dce53c48165b4e99'
    }
    queryParams.lat = geoData[0].lat;
    queryParams.lon = geoData[0].lon;
    queryURL += $.param(queryParams);
    // console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response){

        // console.log(response);

        $('#forecast').empty();
        // Delcaration variables to store the current date and current hour slot by 3-hour period
        
        let currentHour = moment().format('HH');
        let hourSlot = Math.floor(currentHour/3);
        
        const forecastTitleEl = $('<h2>').text('5-day Forecast:').attr('class', 'col-12', 'mt-3');
        $('#forecast').append(forecastTitleEl);

        // Use 'For loop' to create elements and show the forecasts to the webpage
        for(let i = 0; i < 5; i++) {
            let slotNumber = hourSlot + i * 8;

            // console.log('The loop is working now');
            // Declaration of variables to store weather data
            let tempData = (response.list[slotNumber].main.temp -273.15).toFixed(2);
            let windData = (response.list[slotNumber].wind.speed * 2.23694).toFixed(1);
            let weatherIconId = response.list[slotNumber].weather[0].icon;
            let iconURL = 'https://openweathermap.org/img/wn/'+ weatherIconId + '@2x.png'
            // console.log(tempData + "   " + windData);
            // console.log(iconURL);

            let showDate = moment().add('days', i+1).format('DD/MM/YYYY');
            // console.log(showDate);
            const cardDiv = $('<div>').addClass('card col-10 col-sm-2 bg-info m-2');
            const showDateEl= $('<h5>').text(showDate);
            const iconEl = $('<img>').attr('src', iconURL);
            const tempDataEl = $('<p>').text('Temp: ' + tempData + '℃');
            const windDataEl = $('<p>').text('Wind: ' + windData + ' KPH');
            const humidityEl = $('<p>').text('Humidity: ' + response.list[slotNumber].main.humidity + ' %')
            
            cardDiv.append(showDateEl, iconEl, tempDataEl, windDataEl, humidityEl);
            $('#forecast').append(cardDiv);
        }
    })
}// Function to get weather forecast for a city and display on the webpage
function getForecastWeather(geoData) {
    // Build the queryURL based on the lon and lat data 
    let queryURL = 'https://api.openweathermap.org/data/2.5/forecast?';
    let queryParams = {
    'appid': '6d15a98c4f1e6bf4dce53c48165b4e99'
    }
    queryParams.lat = geoData[0].lat;
    queryParams.lon = geoData[0].lon;
    queryURL += $.param(queryParams);
    // console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response){

        // console.log(response);

        $('#forecast').empty();
        // Delcaration variables to store the current date and current hour slot by 3-hour period
        
        let currentHour = moment().format('HH');
        let hourSlot = Math.floor(currentHour/3);
        
        const forecastTitleEl = $('<h2>').text('5-day Forecast:').attr('class', 'col-12', 'mt-3');
        $('#forecast').append(forecastTitleEl);

        // Use 'For loop' to create elements and show the forecasts to the webpage
        for(let i = 0; i < 5; i++) {
            let slotNumber = hourSlot + i * 8;

            // console.log('The loop is working now');
            // Declaration of variables to store weather data
            let tempData = (response.list[slotNumber].main.temp -273.15).toFixed(2);
            let windData = (response.list[slotNumber].wind.speed * 2.23694).toFixed(1);
            let weatherIconId = response.list[slotNumber].weather[0].icon;
            let iconURL = 'https://openweathermap.org/img/wn/'+ weatherIconId + '@2x.png'
            // console.log(tempData + "   " + windData);
            // console.log(iconURL);

            let showDate = moment().add('days', i+1).format('DD/MM/YYYY');
            // console.log(showDate);
            const cardDiv = $('<div>').addClass('card col-10 col-sm-2 bg-info m-2');
            const showDateEl= $('<h5>').text(showDate);
            const iconEl = $('<img>').attr('src', iconURL);
            const tempDataEl = $('<p>').text('Temp: ' + tempData + '℃');
            const windDataEl = $('<p>').text('Wind: ' + windData + ' KPH');
            const humidityEl = $('<p>').text('Humidity: ' + response.list[slotNumber].main.humidity + ' %')
            
            cardDiv.append(showDateEl, iconEl, tempDataEl, windDataEl, humidityEl);
            $('#forecast').append(cardDiv);
        }
    })
}