const mongoose = require('mongoose'),
     Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content            : { type: String, required: true },
  comments           : [this]
});

module.exports = mongoose.model('Comment', CommentSchema);
