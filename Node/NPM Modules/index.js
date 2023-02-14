//* We'll be installing a package from NPM called 'superheroes'
//* To use a package, you can either import it using ES6 syntax or require it using CommonJS

// import superheroes from 'superheroes';
//! The above import might not work if you haven't specified the type: module in your package.json

//* The commonJS syntax below:

const sups = require('superheroes');

//* Now, we have access using the methods and functions accessible from the module now

console.log(sups.random() + ' is the hero of the day!')
//* This will log a random superhero to the console
console.log(sups.all.slice(0, 10))
//* This will log the first ten of all the present superheroes to the console