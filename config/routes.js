const tweets = require('../app/controllers/tweets');

module.exports = (app) => {

  app.get('/', function (req, res) {
    res.redirect('/tweets')
  });
  app.get('/tweets', tweets.index);
  app.get('/tweets/:page', tweets.index)
  app.get('/tweets-faker', tweets.faker);
  app.get('/tweets-clear', tweets.clear);

  app.post('/tweets', tweets.create);
}