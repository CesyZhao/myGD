var express = require('express');
var router = express.Router();
var database = require('../dataHandler');

/* GET home page. */
router.get('/index', function(req, res, next) {
  var user = req.session.user;
  //查询时使用回调，将查询结果传给回调
  var ass ;
   database.findAssociation(req,user.id,function(rows){
     if(rows){
       //假如有查询结果，赋值给变量
       ass = rows;
       console.log("ass:",ass);

     }
   });
  //在回调中进行render,将变量传给render
  res.render('index', {
    title: '大学生社团活动平台',
    user:user,
    ass:ass
  });
  //var association = req.session.association;

});

module.exports = router;
