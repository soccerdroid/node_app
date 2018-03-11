const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
const DataSchema = new Schema({  
  id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.

});

module.exports = mongoose.model('Data', DataSchema);  
