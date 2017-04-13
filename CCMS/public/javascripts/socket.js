
   var socket = io.connect('http://127.0.0.1:3000');
   function broadCastNews(){
      console.log(1);
      socket.emit('new');
   }
   socket.on('new_announcement',function(data){
      console.log(data.msg);
      swal(data.msg);
   });
   function logined(){
      var username = $('.userInfo').find('span').text();
      socket.emit('login',username);
      socket.on('logined',function(data){
         swal(data.msg);
      })
   }
