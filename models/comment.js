const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment            : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]

});

module.exports = mongoose.model('Comment', CommentSchema);
