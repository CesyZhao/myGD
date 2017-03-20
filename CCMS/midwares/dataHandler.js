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
    //操作数据库的方法
    dataHandler : function(sql,data){
                    //返回一个Promise对象
                    return new Promise(function(resolve,reject){
                        db.query(sql,data,function(rows){
                            if(rows){
                                //假如有数据，promise对象会进入 resolved 状态，将数据用 resolve()方法传给之后的方法
                                resolve(rows);
                            }
                        })
                    })
                },
    reFreshUserInfo : function(id){
                        return new Promise(function(resolve,reject){
                            var sql = 'select * from users where id =?';
                            db.query(sql,id,function(rows){
                                if(rows){
                                    resolve(rows);
                                }
                            })
                        })
    }
};
module.exports = database;
/*function normalize(obj){
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
*/

