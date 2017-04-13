var express = require('express');
var router = express.Router();
var database = require('../midwares/dataHandler');
var multer  = require('multer');
var picture = multer({ dest: 'myGD/CCMS/public/images/picture'});
//新闻管理的路由
router.get('/toNews',function(req,res){
    var page =req.query.page;
    var choice = req.query.category;
    res.locals.categoryNews = choice;
    page = isNaN(page) || page == 0 ? 1 : page;
    var begin = (page-1)*8;
    var end = 8;
    var getNewsSql =  "select * from news limit "+begin+","+end+"";
    var getCount = 'select count(*) as count from news ';
    if(choice){
        getNewsSql =  "select * from news where kind='"+choice+"' limit "+begin+","+end+"";
        getCount = "select count(*) as count from news where kind='"+choice+"' ";
    }
    Promise.all([database.dataHandler(getNewsSql,''),database.dataHandler(getCount,'')])
        .then(function(value){
            res.locals.news = value[0];
            res.locals.pages = Math.ceil(value[1][0].count/8);
            res.render('templates/admin/newsManager',{
                title:"个人中心",
                user:req.session.user,
                collapse:'menuFour',
                status:'toNews'
            })
        })

});
//添加新闻的路由
router.post('/addNews',picture.single('picture'),function(req,res){
    var news = req.body;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var time = year+'-'+month+'-'+day;
    var sql =  'insert into news (title,content,date,kind,picture,src) values(?,?,?,?,?,?)';
    console.log(req.file);
    var pic = news.kind == 'hot'?req.file.filename:'';
    var src = news.kind == 'hot'?req.file.originalname:'';
    database.dataHandler(sql,[news.title,news.content,time,news.kind,pic,src])
        .then(function(value){
            if(value.affectedRows == 1){
                req.flash('success','新闻发布成功!');
                res.redirect('toNews');
            }else{
                req.flash('error','新闻发布失败!');
                res.redirect('toNews');
            }
        })
});
//修改新闻内容
router.post('/updateNews',picture.single('picture'),function(req,res){
    var news = req.body;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var time = year+'-'+month+'-'+day;
    var pic = news.kind == 'hot'?req.file.filename:'';
    var src = news.kind == 'hot'?req.file.originalname:'';
    var sql = 'update news set title=?,content=?,date=?,kind=?,picture=?,src=? where id=?';
    database.dataHandler(sql,[news.title,news.content,time,news.kind,pic,src,news.id])
        .then(function(value){
            if(value.affectedRows == 1){
                req.flash('success','新闻内容更新成功!');
                res.redirect('toNews');
            }else{
                req.flash('error','新闻内容更新失败!');
                res.redirect('toNews');
            }

        })
});
//删除新闻
router.post('/deleteNews',function(req,res){
    var id  = req.body.id;
    var sql  = 'delete from news where id=?';
    database.dataHandler(sql,[id])
        .then(function(value){
            if(value.affectedRows == 1){
                res.send('success');
            }else{
                res.send('failed');
            }
        })
});
//创建社团的申请管理
router.get('/toAssApply',function(req,res){
    var page =req.query.page;
    page = isNaN(page) || page == 0 ? 1 : page;
    var begin = (page-1)*8;
    var end = 8;
    var choice  = req.query.category;
    res.locals.categoryApply = choice;
    var sql;
    var getCount;
    sql = "select * from apply_to_admin where kind = 'association' order by status limit "+begin+","+end+"";
    getCount = "select count(*) as count from apply_to_admin where kind = 'association'";
    if(choice){
        sql = "select * from apply_to_admin where kind = 'association' and status ='"+choice+"' order by status limit "+begin+","+end+"";
        getCount = "select count(*) as count from apply_to_admin where kind = 'association' and status ='"+choice+"'";
    }

    //var sql = "SELECT CASE WHEN [status]='未审核' THEN 0 ELSE 1 END FLAG,* FROM apply_to_admin order by flag asc"
   Promise.all([ database.dataHandler(sql,''),database.dataHandler(getCount,'')])
        .then(function(value){
            res.locals.ass = value[0];
            res.locals.pagesApply = Math.ceil(value[1][0].count/8);
            res.render('templates/admin/assManager',{
                collapse:'menuFour',
                status:'toAssApply'
            });
        })

});
//审核申请
router.post('/review/:id/:status',function(req,res){
    var user = req.session.user;
    var id = req.params.id;
    var status = req.params.status;
    var ass = req.body;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var founddate = year+'-'+month+'-'+day;
    var sql;
    var data;
    var sql2;
    var task2;
    console.log(ass.category);
    switch (status){
        case 'ok':
            sql = "update apply_to_admin set status = '2',reason='' where id = ?";
            sql2 = 'insert into association_info(name,keyword,leader,avatar,founddate,memberCount,category) values (?,?,?,?,?,?,?)';
            task2 = database.dataHandler(sql2,[ass.name,ass.keyword,ass.leader,'default.jpg',founddate,1,ass.category]);
            data = id;
            break;
        case 'deny':
            sql = "update apply_to_admin set status = '3',reason=? where id = ?";
            sql2 = "delete from association_info where keyword=?";
            task2 = database.dataHandler(sql2,ass.keyword);
            data = [req.body.reason,id];
            break;
        case 'waiting':
            sql = "update apply_to_admin set status = '1',reason='' where id = ?";
            task2 = "";
            data = id;
            break;
    }
    var task1 = database.dataHandler(sql,data);
    Promise.all([task1,task2])
        .then(function(value){
            console.log(value);
            var a_id = value[1].insertId;
            console.log(a_id);
            console.log(id);
            if(a_id){
                var insertSql = "insert into association_user_info(a_id,u_id,level) values(?,?,'admin')";
                database.dataHandler(insertSql,[a_id,user.id])
                    .then(function(){
                        if(value[0].affectedRows == 1 ) {
                            req.flash('success', '审核成功!');
                            res.redirect('../../toAssApply');
                        }else{
                            req.flash('error', '审核失败!');
                            res.redirect('../../toAssApply');
                        }
                    })
            }else{
                if(value[0].affectedRows == 1 ) {
                    req.flash('success', '审核成功!');
                    res.redirect('../../toAssApply');
                }else{
                    req.flash('error', '审核失败!');
                    res.redirect('../../toAssApply');
                }
            }
        })
});
//活动申请管理
router.get('/toActApply',function(req,res){
    var page =req.query.page;
    page = isNaN(page) || page == 0 ? 1 : page;
    var begin = (page-1)*8;
    var end = 8;
    var choice  = req.query.category;
    res.locals.categoryApply = choice;
    var sql;
    var getCount;
    sql = "select * from apply_to_admin where kind = 'activity' order by status limit "+begin+","+end+"";
    getCount = "select count(*) as count from apply_to_admin where kind = 'activity'";
    if(choice){
        sql = "select * from apply_to_admin where kind = 'activity' and status ='"+choice+"' order by status limit "+begin+","+end+"";
        getCount = "select count(*) as count from apply_to_admin where kind = 'activity' and status ='"+choice+"'";
    }

    //var sql = "SELECT CASE WHEN [status]='未审核' THEN 0 ELSE 1 END FLAG,* FROM apply_to_admin order by flag asc"
    Promise.all([ database.dataHandler(sql,''),database.dataHandler(getCount,'')])
        .then(function(value){
            res.locals.act = value[0];
            res.locals.pagesAct = Math.ceil(value[1][0].count/8);
            res.render('templates/admin/assManager',{
                collapse:'menuFour',
                status:'toAssApply'
            });
        })

});
router.post('/reviewAct/:id/:status',function(req,res){
    var user = req.session.user;
    var id = req.params.id;
    var status = req.params.status;
    var ass = req.body;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var founddate = year+'-'+month+'-'+day;
    var sql;
    var data;
    var sql2;
    var task2;
    console.log(ass.category);
    switch (status){
        case 'ok':
            sql = "update apply_to_admin set status = '2',reason='' where id = ?";
            sql2 = 'insert into association_info(name,keyword,leader,avatar,founddate,memberCount,category) values (?,?,?,?,?,?,?)';
            task2 = database.dataHandler(sql2,[ass.name,ass.keyword,ass.leader,'default.jpg',founddate,1,ass.category]);
            data = id;
            break;
        case 'deny':
            sql = "update apply_to_admin set status = '3',reason=? where id = ?";
            sql2 = "delete from association_info where keyword=?";
            task2 = database.dataHandler(sql2,ass.keyword);
            data = [req.body.reason,id];
            break;
        case 'waiting':
            sql = "update apply_to_admin set status = '1',reason='' where id = ?";
            task2 = "";
            data = id;
            break;
    }
    var task1 = database.dataHandler(sql,data);
    Promise.all([task1,task2])
        .then(function(value){
            console.log(value);
            var a_id = value[1].insertId;
            console.log(a_id);
            console.log(id);
            if(a_id){
                var insertSql = "insert into association_user_info(a_id,u_id,level) values(?,?,'admin')";
                database.dataHandler(insertSql,[a_id,user.id])
                    .then(function(){
                        if(value[0].affectedRows == 1 ) {
                            req.flash('success', '审核成功!');
                            res.redirect('../../toAssApply');
                        }else{
                            req.flash('error', '审核失败!');
                            res.redirect('../../toAssApply');
                        }
                    })
            }else{
                if(value[0].affectedRows == 1 ) {
                    req.flash('success', '审核成功!');
                    res.redirect('../../toAssApply');
                }else{
                    req.flash('error', '审核失败!');
                    res.redirect('../../toAssApply');
                }
            }
        })
});
module.exports = router;