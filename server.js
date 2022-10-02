const express = require('express');
const bodyParser = require('body-parser');

const santaRouter = require('./app/router');

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

// route mapping
app.use('/', santaRouter);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
