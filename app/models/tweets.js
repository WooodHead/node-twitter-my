const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TweetSchema = new Schema({
  body: String,
  tags: Array
});

TweetSchema.methods = {
  uploadAndSave: function (images, callback) {
    const self = this;
    if(!images||!images.length){
      return this.save(callback)
    }
    
  }
};

TweetSchema.statics = {
  list: function (options, callback) {
    // this.find().limit(options.perPage)
    //   .skip(options.perPage * options.page)
    //   .exec(callback);
    
      return this.find().limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec();

  }
};

mongoose.model('Tweet', TweetSchema)