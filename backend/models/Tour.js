const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
});

module.exports = mongoose.model('Tour', tourSchema); 
