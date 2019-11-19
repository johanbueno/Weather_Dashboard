// my API Key 
var city = "charlotte";
var APIKey = "099aa526be096325000b0148ae600217";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+",us&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET",
}).then(function(response){
    console.log(response);
    $('.city').html('<h1>'+ response.name+" "+ "Date "+ response.weather[0].icon+'</h1>');
    $('.temperature').html("Temperature:"+" "+response.main.temp);
    $('.wind').html("Wind Spedd:"+" "+response.wind.speed +" "+"MPH");
    $('.humidity').html("Humidity:"+ response.main.humidity);
});

var queryUVIndex = "http://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey + "&lat=35.23&lon=-80.84";

$.ajax({
    url:queryUVIndex,
    method:"GET",

}).then(function(response){
    console.log(response);
    $('.uv').html("UV Index:"+ response.value )
})