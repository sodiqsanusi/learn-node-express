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
  res.send("Welcome to the homepage of Ade's wiki!");
})

app.route('/articles')
  .get((req, res) => {
    Article.find({}).then(response => {
      res.status(200).json(response);
    }).catch(err => {
      res.status(404).send(err, "There was an error getting all articles from the server");
    })
  })
  .post((req, res) => {
    let newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save().then(() => {
      res.status(201).send("The article has been added to the database successfully")
    }).catch(err => {
      res.status(500).send(err + " There was an error in saving the article, try again?")
    })
  })
  .delete((req, res) => {
    Article.deleteMany({}).then(() => {
      res.status(200).send("All articles in the database has been deleted successfully")
    }).catch(err => {
      res.status(500).send("Deleting all articles from the database was unsuccessful " + err)
    })
  });

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server started on port:" + port);
})
