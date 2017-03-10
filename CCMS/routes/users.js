var express = require('express');
var router = express.Router();
var database = require('../dataHandler');
/* GET users listing. */
//跳转至登录页面的路由
router.get('/toLogin', function(req, res, next) {
  res.render("login");
});
//跳转至注册页面的路由
router.get('/toRegister', function(req, res, next) {
    res.render("register");
});
//跳转至个人中心的路由
router.get('/toPersonal', function(req, res, next) {
    res.render("personal");
});
//跳转至社团中心的路由
router.get('/association/:page?',function(req,res){
    console.log(req.params);
    res.render('association',{page:req.params.page});
});
//异步查询用户名是否重复的路由
router.get("/checkRepeat",function(req,res){
    database.checkRepeat(res,req.query.username);
   // console.log("this is the data from server:",rows);

});
//注册的路由
router.post("/register",function(req,res){
    //console.log(req.body);
    database.register(res,req.body);
});
router.post("/login",function(req,res){
    database.login(req,res,req.body);
});
module.exports = router;
