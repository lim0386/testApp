// const { isPromise } = require('util/types');
// const socketIO = require('socket.io')(3000);

var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

// // on은 클라이언트에서 보낸 이벤트를 실행할 때 사용sudo
// socketIO.on('connection', function(socket) {
// 	console.log('Player Connected');
//     // emit은 클라이언트에 이벤트를 보낼 때 사용
//     var text1 = "내 딸 다경이를...";
//     socketIO.emit('PlayerConnected');
//     socketIO.emit('message', text1);
//     socketIO.on('disconnect', function() {
//         console.log('A Player disconnected');
//     });
// });


var io = require('socket.io')(server);

io.sockets.on('connection', function(socket) {

  console.log('Player Connected');
  socket.emit('PlayerConnected');

  socket.on('message', function(data) {
    //         console.log("Received: 'message'"+data);
    socket.broadcast.emit('message', data);
  });

  socket.on('disconnect', function() {
    console.log("Client has disconnected");
  });
});