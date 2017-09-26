var express = require('express');
var router = express.Router();

var wordController = require('../controller/word-controller.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/list', wordController.list)

module.exports = router;