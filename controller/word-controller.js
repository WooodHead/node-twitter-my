var mongoose = require('mongoose');
var WordModel = require('../app/models/word-model.js');
var co = require('co');

var controller = {};
controller.index = function (req, res, next) {
  console.log('req.query', req.query);
  console.log('req.body', req.body);

  var word = req.query.word;
  word = word.toLowerCase();

  WordModel.findOne({
    word: word
  }, function (err, doc) {
    if (err) {
      console.log('err', err);
      next();
    }

    if (doc && doc.translation) {
      // console.log('doc.translation',doc.translation);
      res.json(doc);
    } else {
      res.send('not found');
    }

  });
};

var Word = mongoose.model('Ecdicts');

controller.list = co.wrap(function* (req, res) {

  console.log('controller.list')
  var words = yield Word.list({});
  // res.render('list',{words:['11','222']})
  res.render('list', {
    words: words
  });
  // res.json(words)
});

module.exports = controller;