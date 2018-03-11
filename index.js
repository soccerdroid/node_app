//require('./app/index')
socketEvents=require('./socketEvents');
const express = require('express');
const app = express();
const port = 3000;
var server = require('http').Server(app);
//var io = require('socket.io')(server);

const mongoose=require('mongoose');
var mongoDB= 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const DataController = require('./controllers/dataController');


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
  const io = require('socket.io').listen(server);
  socketEvents(io);

})

app.get('/', (request, response) => {
  response.send('Hello from Express!');
})

app.get('/data/:id_sensor', DataController.getData);

app.post('/new/data/:id_sensor', DataController.newData);