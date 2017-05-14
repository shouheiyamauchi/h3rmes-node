var express = require('express');
var router = express.Router();
const Category = require('../models/Category');

/* GET home page. */
router.get('/', (req, res) => {
  Category.find({ user_id: req.user._id })
    .then(categories => {
      res.render('categories/index', {
        title: 'Categories',
        categories: categories,
      });
    });
});

router.post('/', (req, res) => {
  let category = new Category();
  category.name = req.body.name;
  category.description = req.body.description;
  category.user_id = req.user._id;
  category.save()
    .then(() => {
      res.redirect('/categories')
    });
});

module.exports = router;
