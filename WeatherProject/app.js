const express = require('express');
const https = require('https');

const app = express();


app.get('/', (req, res) => {

  let url = 'https://api.openweathermap.org/data/2.5/weather?q=lagos&appid=798849c0a56202960547ceb2d05bac02';
  https.get(url, (response) => {
    console.log(response)
  })


  res.send('<h1>Weather App</h1>')
})





let port = 3000;

app.listen(port, () => {
  console.log(`A server is runnning on port:${port}`)
})