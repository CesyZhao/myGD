/**
 * Created by Administrator on 2017/3/3.
 */
var mysql = require("mysql");
//var connection = mysql.createConnection("mysql://root:root@127.0.0.1/mygd?debug=true&charset=UTF8_GENERAL_CI");
//配置连接池
var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'mygd',
    port:'3306'
});
//封装连接池的方法
var db = {
    //传入sql语句，需要传入的数据，以及数据库操作成功之后的回调函数
    query : function(sql,data,callback){
        pool.getConnection(function(err,connection){
            if(!err){
                //连接数据库成功之后进行数据库操作
                connection.query(sql,data,function(err,rows){
                    if(!err){
                        //查询成功后将数据交给回调函数
                        callback(rows);
                    }else{
                        console.log(err);
                    }
                    //释放链接
                    connection.release();
                });
            }else{
                console.log(err);
            }
        })
    }
};
//各种需要使用的数据库操作封装
var database = {
    //用户名查重方法
    checkRepeat : function(res,username){
        //查询的sql语句
        var sql = "select * from users where username = ?";
        db.query(sql,username,function(rows){
            res.send(rows);
            res.end();
        });
    },
    //注册方法
    register : function(res,user){
        //插入的sql语句
        var sql = "insert into users(username,password,question,answer) values (?,?,?,?)";
        db.query(sql,[user.username,user.password,user.question,user.answer],function(rows){
            if(rows.affectedRows == 1){
                //成功注册之后跳转至登录页面
                res.redirect("toLogin");
            }
        })
    },
    //登录方法
    login : function(req,res,loginInfo){
        var sql = "select * from users where username = ? and password = ?";
        db.query(sql,[loginInfo.username,loginInfo.password],function(rows){
            if(rows.length != 0){
                //查询到结果，将查询结果存入session
                    req.session.user = normalize(rows[0]);
                    res.redirect("/index?user_id="+req.session.user.id+"");
                }
            }
        )
    },
    findAssociation : function(req,userId,callback){
        console.log("userid:",userId);
        var sql = "select name from association_info where id in (select a_id from association_user_info where u_id = ?)";
        db.query(sql,userId,function(rows){
            if(rows.length != 0){
                console.log(rows);
                callback(rows);
               /* req.session.association = rows;
                console.log("before:",req.session.association);*/
            }
        })
    }
};
//将模块暴露出去
function normalize(obj){
    var result = {} ;
    for(var key in obj){
        if(obj[key] == null){
            result[key] = "未设置"
        }else{
            result[key] = obj[key];
        }
    }
    return result;
}
module.exports = database;
