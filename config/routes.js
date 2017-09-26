const tweets = require('../app/controllers/tweets');

module.exports = (app) => {

  app.get('/', tweets.index);
  app.get('/tweets', tweets.index);
  app.post('/tweets',tweets.create);
  
}