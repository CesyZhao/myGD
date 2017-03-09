/**
 * Created by Administrator on 2017/3/3.
 */
var mysql = require("mysql");
//var connection = mysql.createConnection("mysql://root:root@127.0.0.1/mygd?debug=true&charset=UTF8_GENERAL_CI");
var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'mygd',
    port:'3306'
});
var database = {
    checkRepeat : function(req,res,username){
        pool.getConnection(function(err,connection){
            if(!err){
               connection.query("select * from users where username = ?",username,function(err,rows){
                   if(!err){
                       res.send(rows);
                       res.end();
                   }else{
                       console.log(err);
                   }
               })
            }else{
                console.log(err);
            }
        })
    }
};
module.exports = database;
