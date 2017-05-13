var express = require('express');
var router = express.Router();
const botController = require('../controllers/botController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/bot', botController.getMessage);

module.exports = router;
