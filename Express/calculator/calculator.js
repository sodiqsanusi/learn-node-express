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