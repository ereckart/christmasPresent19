var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.urlencoded());
app.use(express.json());

// MAZE CODE
app.get('/maze', function(req, res){
    res.sendFile(__dirname + '/html/maze.html');
});
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('direction', function(msg){
        socket.broadcast.emit('direction', msg)
    });
});
app.get('/g/:player/:place', function(req, res){
    console.log(req.params.place);
    res.render('genericGamePage', {
        'player': req.params.player,
        'place': req.params.place
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
