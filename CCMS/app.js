var express = require('express');
var fs = require("fs");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//导入flash控件
var flash = require("connect-flash");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//导入session
var session = require("express-session");
//导入路由
var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var personal = require('./routes/personal');
var association = require('./routes/association');
var test = require('./routes/test');
var app = express();
// view engine setup  设置模板引擎以及模板路径
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//cookie
app.use(cookieParser('keyboard cat'));
//session配置
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
            maxAge : 1000*60*60
  }
}));
//组件 connect-flash  消息通知则兼
app.use(flash());
//将消息通知的信息传给res.locals  这样在模板中便可直接使用，而不需要传给render
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  res.locals.success1 = req.flash('success1').toString();
  res.locals.error1 = req.flash('error1').toString();
  next();
});
// uncomment after placing your favicon in /public  页面图标
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//默认静态文件路径
app.use(express.static(path.join(__dirname, 'public')));


//路由index
app.use('/', index);
//路由 users
app.use('/users', users);
app.use('/admin',admin);
app.use('/personal',personal);
app.use('/association',association);
//测试路由
app.use('/',test);

// 处理表单及文件上传的中间件
/*
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/images'),// 设置上传图片的路径为public/images
  keepExtensions: true// 保留后缀
}));
*/

// catch 404 and forward to error handler  获取404错误
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler  处理错误信息
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
