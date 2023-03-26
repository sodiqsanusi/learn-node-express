const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testDB');

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
});

const Person = new mongoose.model('Person', personSchema);

const Fruit = new mongoose.model('Fruit', fruitSchema);

let dele = new Person({
  name: 'Dele',
  age: 25,
})

let apple = new Fruit({
  name: 'Apple',
  rating: 8,
  review: "I really don't mind them apples"
})
let pawpaw = new Fruit({
  name: 'Paw-Paw',
  rating: 2,
  review: "Never liked it, no reason"
})
let dates = new Fruit({
  name: 'Palm Dates',
  rating: 9,
  review: 'Sugary and healthy, what else could I ask for🤩'
})

Fruit.find().then((results) => {
  for(let fruit of results){
    console.log(fruit.name)
  }
}).catch((err) => {
  console.log(err, "There was an error in getting the fruits from the database")
})