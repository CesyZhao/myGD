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
    console.log(req.session.user);
    var user = req.session.user;
    res.render("personal",{
        title:"个人中心",
        user:req.session.user
    });
});
//跳转至社团中心的路由
router.get('/association/:page?',function(req,res){
    console.log(req.params);
    res.render('association',{page:req.params.page});
});
//异步查询用户名是否重复的路由
router.post("/checkRepeat",function(req,res){
    //database.checkRepeat(res,req.query.username);
    var sql = "select * from users where username = ?";
    database.dataHandler(sql,req.body.username)
        .then(function(value){
            console.log(value);
            if(value.length != 0){
                req.flash('error','用户名已经被占用');
                res.redirect("toRegister");
            }else{
                res.redirect("register");
            }
        });

});
//注册的路由
router.post("/register",function(req,res){
    //console.log(req.body);
   /* database.register(res,req.body);*/
    var user = req.body;
    try{
        for(var key in req.body){
            if(req.body[key].length == 0){
                throw new Error("您有信息未填写!");
            }
        }
    }catch (e){
        req.flash('error',e.message);
        res.redirect("register");
    }
    var sql = "insert into users(username,password,question,answer) values (?,?,?,?)";
    database.dataHandler(sql,[user.username,user.password,user.question,user.answer])
        .then(function(value){
            if(value.affectedRows == 1){
                res.redirect("toLogin");
            }
        })
});
router.post("/login",function(req,res){
    /*database.login(req,res,req.body);*/
    var info = req.body;
    var sql = "select * from users where username = ? and password = ?";
    database.dataHandler(sql,[info.username,info.password])
        .then(function(value){
            if(value.length!=0){
                req.session.user = value[0];
                console.log("session:",req.session);
                res.redirect("/index/"+req.session.user.id+"");
            }
        })
});
router.get("/logout",function(req,res){
    req.session.user = {};
    res.redirect("../index");
});
module.exports = router;
