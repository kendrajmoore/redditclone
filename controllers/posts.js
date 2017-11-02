const Post = require('../models/post.js');

module.exports = function(app) {

  //CREATE
  app.post('/posts', function (req, res) {
      console.log(req.body)
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save(function (err, post) {
      if (err) { return console.log(err) }
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  })



  app.get('/', function (req, res) {
    Post.find().exec(function (err, posts) {
      res.render('posts-index', {posts: posts});
    })
  })


  // NEW
  app.get('/posts/new', function (req, res) {
    res.render('posts-new', {});
  })
}

//   //
//   app.get('/posts/:id', function (req, res) {
//       Post.findById(req.params.id).exec(function (err, post) {
//           res.render('posts-show', { post: post});
//           //mark modified, add postid to comment
//       })
//
//   // SUBREDDIT
//   app.post('/n/:subreddit', function(req, res) {
//     Post.find({ subreddit: req.params.subreddit }).exec(function (err, posts) {
//       res.render('posts-index', { posts: posts });
//     })
//   })
// });
