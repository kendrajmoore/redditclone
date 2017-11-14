const jwt = require('jsonwebtoken');
const User = require('../models/user.js');


module.exports = (app) => {

  // SIGN UP
    app.get('sign-up', (req, res) => {
      res.render('sign-up').catch((err) => {
        console.log(err);
      })
    })


  //SIGN UP POST
    app.post('/sign-up', function(req, res) {
      // Create User and JWT
      const user = new User(req.body);
      console.log(user)
  //AUTH USER TOKEN
      user.save().then((user) => {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        console.log(req.cookies)
        res.redirect('/');
      }).catch((err) => {
        console.log(err.message);
      });
    });


    //LOGIN FORM

    app.get('/login', (req, res) => {
      res.render('login').catch(err) => {
        console.log(err);
      }
    })


    app.post('/login', function(req, res) {
      const password = req.body.password;
      const username = req.body.username;
      User.findOne({ username }.then((user) => {
        if (!user) {
          return res.status(401).send({ message: 'Wrong email or password' });
        }
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (!isMatch) {
            return res.status(401).send({ message: 'Wrong email or password' });
          }
          // creates req.user as  { _id: user._id }
          const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: "60 days" });
          res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

          res.redirect('/');
        });
      }).catch((err) => {
        console.log(err);
      });
    });

    app.get('/logout', (req, res)  => {
      res.clearCookie('nToken').catch((err) => {
        res.redirect('/');
      })
    })
  }
