var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
  word: String,
  definition: String,
  translation: String,
  phonetic: String,
  tag: String,
  oxford: String
});

WordSchema.statics = {
  list: function (options) {
    var limit = 3;
    var page = 0;
    return this.find().limit(limit).exec();
  }
}

mongoose.model('Ecdicts', WordSchema);

