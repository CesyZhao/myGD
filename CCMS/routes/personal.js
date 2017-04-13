/**
 * Created by CesyZhao on 2017/3/27.                                                              个
 */
var express = require('express');
var router = express.Router();
var database = require('../midwares/dataHandler');
var checkUserName = require('../midwares/checkUserName');
var multer  = require('multer');
var upload = multer({ dest: './myGD/CCMS/public/images/avatar'});
router.get('/accountInfo',function(req,res){
    res.render('templates/personal/accountInfo',{
        user:req.session.user,
        collapse:'menuOne',
        status:'accountInfo',
        title:'账号信息'
    })
});
//更换头像
router.post("/changeAvatar",upload.single('avatar'),function(req,res){
    var sql = "update users set avatar = ? where id = ?";
    database.dataHandler(sql,[req.file.filename,req.body.id])
        .then(function(value){
            if(value.affectedRows == 1){
                //req.session.user.avatar = req.file.filename;
                database.reFreshUserInfo(req.session.user.id)
                    .then(function(value){
                        req.flash('success','更改头像成功!');
                        req.session.user  = value[0];
                        res.redirect('accountInfo');
                    });
            }else{
                req.flash('error','更改头像失败!');
                res.redirect('accountInfo');
            }
        })
});
//更换用户名
router.post('/changeUserName',function(req,res){
    var newName = req.body.username;
    var sql = 'update users set username = ? where id = ?';
    checkUserName.check(newName)
        .then(function(value){
            if(value.length == 1){
                req.flash('error','该用户名被占用!');
                res.redirect('accountInfo');
            }else{
                database.dataHandler(sql,[newName,req.session.user.id])
                    .then(function(value){
                        if(value.affectedRows == 1){
                            database.reFreshUserInfo(req.session.user.id)
                                .then(function(value){
                                    req.flash('success','用户名修改成功!');
                                    req.session.user  = value[0];
                                    res.redirect('accountInfo');
                                })
                        }
                    })
            }
        })
});
//更改密码
router.post('/changePassword',function(req,res){
    var data = req.body;
    var user = req.session.user;
    var sqlCheck = 'select * from users where id=? and answer = ?';
    var sqlUpdPwd = 'update users set password = ? where id = ?';
    database.dataHandler(sqlCheck,[user.id,data.answer])
        .then(function(value){
            if(value.length == 1){
                database.dataHandler(sqlUpdPwd,[data.password,user.id])
                    .then(function(value){
                        if(value.affectedRows == 1){
                            req.flash('success1','密码更改成功!');
                            res.redirect('accountInfo');
                        }
                    })
            }else{
                req.flash('error1','密保问题回答错误!');
                res.redirect('accountInfo');
            }
        })
});
router.get('/personalInfo',function(req,res){
    res.render('templates/personal/personalInfo',{
        user:req.session.user,
        collapse:'menuOne',
        status:'personalInfo',
        title:'用户信息'
    })
});
router.post('/changePersonalInfo',function(req,res){
    var info = req.body;
    var id= req.session.user.id;
    var sql = 'update users set realname=?, age=?, gender=?, birthday=?, hobby=?, description=? where id=?';
    database.dataHandler(sql,[info.realName,info.age,info.gender,info.birthday,info.hobby.toString(),info.description,id])
        .then(function(value){
            if(value.affectedRows == 1){
                database.reFreshUserInfo(req.session.user.id)
                    .then(function(value){
                        req.session.user  = value[0];
                        req.flash('success','更新信息成功!');
                        res.redirect('personalInfo');
                    });
            }else{
                req.flash('error','更新信息失败!');
                res.redirect('personalInfo');
            }
        })
});
router.get('/toMyAss',function(req,res){
    var user = req.session.user;
    var page =req.query.page;
    page = isNaN(page) || page == 0 ? 1 : page;
    var choice = req.query.category;
    res.locals.category = choice;
    var begin = (page-1)*4;
    var end = 4;
    var sql;
    var getCount;
    sql = "select * from association_info where id in (select a_id from association_user_info where u_id = ?) limit "+begin+","+end+"";
    getCount  = "select count(*) as count from association_info where id in (select a_id from association_user_info where u_id = ?)";
    if(choice){
        sql = "select * from association_info where id in (select a_id from association_user_info where u_id = ?) " +
            "and category='"+choice+"' limit "+begin+","+end+"";
        getCount = "select count(*) as count from association_info where id in (select a_id from association_user_info where u_id = ?)" +
            "and category='"+choice+"' ";
    }
    Promise.all([database.dataHandler(sql,user.id),database.dataHandler(getCount,user.id)])
        .then(function(value){
            res.locals.ass = value[0];
            res.locals.pagesAss = Math.ceil(value[1][0].count/4);
            res.render('templates/personal/myAss',{
                collapse:'menuTwo',
                status:'myAss',
                title:'加入的社团'
            })
        })
});
router.get('/toMyManAss',function(req,res){
    var user = req.session.user;
    var page =req.query.page;
    page = isNaN(page) || page == 0 ? 1 : page;
    var choice = req.query.category;
    res.locals.category = choice;
    var begin = (page-1)*4;
    var end = 4;
    var sql;
    var getCount;
    sql = "select * from association_info where id in " +
        "(select a_id from association_user_info where u_id = ? and level='admin') limit "+begin+","+end+"";
    getCount = "select count(*) as count from association_info where id in " +
        "(select a_id from association_user_info where u_id = ? and level='admin')";
    if(choice){
        sql = "select * from association_info where id in " +
            "(select a_id from association_user_info where u_id = ? and level='admin') and category='"+choice+"' limit "+begin+","+end+"";
        getCount = "select count(*) as count from association_info where id in " +
            "(select a_id from association_user_info where u_id = ? and level='admin') and category='"+choice+"'";
    }
    Promise.all([database.dataHandler(sql,user.id),database.dataHandler(getCount,user.id)])
        .then(function(value){
            res.locals.adminass = value[0];
            res.locals.pagesAdminAss = Math.ceil(value[1][0].count/8);
            res.render('templates/personal/myAdminAss',{
                collapse:'menuTwo',
                status:'myAdminAss',
                title:'我管理的社团'
            })
        })
});
router.get('/toMyApply',function(req,res){
    var user = req.session.user;
    var page =req.query.page;
    page = isNaN(page) || page == 0 ? 1 : page;
    var begin = (page-1)*8;
    var end = 8;
    var choice  = req.query.category;
    res.locals.categoryApply = choice;
    var sql = "select * from apply_to_admin where applier = ? and kind='association' order by status limit "+begin+","+end+"";
    var getCount = "select count(*) as count from apply_to_admin where applier = ? and kind='association' ";
    if(choice){
        sql = "select * from apply_to_admin where applier = ? and status ='"+choice+"' limit "+begin+","+end+" ";
        var getCount = "select count(*) as count from apply_to_admin where applier = ? and status ='"+choice+"'";
    }
    Promise.all([database.dataHandler(sql,[user.username]),database.dataHandler(getCount,[user.username])])
        .then(function(value){
                res.locals.myApply = value[0];
                res.locals.pages = Math.ceil(value[1][0].count/8);
                res.render('templates/personal/myApply',{
                    collapse:'menuThree',
                    status:'toMyApply',
                    title:'我的申请'
                })

        })
});
router.post('/changeApply',function(req,res){
    var apply = req.body;
    var sql = "update  apply_to_admin set name=?,keyword=? where id=?";
    database.dataHandler(sql,[apply.name,apply.keyword,apply.id])
        .then(function(value){
            if(value.affectedRows == 1){
                req.flash('success','修改申请成功!');
                res.redirect('toMyApply');
            }else{
                req.flash('error','修改申请失败!');
                res.redirect('toMyApply');
            }
        })
});
router.post('/dismissApply',function(req,res){
    var id = req.body.id;
    var sql = "delete from apply_to_admin where id =?";
    database.dataHandler(sql,[id])
        .then(function(value){
            if(value.affectedRows == 1){
                res.send('success');
            }else{
                res.send('error');
            }
        })
});
module.exports = router;