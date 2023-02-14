const express = require('express');

const app = express();

//? Handling requests and responses: the GET Request
app.get('/', (req, res) => {
  res.send('<h1>Hii 3000</h1>')
})
//* To target multiple routes, it's the same process as the one above
app.get('/contact', (req, res) => {
  res.send('Contact me at: ademilddiq@gmail.com')
})
app.get('/about', (req, res) => {
  res.send('<h2>The owner of this website/server is trying to learn more about Express. to build backends</h2>')
})
//* This sends an heading tag with "Hii" when a user accesses the root URL of our local server

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

//* This listens to any changes made to the port 3000 of the server set up on our local PC