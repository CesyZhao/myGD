var express = require('express');
var router = express.Router();
var database = require('../midwares/dataHandler');
var checkUserName = require('../midwares/checkUserName');
var checkEmpty = require('../midwares/checkEmpty');
var path = require('path');
var multer  = require('multer');
var upload = multer({ dest: 'public/images/'});
/* GET users listing. */
//跳转至登录页面的路由
router.get('/toLogin', function(req, res, next) {
  res.render("login",{
      title:"登录"
    });
});
//跳转至注册页面的路由
router.get('/toRegister', function(req, res, next) {
    res.render("register",{
        title:"注册"
    });
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

});
//注册的路由
router.post("/register",function(req,res){
    //console.log(req.body);
   /* database.register(res,req.body);*/
    var user = req.body;
    var sqlRegister = "insert into users(username,password,question,answer,gender) values(?,?,?,?,?)";
    checkEmpty.check(user)
        .then(function(value){
            if(value == 1){
                checkUserName.check(user.username)
                    .then(function(value){
                        if(value.length == 1){
                            req.flash('error','该用户名已经被占用!');
                            res.redirect('toRegister');
                        }else{
                           database.dataHandler(sqlRegister,[user.username,user.password,user.question,user.answer,user.gender])
                               .then(function(value){
                                   if(value.affectedRows == 1){
                                       res.redirect('toLogin');
                                   }
                               })
                        }
                    })
            }
        })
        .catch(function(error){
            req.flash('error',error.message);
            res.redirect('toRegister');
        })
});
router.post("/login",function(req,res){
    /*database.login(req,res,req.body);*/
    var info = req.body;
    //登录的sql语句
    var sql = "select * from users where username = ? and password = ?";
    database.dataHandler(sql,[info.username,info.password])
        .then(function(value){
            if(value.length!=0){
                //将查询到的结果赋值给session，这里查询到的结果是一个数组，所以取第一个
                req.session.user = value[0];
                //登录成功后跳转至index主页
                res.redirect("/index/"+req.session.user.id+"");
            }
        })
});
//登出的路由
router.get("/logout",function(req,res){
    req.session.user = {};
    //登出之后默认跳回主页
    res.redirect("../index");
});
router.post("/changeAvatar",upload.single('avatar'),function(req,res){
    console.log(req.file);
    console.log(req.body.id);
    var sql = "update users set avatar = ? where id = ?";
    database.dataHandler(sql,[req.file.filename,req.body.id])
        .then(function(value){
            if(value.effaffectedRows = 1){
                req.session.user.avatar = req.file.filename;
                res.redirect('toPersonal');
            }
        })
});
module.exports = router;
