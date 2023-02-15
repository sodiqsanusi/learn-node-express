const express = require('express');
let port = 3300;

const app = express();

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
  res.send('<h2>Thanks for submitting</h2>')
})

//* For us to be able to access the data that was sent in the POST request, we will have
//* to install a package called "Body Parser"

//* This package works with Express in making data and properties from POST/PUT request
//* accessible in an easy manner