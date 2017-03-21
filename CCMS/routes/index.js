var express = require('express');
var router = express.Router();
var database = require('../midwares/dataHandler');
var async = require('async');
router.get('/index',function(req,res){
    var user = req.session.user;
    var page =req.query.page;
    page = isNaN(page) || page == 0 ? 1 : page;
    var getNewsSql =  "select * from news";
    var getAssSql =  "select * from association_info where id in (select a_id from association_user_info where u_id = ?)";
    var getAll = 'select * from association_info limit '+(page-1)*6+','+page*6+'';
    /*
     Promise.all()是Promise对象的一个方法，他的参数是一个数组，数组的元素是希望执行的操作，在数组中的操作全部执行之后，才会调用.then方法。
     利用Promise.all集中管理所有异步数据查询，等所有数据库操作执行完成之后按照操作的执行顺序将所有操作的查询结果依次放入数组
     在完成之后  调用  .then 并且将查询结果传给.then 里面的回调函数
     */
    function task1(){
        return user?database.dataHandler(getAssSql,user.id):'';
    }
    Promise.all([task1(),database.dataHandler(getNewsSql,""),database.dataHandler(getAll,'')])
        .then(function(value){
            //value是所有查询结果的数组集合
            res.locals.ass = value[0];
            res.locals.news = value[1];
            res.locals.asses = value[2];
            res.render("index",{
                title:"主页",
                user: user
            })
        })
});
module.exports = router;
