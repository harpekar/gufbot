require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs'); // For file manipulation
const sortArray = require('sort-json-array') //For leaderboard sorting

const botFuncs = require('./botFuncs.js')

//import * as botFuncs from './botFuncs.js';

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

let rawdata = fs.readFileSync('names.json');
let dead_db = JSON.parse(rawdata);


bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

conditions = [
    [m => m.content == 'where is tap?', m => m.channel.send('dead to me')],
    [m => (m.content.includes('tap') && 
            (m.content.includes('dead') || m.content.includes('alive'))), 
            m => botFuncs.tapIsDead(m, dead_db) ],
    [m => m.content.includes('aggron') && m.content.includes('raid'), 
            m => botFuncs.aggronBad(m)],
    [m => m.content == '/leaderboard', m => botFuncs.leaderboard(m, dead_db)],
    [m => m.content == '!kill_bot', m => botFuncs.killBot(m, dead_db)],
    [m => true, m => null]
]


bot.on('message', msg => {

    if (msg.author.bot) return;

    action = conditions.find(cond => cond[0](msg))[1]
    action(msg)

    // else if (msg.content === 'where is tap?') {
    //     msg.channel.send('dead to me');
    // }

    // else if (msg.content.includes("tap" && "alive") || msg.content.includes("tap" && "dead") ) {

    //     msg_user = msg.author.username
    //     
    //     for (var index = 0; index < dead_db.length; index++) {
    //         
    //         json_obj = dead_db[index]

    //         //msg.channel.send(`msg sent by ${msg_user}, checking against ${json_obj.username}`)

    //         if (json_obj.username == msg_user) { //If the user already exists in the database
    //             
    //             if (msg.content.includes("dead")) { dead_db[index].score++; }

    //             else { dead_db[index].score--; }

    //             msg.channel.send(`Tap is dead to ${json_obj.username} ${dead_db[index].score} times over.`)                         
    //             return;
    //         }
    //     }

    //     dead_db.push({"username":msg.author.username, "score":1});

    //     msg.channel.send(`Tap is only dead to ${msg_user} once.`)

    // }

    // else if (msg.content.includes("aggron" && "raid")) {
    //     
    //     msg.channel.send(`Don\'t make me tap the sign.`)

    //     msg.channel.send("", {files: ['./tapthesign.png'] });   
    // 
    // }

    /*else if (msg.content === "/leaderboard") {

        JSON.sort(dead_db, "desc", "score")

        msg.channel.send(`LEADERBOARD:`)
        
        for (var i = 0; i < Math.min(6,dead_db.length); i++) {
            
            json_obj = dead_db[i]
            msg.channel.send(`${dead_db[i].username} : ${json_obj.score}`) 

        }

    } 

    else if (msg.content === "!kill_bot") {

        const db_string = JSON.stringify(dead_db)

        fs.writeFile('./names.json', db_string, err => {
        
        if (err) {msg.channel.send(`Error writing file ${err}`) }
        else {}

        })

        msg.channel.send('See you, space cowboy.').then(m => {bot.destroy();   });

    }     */


});
