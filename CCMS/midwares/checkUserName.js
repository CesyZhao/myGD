/**
 * Created by Administrator on 2017/3/16.
 */
var database = require('../midwares/dataHandler');
exports.check = function(username){
    var sql = "select * from users where username = ?";
    return database.dataHandler(sql,username);
};