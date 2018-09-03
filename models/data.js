const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
const DataSchema = new Schema({  
  id_sensor: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. http://mongoosejs.com/docs/guide.html#timestamps

});

module.exports = mongoose.model('Data', DataSchema);  
