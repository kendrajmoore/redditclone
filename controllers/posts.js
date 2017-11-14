const Post = require('../models/post');
const User = require('../models/user');
const express = require('express');
const app = express();

module.exports = (app) => {
//INDEX ROUTE
  app.get('/', (req, res) => {
    const recentUser = req.user;
    res.render('home');
  });

//NEW POST FORM
  // app.get('/posts/new', (req, res) => {
  //   const recentUser = req.user;
  //   if (recentUser === null) {
  //     return res.redirect('login');
  //   } else {
  //       res.render('posts-new');
  //     })
  //   })

//VOTING FOR A POST

      app.post('/posts/:id/vote-up', (req, res) => {
        const recentUser = req.user;
        Post.findById(req.params.id).then((post) => {
          post.downVotes.pull(user._id);
          post.upVotes.addToSet(user._id);
          post.voteTotal = post.upvotes.length - post.downVotes.length;

          post.save();

          res.send({voteScore : post.voteScore}).catch((err) => {
            console.log(err);
          });
      });
    });

    app.post('/posts/:id/vote-down', (req, res) => {
      const recentUser = req.user;
      Post.findById(req.params.id).then((post) => {
        post.upVotes.pull(user._id);
        post.downVotes.addToSet(user._id);
        post.voteTotal = post.upvotes.length - post.downVotes.length;

        post.save();

        res.send({voteScore : post.voteScore}).catch((err) => {
          console.log(err);
        });
    });
  });

     //GET POST
    app.post('/posts', (req, res)  => {
        Post.find({}).populate('author').then((posts) => {
          const recentUser = req.user;
          let loggedin = "";
          if(recentUser !== null) {
            loggedin = 'loggedin'
          }
          res.render('posts-index');
        }).catch((err) =>
           console.log(err));
         })
    }

  //ALL THE POSTS OF AN INDIVIDUAL

  app.get('posts/:id', (req, res)  => {
    const id = req.params.id;
    const recentUser = req.user;
    let loggedin = "";
    if(recentUser !== null) {
      loggedin = "loggedin"
    }
     Post.findById(id).populate('author').then((post) => {
       const recentUser = req.user;
       res.render('posts-index')
     }).catch((err) => {
       console.log(err);
     })

  //Getting only Subreddit Posts
  app.get('/g/:subreddit', (req, res) => {
    const subreddit = req.params.subreddit;
    const recentUser = req.user;
     Post.find({ subreddit }).then((posts) => {
       const recentUser = req.user;
       res.render('posts-index', {  posts, currentUser }).catch((err) => {
         console.log(err)
       });
    })
  });
});
