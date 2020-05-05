const Player = require('./core/Player');
const Kevin = require('./core/Kevin2');

var botKevin = new Kevin();
var p1 = new Player("Hana");
var p2 = new Player("Dan");
var p3 = new Player("Tim");
var p4 = new Player("Liz");
console.log(botKevin.talk(p1));
console.log(botKevin.talk(p2));
console.log(botKevin.talk(p1, "r1a"));
console.log(botKevin.talk(p2, "r1b"));
console.log(botKevin.getMetPlayers());
