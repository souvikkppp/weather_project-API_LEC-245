const express = require("express");
const https = require("https");

const app = express();




app.get("/", function(req, res) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=a7e320e5e8f944d2e9d0f4b8e17891e2&units=Metric"
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);//this json purse hold data in js object
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;

      res.write("<p>weather description: " + description + "</p>");
      res.write("<h1>The current tempreture is " + temp + "degree celceus</h1>");
      res.write("<img src="+imgUrl+">");
      res.send()
    })
  });
});







app.listen(3000, function() {
  console.log("server started.....");
});
