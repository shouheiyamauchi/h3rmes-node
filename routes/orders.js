var express = require('express');
var router = express.Router();
const Order = require('../models/Order');

router.get('/', (req, res) => {
  Order.find()
  .then(orders =>{
    res.render('index', {
      title: 'Express',
      orders
    });
  });
});

router.post('/', (req, res) => {
  const order = new Order();
  order.save()
    .then(() => {
      res.redirect('/')
    });
});

module.exports = router;
