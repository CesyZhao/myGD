var express = require('express');
var router = express.Router();
var database = require('../dataHandler');
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
router.get('/association/:page?',function(req,res){
    console.log(req.params);
    res.render('association',{page:req.params.page});
});
router.get("/checkRepeat",function(req,res){
    database.checkRepeat(req,res,req.query.username);
   // console.log("this is the data from server:",rows);

});
module.exports = router;
