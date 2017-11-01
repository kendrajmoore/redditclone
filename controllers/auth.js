// SIGN UP FORM
// SIGN UP POST
app.post('/sign-up', function(req, res, next) {
  // Create User and JWT
  const user = new User(req.body);

  user.save(function (err) {
    if (err) { return res.status(400).send({ err: err }) }

    res.redirect('/');
  })
});

app.get('/sign-up', function(req, res, next) {
  res.render('sign-up');
});

// LOGIN FORM
app.get('/login', function(req, res, next) {
  res.render('login');
});

// LOGOUT
app.get('/logout', function(req, res, next) {
  res.clearCookie('nToken');

  res.redirect('/');
});
