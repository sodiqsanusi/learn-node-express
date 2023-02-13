//* To import a Native node module, you'll have to import it
//* I'll be importing the native Node "File System" module

const fileSystem = require('fs');

console.log(fileSystem)

//* This imports the native module. A simple import
//? You can check the methods available in the native Node modules by checking the docs

fileSystem.open('mynewfile.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('The new file has been created!');
});

// This will create a new text file called "myNewFile" when this file is run


//* You can check the Node site to get more information about other native Node Modules.