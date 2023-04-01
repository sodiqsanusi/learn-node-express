const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/blogDB');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "What's the title of your blog post?"]
  },
  content: {
    type: String,
    required: true,
  }
});

const Post = new mongoose.model('Post', PostSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get('/', (req, res) => {
  Post.find({}).then(response => {
    let rootRouteOptions = {
      mainText: homeStartingContent,
      posts: response, 
    }
    res.render('home', rootRouteOptions);
  }).catch(err => {
    console.log("Couldn't get all posts", err)
  });
})

app.get('/about', (req, res) => {

  let rootRouteOptions = {
    mainText: aboutContent,
  }

  res.render('about', rootRouteOptions);
})

app.get('/contact', (req, res) => {

  let rootRouteOptions = {
    mainText: contactContent,
  }

  res.render('contact', rootRouteOptions);
})
app.get('/compose', (req, res) => {

  res.render('compose');
})

app.post('/compose', (req, res) => {
  let newPost = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  })
  newPost.save().then(() => {
    res.redirect('/')
  }).catch(err => {
    console.log("There was an error in saving your post", err)
  })
})

app.get('/posts/:postID', (req, res) => {
  let gottenId = req.params.postID;
  //// let postOptions = {
  ////   id: gottenId,
  ////   post: posts[parseInt(gottenId) - 1],
  //// }
  //// res.render('post', postOptions)

  // for(let post of posts){
  //   if(_.lowerCase(post.title) == gottenId){
  //     foundPost = true
  //     res.render('post', {
  //       title: post.title,
  //       content: post.content,
  //     })
  //     break;
  //   }
  // }

  Post.findOne({_id: gottenId}).then(response => {
    res.render('post', {
      title: response.title,
      content: response.content
    })
  }).catch(err => {
    console.log("Didn't find your blog post", err)
  })
})









let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server started on port " + port);
});
