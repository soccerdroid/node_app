//Prepare all requirements
//const DataController = require('./controllers/dataController');
const express = require('express');
const mongoose=require('mongoose');
const Data = require('./models/data');  

//Initialize server and connection to MongoDB
const app = express();
app.use(express.static('public'));
const port = 3000;

var mongoDB= 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
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
})

app.get('/data/:id_sensor',(req,res,next) =>{
	//DataController.getData(request,response,next);
}); 

//POST new data
app.post('/new/data/:id_sensor', (req,res,next) =>{
	if(!req.params.id_sensor) {
    res.status(422).send({ error: 'No id provided.' });
    return next();
  }
  if(!req.body.value) {
    res.status(422).send({ error: 'Please enter value.' });
    return next();
  }

  const data = new Data({
    id_sensor: req.params.id_sensor,
    value: req.body.value
  });

  data.save(function(err, newData) {
    if (err) {
      res.send({ error: err });
      return next(err);
    }
    
  });
	
  io.sockets.emit('new_data', data);

});