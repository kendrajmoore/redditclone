const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = (app) => {



// CREATE
app.post('/posts/:postId/comments', function (req, res) {
  // INSTANTIATE INSTANCE OF MODEL
  const comment = new Comment(req.body);

  // SAVE INSTANCE OF POST MODEL TO DB
  comment.save(function (err, comment) {
    // REDIRECT TO THE ROOT
    return res.redirect(`/`);
  })
});
