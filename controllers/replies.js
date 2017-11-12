const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = (app) => {
  // NEW REPLY
  app.get('/posts/:postId/comments/:commentId/replies/new', (req, res, next) => {
    let post;
    Post.findbyId(rep.params.postId).then((p) => {
      post = p;
      return Comment.findbyId(req.params.commentId)
    }).then((comment) => {
      res.render('replies-new', { post, comment })
    }).catch((err) => {
      console.log(err)
    })

  });

  // CREATE REPLY
  app.post('/posts/:postId/comments/:commentId/replies', function(req, res, next) {
    // LOOKUP THE PARENT POST
    Post.findById(req.params.postId).exec(function (err, post) {
      // FIND THE CHILD COMMENT
      var comment = post.comments.id(req.params.commentId);
      // ADD THE REPLY
      comment.comments.unshift(req.body);
      // SAVE THE CHANGE TO THE PARENT DOCUMENT
      post.save();

      // REDIRECT TO THE PARENT POST#SHOW ROUTE
      res.redirect('/posts/' + post._id);
    });
  });

}
