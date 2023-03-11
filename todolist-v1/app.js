const express = require('express');
const bodyParser = require('body-parser');
// const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: 'true'}))
app.use(express.static('public'));

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let options = {
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}
let items = [];


app.get('/', (req, res) => {
  let today = new Date();
  today = today.toLocaleDateString('en-US', options)

  let templatingOptions = {
    dayOfTheWeek: today,
    todos: items,
  }
  
  res.render('list', templatingOptions);
})

app.post('/', (req, res) => {
  let newTask = req.body.new;
  items.push(newTask)

  res.redirect('/');
}) 