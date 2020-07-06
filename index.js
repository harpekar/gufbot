require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs'); // For file manipulation

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

let rawdata = fs.readFileSync('names.json');
let dead_db = JSON.parse(rawdata);

bot.login(TOKEN);

var tap_dead = 0;

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {

    if (msg.author.bot) return;

    else if (msg.content === 'where is tap?') {
        msg.channel.send('dead to me');
    }

    else if (msg.content.includes("tap" && "dead")) {

        msg_user = msg.author.username
        
        for (var index = 0; index < dead_db.length; index++) {
            
            json_obj = dead_db[index]

            msg.channel.send(`msg sent by ${msg_user}, checking against ${json_obj.username}`)

            if (json_obj.username == msg_user) { //If the user already exists in the database
                
                dead_db[index].score++;

                msg.channel.send(`Tap is dead to ${msg_user} ${dead_db[index].score} times over.`)                         
                return;
            }
        }

        dead_db.push({"username":msg.author.username, "score":1});

        msg.channel.send(`Tap is only dead to ${msg_user} once.`)

    }  

});
