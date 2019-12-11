var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


// MAZE CODE
app.get('/maze', function(req, res){
  res.sendFile(__dirname + '/html/maze.html');
});
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('movement', function(msg){
    console.log('message: ' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
