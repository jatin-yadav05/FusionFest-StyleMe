const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: 'Generated Design'
  },
  category: {
    type: String,
    enum: ['tops', 'bottoms', 'dresses', 'outerwear'],
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});


module.exports = mongoose.model('Images', imageSchema); 