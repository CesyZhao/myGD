/**
 * Created by CesyZhao on 2017/4/12.
 */
var express = require('express');
var router = express.Router();
var database = require('../midwares/dataHandler');
var checkUserName = require('../midwares/checkUserName');
var checkEmpty = require('../midwares/checkEmpty');
//跳转至社团中心
router.get('/toCenter',function(req,res){
    var user = req.session.user?req.session.user:{};
    var a_id = req.query.id;
    var sqlFindInfo = 'select * from association_info where id=?';
    var findLevel = "select level from association_user_info where a_id =? and u_id = ?";
    Promise.all([database.dataHandler(sqlFindInfo,a_id),database.dataHandler(findLevel,[a_id,user.id])])
        .then(function(value){
            console.log(value);
            res.locals.ass_info = value[0][0];
            console.log('info:',res.locals.ass_info);
            res.locals.userLevel = value[1][0];
            res.render('templates/association/assInfo',{
                title:'社团简介',
                user:user,
                collapse:'menuOne',
                status:'description',
                ass_info_id:a_id
            });
        })

});
//跳转至成员信息
router.get('/toMembers',function(req,res){
    var user = req.session.user?req.session.user:{};
    var a_id = req.query.id;
    var choice =req.query.category;
    res.locals.categoryMems = choice;
    var keyword = req.query.searchWords;
    console.log('word:',keyword);
    var page = req.query.page;
    page = isNaN(page) || page == 0 ? 1 : page;
    var begin = (page-1)*8;
    var end = 8;
    var sqlFindMember;
    var getCount;
    sqlFindMember = "select * from users where id in (select id from association_user_info where a_id = ?) limit "+begin+","+end+"";
    getCount = "select count(*) as count from users where id in (select id from association_user_info where a_id = ?)";
    /*var sqlFindNotification = "select * from association_notification where a_id =? limit "+begin+","+end+"";*/
    if(choice){
         sqlFindMember = "select * from users where id in (select id from association_user_info where a_id = ?)" +
            "and gender ='"+choice+"' limit "+begin+","+end+"";
         getCount = "select count(*) as count from users where id in (select id from association_user_info where a_id = ?)" +
            "and gender ='"+choice+"'";
    }else if(keyword){
        sqlFindMember = "select * from users where id in (select id from association_user_info where a_id = ?)" +
            " and username like '%"+keyword+"%' limit "+begin+","+end+" ";
        getCount = "select count(*) as count from users where id in (select id from association_user_info where a_id = ?)" +
            " and username like '%"+keyword+"%' ";
    }
    Promise.all([database.dataHandler(sqlFindMember,[a_id]),database.dataHandler(getCount,[a_id])])
        .then(function(value){
            res.locals.members = value[0];
            res.locals.pagesMem = Math.ceil(value[1][0].count/8);
            res.render('templates/association/membersInfo',{
                title:'社团成员',
                user:user,
                collapse:'menuOne',
                status:'members',
                ass_info_id:a_id
            })
        })
});
//留言中心
router.get('/toMessager',function(req,res){
    var user = req.session.user?req.session.user:{};
    res.render('templates/association/message',{
        title:'留言板',
        user:user,
        collapse:'menuTwo',
        status:'message'
    })
});
module.exports = router;