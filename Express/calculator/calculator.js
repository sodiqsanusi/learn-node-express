const express = require('express');
let port = 3300;

const app = express();

app.listen(port, () => {
  console.log(`An express server has been created on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello World')
})