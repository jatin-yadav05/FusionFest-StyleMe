const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
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
    required: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

imageSchema.pre('save', function(next) {
  console.log('Saving image:', {
    userId: this.userId,
    category: this.category,
    name: this.name
  });
  next();
});

module.exports = mongoose.model('Images', imageSchema); 