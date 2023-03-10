# What is Node.js

Node.js is an environment that allows you to write and use Javascript on other places apart from the browser, i.e servers, IoT devices, e.t.c

It also allows allows accessing internal system functionalities (like accessing the file system, network processing and all that), this makes it more powerful and useful in interacting directly with the computer's hardware.

# Installing Node

> In the course of building on my frontend skills, I've done all this. So i'll just skip this

# The command line & Node

Using HTML/CSS/JS involved using the browser most times, using Node will require using the terminal more.

I have experience working with command lines, so this section was a refresh/walkthrough

> I might also go through 'Net Ninja' Node.js course after I'm done with most of this

To run a JavaScript file with Node using the command line, you can easily use
```bash
node index.js
```

The `index.js` was the path to the JavaScript file to be run with Node. Be sure to get the path correctly

# The Node REPL (Read Evaluation Print Loops)

The Node REPL allows you to write & run code continously in the terminal itself. This means that you don't have to create a Javascript file or something. You can start the REPL by just typing the below command on your terminal (Node should have been installed beforehand). This is similar to the console on a browser.

```bash
node
```

yup, just that.

> If you wanted to autocomplete by pressing the 'Tab' button but it doesn't work due to multiple possibilities of what might be autocompleted. Pressing the 'Tab' button again will give you a list of the possible autocompletes

You can use the 'Control + C' key combination to exit the REPL

# Native Node Modules

When you install Node, it already comes bundled with some inbuilt modules (modules are libraries of code that have been written to help in some of your tasks with Node).

I'll be writing codes regarding this [in this file](./nativeNodeModules.js)

# The NPM Package Manager & installing external Node Modules

NPM comes inbuilt when you install Node on your PC and it serves as a store from which you can get external modules from. NPM is a PACKAGE MANAGER, fully called "Node Package Manager".

Using external modules help reuse code that you might need, saving you time and effort that's required to write the code yourself.

To get started with creating a NPM module, you have to initialise one
```bash
npm init
```

...and answer the prompts rightly. That process will create a package.json file, which will be a description of all the packages you're using in your application

To install an NPM module, you have to install it. 
```bash
npm install package-name
```

To get more info, you can also check the [NPM docs](https://www.npmjs.com/) 

All code I'll be using regarding this, is [here](./NPM%20Modules/index.js)

# The next step!

Now we'll be moving along to a framework that's built on Node called [Express](https://expressjs.com/)

I'll be documenting along [here](../Express/README.md)