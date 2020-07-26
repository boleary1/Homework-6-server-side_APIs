var APIKey = "3fa2a0131565ebb35436afe8cff1d40b";

// Here we are building the URL we need to query the database
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
//   "q=Boston&appid=" + APIKey;

//   var queryURL = "api.openweathermap.org/data/2.5/forecast?q=boston&appid=" + APIKey;
//   var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&appid=" + APIKey;
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=boston&units=imperial&appid=" + APIKey;




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
        console.log(response);
        console.log(response.city.name);
        // console.log((response.list[0].dt_txt.split(' ')[0]).split('-'))
        // console.log(dateSplit[1],'/',dateSplit[2],'/',dateSplit[0])
        // console.log(dateTogether)
        console.log(moment().format('MMMM Do YYYY'));
        console.log(response.list[0].weather[0].icon);
        var weatherImg = ("http://openweathermap.org/img/wn/"+response.list[0].weather[0].icon+"@2x.png")
        console.log(weatherImg)


        // Transfer content to HTML
        $(".cityCurrent").html(response.city.name + moment().format(' MMMM Do YYYY')); //add city and date
        $(".cityCurrentSource").attr("src", weatherImg) //add image of weather
        $(".currentTempDisplay").html("Temperture: " + response.list[0].main.temp + "°")
        $(".currentHumidityDisplay").html("Humidity: " + response.list[0].main.humidity + "%")
        $(".currentwindspeedDisplay").html("Wind speed: " + response.list[0].wind.speed + "mph")
        $(".currentUVIndexDisplay").html("UV Index: " + response.list[0].wind.speed + "mph")



        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
         
        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
      });