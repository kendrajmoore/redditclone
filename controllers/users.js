module.exports = (app) => {

// **************************** USER ******************************

// User Routes
    app.get('/user', function (req, res) {
        //res.send("Its working");
        res.render('user-new', {});
    });
// Creating an user
    app.post('/user/new', function (req, res) {
        User.create(req.body, function (err, user) {
            console.log(req.body);
            res.render('article-index', {user: user})
        });
    });
};
