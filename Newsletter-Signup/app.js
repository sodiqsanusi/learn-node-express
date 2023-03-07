require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const request = require('request');
const https = require('https');

let app = express();

//* This is necessary so that we have access to serving static files (e.g images) from our express server
app.use(express.static('public'))
//* The string used in the method above should be the name of the folder on the server where you want to save your static files.
app.use(bodyParser.urlencoded({extended: true}))

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Currently listening to port ' + port)
})

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/signup.html`);
})

app.post('/', (req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.mail;

  let data = {
    members: [{
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: fName,
        LNAME: lName,
      }
    }]
  }

  let JSONData = JSON.stringify(data);
  // This JSONData above is what we'll be sending to the mailChimp's API

  const API_KEY = process.env.API_KEY
  const list_id = 'c292cd123a';
  let url = `https://us14.api.mailchimp.com/3.0/lists/${list_id}/`
  let options = {
    method: 'POST',
    auth: `ade:${API_KEY}`,
  }

  const testRequest = https.request(url, options, (response) => {

    if(response.statusCode === 200){
      res.sendFile(`${__dirname}/success.html`);
    }else{
      res.sendFile(`${__dirname}/failure.html`);
    }

    response.on('data', (data) => {
      data = JSON.parse(data);

      console.log(data)
    })
  })

  testRequest.write(JSONData);
  testRequest.end();

})

// Audience ID
// c292cd123a

// API Route
// "https://$API_SERVER.api.mailchimp.com/3.0/lists/$list_id/members


app.post('/failure', (req, res) => {
  res.sendFile(`${__dirname}/signup.html`);
})