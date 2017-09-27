const mongoose = require('mongoose');
const Tweet = mongoose.model('Tweet');
const co = require('co');
const faker = require('faker')



exports.index = co.wrap(function* (req, res) {
  let p = req.query.page
  const page = p && p > 0 ? p : 1;

  const perPage = 5

  const options = {
    perPage: perPage,
    page: page
  }

  var count = yield Tweet.countUserTweets({})

  var list = yield Tweet.list(options)

  var pageCount = Math.ceil(count / perPage)
  pageCount = pageCount > 0 ? pageCount : 1


  res.render('tweets/index', {
    tweetCount: count,
    tweets: list,
    pageCount: pageCount,
    page: page
  });

});

exports.faker = (req, res) => {
  console.log('faker-------', faker)
  var params = req.params

  for (let i = 0; i < 30; i++) {
    const tweet = new Tweet()
    tweet.title = faker.lorem.sentence()
    tweet.body = faker.lorem.paragraphs()

    console.log('tweet', tweet)

    tweet.save(err => {
      if (err) {
        res.render('error', {
          error: error
        })
      }
    })
  }
  // console.log('redirect')
  res.redirect('/tweets')
}

exports.clear = co.wrap(function* (req, res) {
  yield Tweet.clear({})
  res.redirect('/tweets')
})

exports.create = (req, res) => {

  const tweet = new Tweet(req.body)
  tweet.uploadAndSave({}, err => {
    if (err) {
      res.render('500')
    } else {
      res.redirect('/')
    }
  })
}