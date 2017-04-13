var express = require('express');
var router = express.Router();
var database = require('../midwares/dataHandler');
router.get('/index',function(req,res){
    var user = req.session.user?req.session.user:{};
    var page =req.query.page;
    var newsPage = req.query.newsPage;
    var choice = req.query.category;
    res.locals.category = choice;
    var keywords = req.query.searchWords;
    console.log(keywords);
    page = isNaN(page) || page == 0 ? 1 : page;
    newsPage = isNaN(newsPage) || newsPage == 0 ? 1 : newsPage;
    var begin = (page-1)*8;
    var newsBegin = (newsPage-1)*8;
    var end = 8;
    var getNormalNews =  "select * from news where kind='normal' limit "+newsBegin+","+end+"";
    var getHotNews = "select * from news where kind = 'hot'";
    var getByPage;
    var getCount;
    //var getByPage = 'select * from association_info limit '+begin+','+end+'';
    //var getCount = 'select count (*) as count from association_info';
    var getNewsCount = "select count(*) as count from news where kind='normal'";
    if(choice){
        getByPage = "select * from association_info where category='"+choice+"' limit "+begin+","+end+"";
        getCount = "select count (*) as count from association_info  where category='"+choice+"'";
    }else if(keywords){
        getByPage = "select * from association_info where name like '%"+keywords+"%' or keyword like '%"+keywords+"%'" +
            " or category like '%"+keywords+"%' limit "+begin+","+end+" ";
        getCount = "select count (*) as count from association_info where name like '%"+keywords+"%' or keyword like '%"+keywords+"%'" +
            " or category like '%"+keywords+"%' ";
    }else{
        getByPage = 'select * from association_info limit '+begin+','+end+'';
        getCount = 'select count (*) as count from association_info';
    }
    /*
     Promise.all()是Promise对象的一个方法，他的参数是一个数组，数组的元素是希望执行的操作，在数组中的操作全部执行之后，才会调用.then方法。
     利用Promise.all集中管理所有异步数据查询，等所有数据库操作执行完成之后按照操作的执行顺序将所有操作的查询结果依次放入数组
     在完成之后  调用  .then 并且将查询结果传给.then 里面的回调函数
     */
    Promise.all([database.dataHandler(getNormalNews,""),database.dataHandler(getHotNews,''),database.dataHandler(getByPage,''),
        database.dataHandler(getCount,''),database.dataHandler(getNewsCount,'')])
        .then(function(value){
            //value是所有查询结果的数组集合
            res.locals.news = value[0];
            res.locals.hotNews = value[1];
            res.locals.asses = value[2];
            res.locals.pages = Math.ceil(value[3][0].count/8);
            res.locals.newsPages = Math.ceil(value[4][0].count/8);
            res.render("indexes",{
                title:"主页",
                user: user
            })
        })
});
module.exports = router;
