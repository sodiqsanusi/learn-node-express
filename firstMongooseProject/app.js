const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testDB');

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Where's the name of your fruit?"],
  },
  rating: Number,
  review: String,
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
});



const Person = new mongoose.model('Person', personSchema);

const Fruit = new mongoose.model('Fruit', fruitSchema);

let pineapple = new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "Pinapples are so so juicyy!"
})

pineapple.save();

let amy = new Person({
  name: "Amy",
  age: 18,
  favouriteFruit: pineapple,
})

// amy.save().then(() => console.log("Amy was saved in the DB"));

let johnFruit = Fruit.findOne({name: "Apple"}).then((res) => {
  // Person.updateOne({name: "John"}, {$set: {favouriteFruit: res}}).then((res) => {
  //   console.log(res)
  // })
});
let deleFruit = Fruit.findOne({name: "Palm Dates"}).then((res) => {
  // Person.updateOne({name: "Dele"}, {$set: {favouriteFruit: res}}).then(
  //   () => console.log("Dele has been updated")
  // )
});

// Fruit.find().then((results) => {
//   for(let fruit of results){
//     console.log(fruit.name)
//   }
//   mongoose.connection.close();
// }).catch((err) => {
//   console.log(err, "There was an error in getting the fruits from the database")
//   mongoose.connection.close();
// })
