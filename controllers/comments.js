const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = (app) => {



  // CREATE
  app.post('/posts/:postId/comments', (req, res) => {
    const currentUser = req.user;
    const postId = req.params.postId;
    Post.findById(postId).then((post) => {
      const comment = new Comment
    });
        post.comments.unshift(comment);
        post.save();

        return res.redirect(`/posts/` + post._id);
      }).catch((err) => {
        console.log(err);
      });

}
