var APIKey = "3fa2a0131565ebb35436afe8cff1d40b";

// Here we are building the URL we need to query the database
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
//   "q=Boston&appid=" + APIKey;
// let latitude = 42.3584;
// let longitude = -71.0598;
//   var queryURL = "api.openweathermap.org/data/2.5/forecast?q=boston&appid=" + APIKey;
//   var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&appid=" + APIKey;
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=scituate&units=imperial&appid=" + APIKey; //working api link
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=" + APIKey
// var secondQueryURL = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey)
// var secondQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=42.3584&lon=-71.0598&appid=" + APIKey;
// var secondQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=42.3601&lon=-71.0589&appid=" + APIKey;

const dayContainer = $('div.fiveDay');
const uvIndexContainer = $('h6.uvIndex');



function secondAjaxCall(obj) {


    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${obj.latitude}&lon=${obj.longitude}&appid=${APIKey}`,
        method: "GET"
    })
        .then(function (responsetwo) {
            console.log(responsetwo)
            // console.log('lon ' + longitude)


            // const moment = require('moment');
            let i;
            for (i = 1; i < 6; i++) {
                var dateString = moment.unix(responsetwo.daily[i].dt).format("MM/DD/YYYY");
                console.log(dateString)

                const dayDiv = $('<div>').addClass('card text-white bg-info mb-3 fiveDayItem card');
                const dayCardBodyDiv = $('<div>').addClass('card-body');
                const date = $('<p>').addClass('bold card-title').text(dateString);
                const dayImg = $('<img>').attr('src', ("http://openweathermap.org/img/wn/" + responsetwo.daily[i].weather[0].icon + "@2x.png")).attr('alt', responsetwo.daily[i].weather[0].main).width('50%');
                const dayTemp = $('<p>').addClass('dayDisplay').text("Temp: " + ((responsetwo.daily[i].temp.day - 273) * 1.8 + 32).toFixed(2) + "°F");
                const dayHumidity = $('<p>').addClass('dayDisplay').text("Humidity:" + responsetwo.daily[i].humidity + "%");


                dayCardBodyDiv.append(date, dayImg, dayTemp, dayHumidity)
                dayDiv.append(dayCardBodyDiv)
                dayContainer.append(dayDiv)

            }
            let highlightColor = ''

            if (responsetwo.current.uvi < 3) {
                highlightColor = '#63a10d'
            }
            else if (responsetwo.current.uvi >= 3 && responsetwo.current.uvi < 6) {
                highlightColor = '#d4cd0b'
            }
            else if (responsetwo.current.uvi >= 6 && responsetwo.current.uvi < 8) {
                highlightColor = '#d4760b'
            }
            else if (responsetwo.current.uvi >= 8 && responsetwo.current.uvi < 11) {
                highlightColor = '#d40bc3'
            }
            else if (responsetwo.current.uvi > 11) {
                highlightColor = '#620bd4'
            }
            else {
                highlightColor = '#ffffff'
            };
            const indexdisplay = $('<span>').attr('style', ("background-color: " + highlightColor)).text(responsetwo.current.uvi);

            uvIndexContainer.append(indexdisplay);

            $(".currentUVIndexDisplay").html("UV Index: " + responsetwo.current.uvi) //this is down here, because it comes from the second api call
        });
}

function firstAjaxCall() {

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Log the queryURL


            // Log the resulting object
            console.log(response.city.coord.lat)
            console.log(response);

            const latitude = (response.city.coord.lat);
            const longitude = (response.city.coord.lon);

            // console.log('lat '+ latitude)
            var weatherImg = ("http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png")
            // console.log(weatherImg)
            const location = {
                latitude: latitude,
                longitude: longitude
            }
            secondAjaxCall(location);
            // Transfer content to HTML
            $(".cityCurrent").html(response.city.name + moment().format(' MMMM Do YYYY')); //add city and date
            $(".cityCurrentSource").attr("src", weatherImg) //add image of weather
            $(".currentTempDisplay").html("Temperture: " + response.list[0].main.temp + "°F")
            $(".currentHumidityDisplay").html("Humidity: " + response.list[0].main.humidity + "%")
            $(".currentwindspeedDisplay").html("Wind speed: " + response.list[0].wind.speed + "mph")
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);

        });

}

$.ajax({
    url: ("https://api.openweathermap.org/data/2.5/weather?zip=02066,us&appid="+APIKey),
    method: "GET"
})
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

        console.log("response.city.coord.lat")
        console.log(response);
        firstAjaxCall();

    });

document.getElementById("search-btn").addEventListener("click", function (event) {
    event.preventDefault();
    console.log('button clicked');
}
);