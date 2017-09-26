const mongoose = require('mongoose');
const Tweet = mongoose.model('Tweet');
const co = require('co');

exports.create = (req, res) => {
  console.log('req.body', req.body);
  const tweet = new Tweet(req.body)
  tweet.uploadAndSave({}, err => {
    if (err) {
      res.render('500')
    } else {
      res.redirect('/')
    }
  })
}

exports.index = co.wrap(function* (req, res) {
  let p = req.param('page');

  const page = p > 0 ? p : 1;

  const options = {
    perPage: 5,
    page: page
  }

  const list = yield Tweet.list(options)

  res.render('tweets/index', {
    tweetCount: 3,
    tweets: list,
    pageCount:111,
    page:2
  });



  // Tweet.list(options, (err, tweets) => {
  //   if (err) {
  //     return res.render("500")
  //   }

  //   res.render('tweets/index', {

  //   })
  // })

  // res.render('tweets/index', {
  //   tweets:['111','222'],
  //   tweetCount: 3
  // })
});