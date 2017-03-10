var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  var user = req.session.user;
  console.log(user);
  res.render('index', {
    title: '大学生社团活动平台',
    user:user
  });
});

module.exports = router;
