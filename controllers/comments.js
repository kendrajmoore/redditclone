const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = (app) => {



// CREATE
app.post('/posts/:postId/comments', function (req, res) {
  var comment = new Comment(req.body);

  Post.findById(req.params.id).populate('comments').exec(function (err, post) {
  res.render('posts-show', { post: post });
});

  // Post.findById(req.params.postId).populate('comments').exec(function (err, post) {
  //   comment.save(function (err, comment) {
  //     post.comments.unshift(comment);
  //     post.save();
  //
  //     return res.redirect(`/posts/` + post._id);
  //   })
  })
});
