const express = require('express');
const bodyParser = require('body-parser');
// const express = require('express');

const app = express();

app.set('view engine', 'ejs');

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


app.get('/', (req, res) => {
  let today = new Date().getDay();
  today = days[today];

  let templatingOptions = {
    dayOfTheWeek: today
  }
  
  res.render('list', templatingOptions);
})