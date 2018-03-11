"use strict"
const Data = require('../models/data');  

exports.newData = function(req, res, next) {  
 

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
}

exports.getData = function(req, res, next) {  
 

  if(!req.params.id_sensor) {
    res.status(422).send({ error: 'No id provided.' });
    return next();
  }
  

  Data.find({ 'id_sensor': req.params.id_sensor })
  .select('value')
  .sort('createdAt') //- prefix for descending order
  .exec(function(err, values) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      res.status(200).json({ values: values });
    });
}