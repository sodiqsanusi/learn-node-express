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


//////////////////////////* Request targeting all articles ///////////////////////////////////

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

//////////////////////////* Request targeting a specific article ///////////////////////////////////

app.route('/articles/:id')
  .get((req, res) => {
    Article.findById(req.params.id).then(response => {
      res.status(200).json(response)
    }).catch(err => {
      res.status(404).send(err)
    })
  })
  .put((req, res) => {
    let newContent = {
      title: req.body.title,
      content: req.body.content
    }
    Article.replaceOne({_id: req.params.id}, newContent).then((response) => {
      if(response.modifiedCount > 0) {
        if(req.body.title && req.body.content) {
          res.status(201).send(`Article ${req.params.id} has been totally replaced with new content`) 
        }else{ throw new Error("The required fields are not populated")}
      }else{
        throw new Error("Couldn't find the article with the inputted ID")
      }
    }).catch(err => {
      res.status(500).send(`Totally updating article ${req.params.id} was unsuccessful ` + err)
    })
  })
  .patch((req, res) => {
    let fieldsToUpdate = req.body;
    Article.updateOne({_id: req.params.id}, fieldsToUpdate).then(response => {
      if(response.matchedCount < 1) {
        throw new Error("Didn't find any document with the specified ID");
      } else{
        res.status(201).send(`Some fields in article ${req.params.id} were updated successfully`);
      }
    }).catch(err => {
      res.status(500).send(`Updating some fields in article ${req.params.id} was unsuccessful ` + err);
    })
  })
  .delete((req, res) => {
    Article.findByIdAndDelete(req.params.id).then(response => {
      if(!response){
        throw new Error("Can't find a document with the inputted ID")
      }else{
        res.status(200).send(`Article ${req.params.id} has been successfully deleted`)
      }
    }).catch(err => {
      res.status(500).send(`Deleting article ${req.params.id} was unsuccessful || ${err}`)
    })
  });




let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server started on port:" + port);
})
