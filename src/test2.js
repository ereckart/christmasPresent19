const Player = require('./core/Player');
const Kevin = require('./core/Kevin');
const Home = require('./core/Home')

var botKevin = new Kevin();
var botHome = new Home();
var p1 = new Player("Liz");
console.log(botHome.enterLocation(p1, botKevin));
console.log(botKevin.talk(p1, "r1b"));
//console.log(botKevin.talk(p1, "r2b"));
console.log(botHome.enterLocation(p1, botKevin));
console.log(botKevin.talk(p1, "r4c"));
console.log("NUMBER OF COINS: " + p1.getBank());
//console.log(botKevin.talk(p1, "r4c"));
// console.log(botKevin.talk(p1));
// console.log(botKevin.talk(p1, "r1a"));
// console.log(botKevin.talk(p1, "r2a"));
// console.log(botKevin.getMetPlayers());
