const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = (app) => {

  // CREATE
  app.post('/posts/:postId/comments', (req, res) => {
    const currentUser = req.user;
    const postId = req.params.postId;
    // FIND THE POST AND CREATE A NEW COMMENT
    Post.findById(postId).then((post) => {
      const comment = new Comment
    });
    post.comments.unshift(comment);
    // ADD COMMENT TO FRONT OF ARRAY
    post.save().then((post) => {
     res.redirect(`/posts/` + post._id);
   }).catch((err) => {
        console.log(err);
    });
 });
}
