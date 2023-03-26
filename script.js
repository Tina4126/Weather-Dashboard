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
