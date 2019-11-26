// my API Key 
var APIKey = "099aa526be096325000b0148ae600217";
var city = $("#cityEntry").val().trim();
var d = new Date();
var year = d.getFullYear();
var month = d.getMonth();
var day = d.getDay();
var today = month+"-"+day+"-"+year;
// console.log (today);
var cities = [" "];

function renderButton(){
    $('#btn-view').empty();
     for ( var i =0; i<cities.length; i++){
              
        var a = $("<button>");
        a.addClass("btn");
        a.attr("data-city", cities[i]);
        a.text(cities[i]);
        $("#btn-view").prepend(a);

     }
}
$("#citySearch").on("click", function (event) {
    dashboard ($("#cityEntry").val().trim());

})
$(document).on("click", ".btn", function(event){
    
    // console.log($(this).attr("data-city"))
    dashboard ($(this).attr("data-city"));
});
    
    // dashboard ($(this).val().trim());

    function dashboard (cityEntry){

            cities.push(cityEntry);
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityEntry + ",USA&appid=" + APIKey;
        
            event.preventDefault();
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
           
                // console.log(response);
                // console.log(response.weather[0].icon);
                var icon = response.weather[0].icon;
                var temp = ((response.main.temp - 273.15) * 9 / 5 + 32).toFixed(2);
                // console.log(today);
        
                var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x" + ".png";
                $('.Display').addClass("mainDisplay");
                $('.city').html('<h1>' + response.name + " "+d+ " " + '</h1>');
                $('.icon').attr('src', iconUrl);
                $('.temperature').html("Temperature:" + " " + temp);
                $('.wind').html("Wind Spedd:" + " " + response.wind.speed + " " + "MPH");
                $('.humidity').html("Humidity:" + response.main.humidity);
                // console.log(temp);
                // console.log(response.coord.lat);
                // console.log(response.coord.lon);
                var lati = response.coord.lat;
                var lont = response.coord.lon;
        
                var queryUVIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lati + "&lon=" + lont;
        
                $.ajax({
                    url: queryUVIndex,
                    method: "GET",
        
                }).then(function (response) {
                    // console.log(response);
                    $('.uv').html("UV Index:" + response.value)
                })
        
                var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityEntry + ",USA&appid=" + APIKey;;
        
                $.ajax({
                    url: forecastUrl,
                    method: "GET",
                    
        
                }).then(function (response) {
                    // console.log(response);
                    // console.log(response.list[0].dt_txt);
                    // console.log(response.list[0].weather[0].icon);
                    // console.log(response.list[0].main.temp);    
        
                    var forecastIcon =  response.list[0].weather[0].icon;
                    var iconFUrl = "http://openweathermap.org/img/wn/" + forecastIcon + "@2x" + ".png";
                    var tempForecast = ((response.list[0].main.temp - 273.15) * 9 / 5 + 32).toFixed(2);
                    
                    
                    $('.day1').addClass("forecast");
                    $('.day1Date').html(response.list[0].dt_txt);
                    $('.day1Icon').attr('src',iconFUrl);
                    $('.day1Temperature').html("Temp:"+tempForecast);
                    $('.day1Humidity').html("Humidity: " + " "+response.list[0].main.humidity);
        
                })
                renderButton();
            
            
        });
    }
   
    
var userEntry = $('#cityEntry');
init();

function init() {
    // Get stored todos from localStorage
    // Parsing the JSON string to an object
    var storedTodos = JSON.parse(localStorage.getItem("d"));
  
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedTodos !== null) {
      city = storedTodos;
    }
  
    // Render todos to the DOM
    renderButton();
  }
localStorage.setItem('d', JSON.stringify(city))
var storedCities = JSON.parse(localStorage.getItem('d'));
    // format new city object for current user
   

    // save to localstorage
    storedCities.push(cities);
    window.localStorage.setItem("d", JSON.stringify(cities));



                          