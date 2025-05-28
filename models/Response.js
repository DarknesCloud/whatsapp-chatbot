const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  from: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Response', ResponseSchema);
