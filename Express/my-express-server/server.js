const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

//* This listens to any changes made to the port 3000 of the server set up on our local PC

//? Handling requests and responses: the GET Request
