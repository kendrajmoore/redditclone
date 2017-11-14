const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = (app) => {
  // NEW REPLY
  app.get('/posts/:postId/comments/:commentId/replies/new', (req, res) => {
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
  app.post('/posts/:postId/comments/:commentId/replies', (req, res) => {
    const currentUser = req.user;
    const postId = req.params.postId;
    // LOOKUP THE PARENT POST
    Post.findById(postId).then((post) => {
      return Comment.findbyId(req.params.commentId)}.then((comment) => {
        comment.comments.unshift(req.body);
          post.save();
            res.redirect('/posts/' + post._id);
      }).catch((err) => {
        console.log(err);
      });
    }
