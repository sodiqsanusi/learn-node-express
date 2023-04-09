require("dotenv").config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
// const encrypt = require("mongoose-encryption");
// const md5 = require('md5');
// const bcrypt = require("bcrypt");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

// let encryptionSaltRounds = 7;

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/secretsDB');

const app = express();

app.use(express.static('public')); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || "longasstextforasecret",
  resave: false,
}))

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
})

// const encryptSecret = process.env.ENCRYPT_SECRET || "Thiswillbeourlittlesecret?";

// userSchema.plugin(encrypt, {secret: encryptSecret, encryptedFields: ['password']});

userSchema.plugin(passportLocalMongoose);

let User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', (req, res) => {
  res.render('home');
})

app.route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post((req, res) => {
    let newUsername = req.body.username.toLowerCase();
    console.log(req.body)

    User.register({username: newUsername}, req.body.password, (err, user) => {
      if(err){
        console.log(err);
        res.redirect('/register');
      }else{
        passport.authenticate('local')(req, res, () => {
          res.redirect('/secrets')
        })
      }
    })


    //* Using Bcrypt:
    // bcrypt.hash(req.body.password, encryptionSaltRounds).then(hash => {
    //   let newUser = new User({
    //     email: req.body.username.toLowerCase(),
    //     password: hash,
    //   })

    //   newUser.save().then(() => {
    //     console.log("A new user has been saved correctly")
    //     res.render("secrets");
    //   }).catch(err => {
    //     console.log(err, "There was an error in creating a user with your details. Try again")
    //   })

    // }).catch(err => {
    //   console.log(err, "There was an error in creating a user with your details. Try again")
    // })
  });

app.route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post((req, res) => {
    let name = req.body.username.toLowerCase();
    let password = req.body.password;

    let newUser = new User({
      username: name,
      password: password
    })

    req.login(newUser, (err) => {
      if(err){console.log(err)}
      else{
        passport.authenticate('local')(req, res, () => {
          res.redirect('/secrets')
        })
      }
    })

    //* Using Bcrypt:
    // User.findOne({email: name}).then((response) => {
    //   if(!response) throw new Error("Didn't find a user with the given details");

    //   bcrypt.compare(password, response.password).then(result => {
    //     if(result){
    //       res.render('secrets')
    //     }else{
    //       throw new Error("Wrong password inputted for the user")
    //     }
    //   }).catch(err => {
    //     res.send(err + " There was an error in logging you in. Try again")
    //   })
    // }).catch(err => {
    //   res.send(err + " There was an error in logging you in. Try again")
    // })

  });

app.get('/secrets', (req, res) => {
  if(req.isAuthenticated()){
    res.render('secrets');
  }else{
    res.redirect('/login');
  }
})

app.get('/logout', (req, res) => {
  req.logOut((err) => {
    if(!err){
      res.redirect('/')
    }
  });
})



let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
