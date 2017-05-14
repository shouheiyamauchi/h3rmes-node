const mongoose = require('mongoose');
// destructuring
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  user_id: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
