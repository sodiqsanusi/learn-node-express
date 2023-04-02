const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Mongoose = require('mongoose');

const app = express();
Mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:27017/wikiDB");

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

let articleSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: [true, "What's the title of your article?"],
  },
  content: {
    type: String,
    required: true,
  },
})

const Article = new Mongoose.model('Article', articleSchema);

app.get('/', (req, res) => {
  res.send("Welcome to the homepage of Ade's wiki!")
})

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server started on port:" + port)
})
