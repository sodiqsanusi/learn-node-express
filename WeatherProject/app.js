const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))


// app.get('/', (req, res) => {
//   //* Using the native Node https module to fetch an API
//   let city = 'lagos';
//   let apiKey = '798849c0a56202960547ceb2d05bac02';
//   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//   https.get(url, (response) => {
//     console.log(response)
//     //* To get the value from the response you'll have to use the 'on' method with the response you get
//     response.on('data', (data) => {
//       console.log(data);
//       //? This will give you the data in JSON format (JSON might be in hexadecimal, binary or string)
//       //* To parse it into a JS Object:
//       let weatherData = JSON.parse(data);
//       console.log(weatherData)
//       //* This will give you the fetched data, after being parsed from JSON
//       let sentResult = `<h1>Present weather conditions depicts: ${weatherData.weather[0].description}</h1>
//                         <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="Egbami"/>
//                         <br/>
//                         <h2>The temperature in ${city.toUpperCase()} is ${weatherData.main.temp} degrees in Celcius</h2>
//       `
//       res.send(sentResult);
//     })
    
//   })
// })

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
})
app.post('/', (req, res) => {
  let city = req.body.name;
  let apiKey = '798849c0a56202960547ceb2d05bac02';
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  https.get(url, (response) => {
    console.log(response)
    //* To get the value from the response you'll have to use the 'on' method with the response you get
    response.on('data', (data) => {
      console.log(data);
      //? This will give you the data in JSON format (JSON might be in hexadecimal, binary or string)
      //* To parse it into a JS Object:
      let weatherData = JSON.parse(data);
      console.log(weatherData)
      //* This will give you the fetched data, after being parsed from JSON
      let sentResult = `<h1>Present weather conditions depicts: ${weatherData.weather[0].description}</h1>
                        <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="Egbami"/>
                        <br/>
                        <h2>The temperature in ${city.toUpperCase()} is ${weatherData.main.temp} degrees in Celcius</h2>
      `
      res.send(sentResult);
    })
  })
})


let port = 3000;

app.listen(port, () => {
  console.log(`A server is runnning on port:${port}`)
})