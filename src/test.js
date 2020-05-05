const Player = require('./core/Player');
const Kevin = require('./core/Kevin');

var botKevin = new Kevin();
var p1 = new Player("Hana");
var p2 = new Player("Dan");
var p3 = new Player("Tim");
var p4 = new Player("Liz");
console.log(botKevin.sayHi(p1));
console.log(botKevin.sayHi(p2));
botKevin.giveBribe(p2);
console.log(botKevin.sayHi(p3));
console.log(botKevin.sayHi(p4));
console.log(botKevin.getMetPlayers());
