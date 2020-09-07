const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  name: {type: String, require: true},
  email: {type: String, require: true},
  phone: {type: String, require: true},
  seats: {type: String, require: true},
  attendee: {type: String, require: true}
});

module.exports = mongoose.model('List', listSchema);
