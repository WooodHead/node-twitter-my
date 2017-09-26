var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');

var Word = mongoose.model('Ecdicts');
var co = require('co');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
});

router.get('/list', co.wrap(function* (req, res) {
  var words = [];
  words = yield Word.list({});
  res.json(words)
}));

// var oxfordList = [];

// function readOxford(cb) {
//   fs.readFile(path.join(__dirname, '/oxford.json'), 'utf-8',
//     function (err, data) {
//       if (err) {
//         console.log('err', err)
//       } else {
//         oxfordList = JSON.parse(data);
//       }
//     });
// }

// readOxford();

// router.get('/list', function (req, res) {
// res.json(oxfordList);
// readOxford(function (data) {
//   console.log('data', data)
//   res.json(data)
// })
// fs.readFile(path.join(__dirname, '/docs/oxford.json'), 'utf-8',
//   function (err, data) {
//     console.log('data', data)
//     if (err) {
//       console.log('err', err)
//     } else {
//       var words = JSON.parse(data);
//       res.json(words)
//     }
//   });

// readOxford(function (words) {
//   res.json(words);
// })
// res.send('list');
// });



module.exports = router