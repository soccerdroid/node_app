//Prepare all requirements
//const DataController = require('./controllers/dataController');
const express = require('express');
const mongoose=require('mongoose');
const Data = require('./models/data');  
var bodyParser = require('body-parser');

//Initialize server and connection to MongoDB
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 8000;

var mongoDB= 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const server = app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
})

//Require socket.io
const io = require('socket.io')(server);
// Set socket.io listeners.
io.on('connection', (socket) => {
  console.log('a user connected');
 
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//ROUTES
app.get('/', (request, response) => {
  response.send('Hello from Express!');
  console.log("hello")
})

app.get('/data/:id_sensor',(request,response,next) =>{
	if(!request.params.id_sensor) {
    response.status(422).send({ error: 'No id provided.' });
    return next();
  }
  

  Data.find({ 'id_sensor': request.params.id_sensor })
  .select('value')
  .sort('createdAt') //- prefix for descending order
  .exec(function(err, values) {
      if (err) {
        response.send({ error: err });
        return next(err);
      }

      response.status(200).json({ values: values });
    });
}); 

//POST new data
app.post('/new/data/:id_sensor', (request,response,next) =>{
	if(!request.params.id_sensor) {
    response.status(422).send({ error: 'No id provided.' });
    return next();
  }
  if(!request.body.value) {
    response.status(422).send({ error: 'Please enter value.' });
    return next();
  }
  console.log(request.body);
  const data = new Data({
    id_sensor: request.params.id_sensor,
    value: request.body.value
  });

  data.save(function(err, data) {
    if (err) {
      response.send({ error: err });
      return next(err);
    }
    
  });
	
  io.sockets.emit('new_data', data);

});