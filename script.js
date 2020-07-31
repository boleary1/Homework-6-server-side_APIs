var APIKey = "3fa2a0131565ebb35436afe8cff1d40b";

// Here we are building the URL we need to query the database
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
//   "q=Boston&appid=" + APIKey;
let latitude;
let longitude ;
//   var queryURL = "api.openweathermap.org/data/2.5/forecast?q=boston&appid=" + APIKey;
//   var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&appid=" + APIKey;
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=boston&units=imperial&appid=" + APIKey; //working api link
// var secondQueryURL = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey)
var secondQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=42.3601&lon=-71.0589&appid=" + APIKey;
const dayContainer = $('div.fiveDay');

// console.log('lat'+ latitude)



// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
    url: queryURL,
    method: "GET"
})
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

        // // Log the queryURL
        // console.log(queryURL);

        // Log the resulting object
        console.log(response.city.coord.lat)
        console.log(response);
        // console.log(response.city.name);
        // console.log((response.list[0].dt_txt.split(' ')[0]).split('-'))
        // console.log(dateSplit[1],'/',dateSplit[2],'/',dateSplit[0])
        // console.log(dateTogether)
        // console.log(moment().format('MMMM Do YYYY'));
        // console.log(response.list[0].weather[0].icon);
        latitude = (response.city.coord.lat);
        longitude = (response.city.coord.lon);
        
        // console.log('lat '+ latitude)
        var weatherImg = ("http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png")
        // console.log(weatherImg)


        // Transfer content to HTML
        $(".cityCurrent").html(response.city.name + moment().format(' MMMM Do YYYY')); //add city and date
        $(".cityCurrentSource").attr("src", weatherImg) //add image of weather
        $(".currentTempDisplay").html("Temperture: " + response.list[0].main.temp + "°F")
        $(".currentHumidityDisplay").html("Humidity: " + response.list[0].main.humidity + "%")
        $(".currentwindspeedDisplay").html("Wind speed: " + response.list[0].wind.speed + "mph")
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);

        // // Convert the temp to fahrenheit
        // var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // // add temp content to html
        // $(".temp").text("Temperature (K) " + response.main.temp);
        // $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
        

 
    });


$.ajax({
    url: secondQueryURL,
    method: "GET"
})
    .then(function (responsetwo) {
        console.log('lat '+ latitude)
        console.log('lon '+ longitude)


        // const moment = require('moment');
        let i;
        for (i = 1; i < 6; i++) {
            var dateString = moment.unix(responsetwo.daily[i].dt).format("MM/DD/YYYY");
            console.log(dateString)
            const dayDiv = $('<div>').addClass('col-sm-12 col-md d-flex justify-content-center fiveDayItem');
            const date = $('<h6>').addClass('bold').text(dateString);
            const dayImg = $('<img>').attr('src', ("http://openweathermap.org/img/wn/" + responsetwo.daily[i].weather[0].icon + "@2x.png")).attr('alt', responsetwo.daily[i].weather[0].main).width('50%');
            const dayTemp = $('<p>').addClass('dayDisplay').text("Temp: " + ((responsetwo.daily[i].temp.day-273)*1.8+32).toFixed(2) + "°F");
            const dayHumidity = $('<p>').addClass('dayDisplay').text("Humidity:" + responsetwo.daily[i].humidity + "%");


            dayDiv.append(date, dayImg, dayTemp, dayHumidity)
            dayContainer.append(dayDiv)

        }

        // var dateString = moment.unix(responsetwo.daily[1].dt).format("MM/DD/YYYY");
        // console.log(dateString)
        // console.log(responsetwo)

        console.log(responsetwo.daily[1])
        // console.log(responsetwo.daily[2])
        // console.log(responsetwo.daily[3])
        // console.log(responsetwo.daily[4])
        // console.log(responsetwo.daily[5])


        $(".currentUVIndexDisplay").html("UV Index: " + responsetwo.current.uvi) //this is down here, because it comes from the second api call
    });