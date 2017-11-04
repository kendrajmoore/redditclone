const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/redditclone');

//
require('./controllers/posts.js')(app);

const checkAuth = function (req, res, next) {
  console.log("Checking authentication");

  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jsonwebtoken.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next()
}

app.use(checkAuth)


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
