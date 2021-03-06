var express = require('express');
var router = express.Router();
const Order = require('../models/Order');
const botController = require('../controllers/botController')

/* GET home page. */
router.get('/', (req, res) => {
  Order.find()
    .then(orders => {
      res.render('index', {
        title: 'Orders',
        orders: orders,
      });
    });
});

router.post('/', (req, res) => {
  let order = new Order();
  order.save()
    .then(() => {
      res.redirect('/')
    });
});

router.get('/bot', botController.getMessage);

module.exports = router;
