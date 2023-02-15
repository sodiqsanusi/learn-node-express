const express = require('express');
const bodyParser = require('body-parser');
let port = 3300;

const app = express();
//* Body Parser has different modes, but since we are getting the POST request from a 
//* form data, the mode to be used is called "urlencoded"

app.use(bodyParser.urlencoded({extended: true}))
//* This defines that our server should use body parser to decode requests


app.listen(port, () => {
  console.log(`An express server has been created on port ${port}`)
})

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World</h1>');
// })

//* To send a file to routes instead of small bits of HTML or words, you'll follow a quite different pattern

app.get('/', (req, res) => {
  console.log(__dirname)
  res.sendFile(`${__dirname}/index.html`)
  //* The __dirname gives the absolute path of where the present file is
  //* This is used because you mostly can't use relative file paths on servers. You don't know how the file structure is
  //* You can then get the file by concatenating its path from the '__dirname'
})

//* When a website makes a post request to our server, we presently don't have a way of handling it
//* which will bring up a "404" error clientside. To handle post requests from a website/application:

app.post('/', (req, res) => {
  //* For us to be able to access the data that was sent in the POST request, we will have
  //* to install a package called "Body Parser"

  //* This package works with Express in making data and properties from POST/PUT request
  //* accessible in an easy manner.
  console.log(req.body);
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);

  let result = num1 + num2
  //* Due to body parser decoding the request, what'll get logged to the console will be 
  //* an object with the data gotten from the form
  res.send(`<h2>The result of your calculation is ${result}</h2>`);
})

