/**
 * Created by Administrator on 2017/3/15.
 */
var express = require('express');
var router = express.Router();
var database = require('../dataHandler');
var async = require('async');
router.get("/test",function(req,res){
    req.flash('error',"this is a test");
    res.redirect("test1");
});
router.get("/test1",function(req,res){
    res.render('test')
});

module.exports = router;