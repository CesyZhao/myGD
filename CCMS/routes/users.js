var express = require('express');
var router = express.Router();
var pool = require("customer/pool");
/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render("login");
});
router.get('/register', function(req, res, next) {
    res.render("register");
});
router.get('/personal', function(req, res, next) {
    res.render("personal");
});
router.get('/association',function(req,res){
    res.render('association');
})
module.exports = router;
