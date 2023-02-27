const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

let app = express();


let port = 3000;
app.listen(port, () => {
  console.log('Currently listening to port ' + port)
})