const express = require('express');
const bodyParser = require('body-parser');
// const express = require('express');

const app = express();

app.set('view engine', 'ejs');

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})

app.get('/', (req, res) => {
  res.send('Your backend app is active baby!')
})