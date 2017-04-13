/**
 * Created by Administrator on 2017/3/30.
 * messager power by socket.io used to broadcast
 * author:cesyzhao
 */
var socketIo = require('socket.io');
exports.listen = function(server){
    var io = socketIo(server);
    io.on('connection',function(socket){
        console.log(socket.id);
        socket.on('login',function(username){
            console.log(socket.sockets);
            socket.username = username;
            socket.emit('logined',{
                    msg:'welcome!'+socket.username
                })
            }
        );
        socket.on('new',function(){
            console.log(1);
            socket.broadcast.emit('new_announcement',{
                msg:'you got a new announcement!'
            })
        });
    })
}
