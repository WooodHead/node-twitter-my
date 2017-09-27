const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TweetSchema = new Schema({
  title:String,
  body: String,
  tags: Array
});

TweetSchema.methods = {
  uploadAndSave: function (images, callback) {
    const self = this;
    if (!images || !images.length) {
      return this.save(callback)
    }

  }
};

TweetSchema.statics = {
  countUserTweets: function (id, callback) {
    return this.find().count().exec();
  },

  list: function (options, callback) {
    return this.find().limit(options.perPage)
      .skip(options.perPage * (options.page - 1))
      .exec();
  },
  clear:function (options,callback) {
    return this.remove().exec()
  }
};

mongoose.model('Tweet', TweetSchema)