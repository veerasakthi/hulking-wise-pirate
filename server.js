const express = require('express');
const cron = require('node-cron');
const bodyParser = require('body-parser');

const santaRouter = require('./app/router');
const putSantaLetter = require('./cron/controller/santaMailController');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// require env variables
require('dotenv').config();

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

// route mapping
app.use('/', santaRouter);

// batch process
cron.schedule('0,15,30,45 * * * * *', putSantaLetter.init);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
