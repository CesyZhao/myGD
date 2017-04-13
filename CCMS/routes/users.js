var express = require('express');
var router = express.Router();
var database = require('../midwares/dataHandler');
var checkUserName = require('../midwares/checkUserName');
var checkEmpty = require('../midwares/checkEmpty');
var path = require('path');
var multer  = require('multer');
var upload = multer({ dest: 'myGD/CCMS/public/images/avatar'});
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
router.get('/toPersonal/:category', function(req, res, next) {
    var category = req.params.category;
    var user = req.session.user;
    res.locals.category = category;
    var getAssSql =  "select * from association_info where id in (select a_id from association_user_info where u_id = ?)";
    var task1;
    var task2;
    var task3;
    var sql;
    var data;
    if(category == 'user'){
        res.render("templates/"+category,{
            title:"个人中心",
            user:req.session.user
        });
    }else{
        switch (category){
            case 'ass':
                sql = "select * from association_info where id in (select a_id from association_user_info where u_id = ?)";
                data = user.id;
                task1 = database.dataHandler(sql,data);
                break;
            case 'apply':
                break;
            case 'admin':
                var sql1 = "select * from apply_to_admin where kind = 'association' ";
                task1 = database.dataHandler(sql1,'');
                var sql2 = "select * from apply_to_admin where kind = 'activity' ";
                task2 = database.dataHandler(sql2,'');
                break;
        }
        Promise.all([task1,task2])
            .then(function(value){
                res.locals[category] = value;
                res.render("templates/"+category,{
                    title:"个人中心",
                    user:req.session.user
                });
            })
            .catch(function(error){
                console.log(error);
            })
      /*  database.dataHandler(sql,data)
            .then(function(value){
                res.locals[category] = value;
                res.render("templates/"+category,{
                    title:"个人中心",
                    user:req.session.user
                });
            })*/
    }

});
//跳转至社团中心的路由
router.get('/association/:id',function(req,res){
    var a_id = req.params.id;
    var sqlFindInfo = 'select * from association_info where id=?';
    var sqlFindMember = 'select * from users where id in (select id from association_user_info where a_id = ?)';
    var sqlFindNotification = 'select * from association_notification where a_id =?';
    Promise.all([database.dataHandler(sqlFindInfo,a_id),database.dataHandler(sqlFindMember,a_id),database.dataHandler(sqlFindNotification,a_id)])
        .then(function(value){
            res.locals.ass_info = value[0];
            res.locals.ass_members = value[1];
            res.locals.ass_notifes = value[2];
            res.render('association',{
                title:'社团中心'
            });
        })

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
    //先进行判空
    checkEmpty.check(user)
        //获取判空的结果
        .then(function(value){
            //若判空结果为1，则验证用户名是否被占用
            if(value == 1){
                checkUserName.check(user.username)
                    .then(function(value){
                        if(value.length == 1){
                            //若用户名被占用，则抛出错误信息
                            req.flash('error','该用户名已经被占用!');
                            res.redirect('toRegister');
                        }else{
                            //用户名可用则进行注册
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
        //获取判空时抛出的异常
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
                res.redirect("/index");
            }else{
                req.flash('error','用户名或者密码错误!');
                res.redirect('toLogin');
            }
        })
});
//登出的路由
router.get("/logout",function(req,res){
    req.session.user = {};
    console.log(req.session.user.length);
    //登出之后默认跳回主页
    res.redirect("/index");
});
router.post('/applyNew',function(req,res){
    var association = req.body;
    var sqlCheck = 'select * from association_info where keyword = ?';
    var sqlApply = "insert into apply_to_admin(name,keyword,status,kind,applier,category) values(?,?,'0','association',?,?)";
    database.dataHandler(sqlCheck,[association.keyword])
        .then(function(value){
            if(value.length >= 1){
                req.flash('error','该关键字的社团已经存在!');
                res.redirect('../index#listPanel');
            }else{
                database.dataHandler(sqlApply,[association.name,association.keyword,req.session.user.username,association.category])
                    .then(function(value){
                        if(value.affectedRows == 1){
                            req.flash('success','申请已经提交，你可以在个人中心查看审核结果!');
                            res.redirect('../index#listPanel');
                        }
                    })
            }
        })
});
module.exports = router;
