// const jwt = require('jsonwebtoken');
// const User = require('../models/user.js');
//
//
// module.exports = (app) => {
//
//   // SIGN UP
//   app.get('sign-up', (req, res) => {
//     res.render('sign-up')
//   })
//
//   //SIGN UP POST
//   app.post('/sign-up', function(req, res) {
//     const user = new User(req.body);
//     //AUTH USER TOKEN
//     user.save().then((user) => {
//       const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
//       res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
//       console.log(req.cookies)
//       res.redirect('/');
//     }).catch((err) => {
//       console.log(err.message);
//     });
//   });
//
//
//   //LOGIN FORM
//   app.get('/login', (req, res) => {
//     res.render('login', {})
//   })
//
//   // ...
//   app.post('/login', (req, res) => {
//     const password = req.body.password;
//     const username = req.body.username;
//     // FIND USERNAME IN DATABASE
//     User.findOne({ username }).then((user) => {
//       if (!user) {
//         return res.status(401).send({ message: 'Wrong email or password' });
//       }
//       //FIND PASSWORD IN THE DATABASE
//       User.comparePassword(password, (err, isMatch) => {
//         // CHECK PASSWORD
//         if (!isMatch) {
//           return res.status(401).send({ message: 'Wrong email or password' });
//         }
//         // CREATE USER PASSWORD TOKEN
//         const token = jwt.sign({ _id: user._id, username: user.username },
//                                 process.env.SECRET, { expiresIn: "60 days" });
//
//         // SETS MAX AGE FOR PASSWORD TOKEN
//         res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
//         res.redirect('/');
//       })
//
//     // ERROR HANDLING
//     }).catch((err) => {
//          console.log(err);
//     });
//   })
//
//
//   app.get('/logout', (req, res) => {
//     res.clearCookie('nToken');
//     res.redirect('/');
//   });
// }

const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = {
  logout(req, res) {
    // Clear the cookie and redirect to root
    res.clearCookie('nToken');
    res.redirect('/');
  },
  getLogin(req, res) {
    res.render('login', {
      ...req.user,
      bodyClass: "login",
      pageTitle: "Log in"
    });
  },
  postLogin(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    // Find this user name
    User.findOne({ username }, 'username password').then((user) => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: 'Wrong Username or Password' });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: "Wrong Username or password" });
        }
        // Create a token
        const token = jwt.sign(
          { _id: user._id, username: user.username }, process.env.SECRET,
          { expiresIn: "60 days" }
        );
        // Set a cookie and redirect to root
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/');
      });
    }).catch((err) => {
      console.log(err);
    });
  },
  getSignUp(req, res){
    res.render('sign-up', {
      ...req.user,
      bodyClass: "sign-up",
      pageTitle: "Sign Up"
    });
  },
  postSignUp(req, res){
    const username = req.body.postUsername;
    const password = req.body.postPassword;
    const postPasswordConfirm = req.body.postPasswordConfirm;
    // console.log(">>>>>", username, password, postPasswordConfirm);
    // Check password confirmation
    if (password !== postPasswordConfirm) {
      // Passwords don't match
      res.redirect('/sign-up');
    }

    // Create a new user
    const user = new User({
      username,
      password
    });

    // Save the user
    user.save().then((user) => {
      // Create a new jwt token
      const token = jwt.sign({ _id: user._id, loggedin: "loggedin" }, process.env.SECRET, {
        expiresIn: "60 days"
      });
      // Set a cookie
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      // Redirect to root
      res.redirect('/');
    }).catch((err) => {
      console.log("Sign up", err);
      res.status(400).send({ err });
    });
  }
}
