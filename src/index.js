var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.urlencoded());
app.use(express.json());


// ALL ASSETS ------------------------------------------------------------------
// people assets
const Kevin = new (require('./core/Kevin'))();
const Grandaddy = new (require('./core/Grandaddy'))();
const Nonni = new (require('./core/Nonni'))();
const Mickey = new (require('./core/Mickey'))();
const Hayley = new (require('./core/Hayley'))();
const characterMap = {
    'home': Kevin,
    'theland': Grandaddy,
    'downtown': Nonni,
    'eegees': Mickey,
    'trb': Hayley
}

// location assets
const Home = new (require('./core/Home'))();
const TheLand = new (require('./core/TheLand'))();
const Downtown = new (require('./core/Downtown'))();
const Eegees = new (require('./core/Eegees'))();
const TRB = new (require('./core/TRB'))();
const placeMap = {
    'home': Home,
    'theland': TheLand,
    'downtown': Downtown,
    'eegees': Eegees,
    'trb': TRB
}

// game data
const Player = require('./core/Player');
const players = {};
// -----------------------------------------------------------------------------

function announcement(msg) {
    console.log(msg);
}



function getPlayerMeta(player) {
    const bank = player.getBank();
    return {
        'coins': bank
    }
}

app.get('/:player/map', function(req, res){
    res.render('map', {
        'player': req.params.player
    });
});

io.on('connection', (client) => {
    let userId = client.handshake.query.userId;
    let placeName = client.handshake.query.place;
    if (players[userId] == null) players[userId] = new Player(userId);
    let player = players[userId];
    let place = placeMap[placeName];
    let character = characterMap[placeName];
    client.on('talk', (resp) => {
        const reply = character.talk(player, resp);
        client.emit('reply', reply);
        client.emit('playerMeta', getPlayerMeta(player));
    });
    client.on('enterLocation', (uuid) => {
        const reply = place.enterLocation(player, character);
        client.emit('reply', reply);
        client.emit('playerMeta', getPlayerMeta(player));
    });
    client.on('returningFromGame', (data) => {
        let uuid = data.uuid;
        let result = data.result;
        const reply = place.returnFromGame(player, character, result);
        client.emit('reply', reply);
        client.emit('playerMeta', getPlayerMeta(player));
    })
    client.on('getMyMeta', () => {
        client.emit('playerMeta', getPlayerMeta(player));
    });
});
app.get('/:player/:place', function(req, res){
    res.render('genericLocationPage', {
        'player': req.params.player,
        'place': req.params.place
    });
});
app.get('/:player/:place/game', function(req, res){
    res.render('genericGamePage', {
        'player': req.params.player,
        'place': req.params.place
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
