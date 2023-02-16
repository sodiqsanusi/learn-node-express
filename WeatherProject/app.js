const express = require('express');

const app = express();


app.get('/', (req, res) => {
  res.send('<h1>Weather App</h1>')
})





let port = 3000;

app.listen(port, () => {
  console.log(`A server is runnning on port:${port}`)
})