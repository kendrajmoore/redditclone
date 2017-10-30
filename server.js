const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const jade = require('jade');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/redditclones');

//
require('./controllers/posts.js')(app);

// Auth middleware
app.use((req, res, next) => {
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
});
//
// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
