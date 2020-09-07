const mongoose = require('mongoose');


const dataSchema = mongoose.Schema({
  image : {type: String, require: true },
  availableSeats: {type: String, require: true }
});

module.exports = mongoose.model('Data', dataSchema)

