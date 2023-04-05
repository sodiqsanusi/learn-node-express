const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/secretsDB');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

let User = new mongoose.model('User', userSchema);


app.get('/', (req, res) => {
  res.render('home');
})

app.route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post((req, res) => {
    let newUser = new User({
      email: req.body.username,
      password: req.body.password,
    })

    newUser.save().then(() => {
      console.log(req.body.username, req.body.password);
      console.log("A new user has been saved correctly")
      res.render("secrets");
    }).catch(err => {
      console.log(err, "There was an error in creating a user with your details. Try again")
    })
  });

app.route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post((req, res) => {
    let name = req.body.username;
    let password = req.body.password;

    User.findOne({email: name, password: password}).then((response) => {
      if(!response) throw new Error("Didn't find a user with the given details")
      res.render('secrets')
    }).catch(err => {
      res.send(err + " There was an error in logging you in. Try again")
    })

  });



let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})
