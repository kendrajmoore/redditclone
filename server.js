require("dotenv").config();
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const jsonwebtoken = require("jsonwebtoken");
const methodOverride = require('method-override');
//SET UP MONGOOSE
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/redditclone', { useMongoClient: true })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))
mongoose.set('debug', true)

//MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
//USER AUTH
const checkAuth = function (req, res, next) {
  console.log("Checking authentication");

  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jsonwebtoken.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next()
}

app.use(checkAuth)

//CONTROLLERS
require('./controllers/posts.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/comments.js')(app);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
