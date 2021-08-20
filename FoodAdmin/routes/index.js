var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var checkLogin = require('../commons/authenticate')

var users = [
  { id: 1, username: 'admin', password: '1' },
  { id: 2, username: '123', password: '2' }
]

/* GET home page. */
router.get('/', checkLogin.check, function (req, res, next) {
  res.redirect('product');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  let { username, password } = req.body;
  let user = users.find(us => us.username == username && us.password == password)

  if (user) {
    let token = jwt.sign({ user }, process.env.JWT_KEY);
    req.session.token = token
    res.redirect('/product')
  } else {
    res.redirect('/login')
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect('login');
  })

});

module.exports = router;
