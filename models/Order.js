const mongoose = require('mongoose');
// destructuring
const { Schema } = mongoose;

const orderSchema = new Schema({
  items: {
    type: [Number]
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
