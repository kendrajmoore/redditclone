const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const PostSchema = new Schema({
  title       : String,
  url         : String,
  summary     : String,
  content     : String,
  comments    : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  subreddit   : { type: String },
  author      : { type: Schema.Types.ObjectId, ref: 'User' },
  upVotes     : { type: String },
  downVotes   : { type: String },
  voteScore   : { type: Number, default: 0 }
});


module.exports = mongoose.model('Post', PostSchema);
