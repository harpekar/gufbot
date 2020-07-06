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

        for (var index = 0; index < dead_db.length; index++) {


            msg.channel.send(`msg sent by ${msg.author.username}, checking against ${user.username}`)

            if (dead_db[index].username == msg.author.username) { //If the user already exists in the database
                
                dead_db[index].score++;

                msg.channel.send(`Tap is dead to ${msg.author} ${dead_db[index].score} times over.`)                         
                return;
            }
        }

        //make new entry in database

    }  


});
